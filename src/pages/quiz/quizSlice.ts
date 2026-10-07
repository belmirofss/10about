import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Question } from "../../interfaces/Question";
import { QuizService } from "../../services/QuizService";
import { decodeHtml } from "../../utils/decodeHtml";
import { shuffle } from "../../utils/shuffle";

interface LoadQuestionsPayload {
    categoryId: string;
    difficulty: string;
}

export interface QuizQuestion {
    question: string;
    correctAnswer: string;
    alternatives: string[];
}

export interface QuestionResult extends QuizQuestion {
    number: number;
    answer: string;
    isCorrect: boolean;
}

export interface QuizState {
    categoryId: string | null;
    difficulty: string | null;
    questions: QuizQuestion[];
    /** answers[i] is the alternative picked for questions[i]. */
    answers: string[];
    currentQuestionIndex: number;
    status: 'idle' | 'loading' | 'ready' | 'failed';
    error: string | null;
    done: boolean;
}

const initialState: QuizState = {
    categoryId: null,
    difficulty: null,
    questions: [],
    answers: [],
    currentQuestionIndex: 0,
    status: 'idle',
    error: null,
    done: false
};

const RATE_LIMITED = 5;
const NOT_ENOUGH_QUESTIONS = 1;
const RATE_LIMIT_WAIT_MS = 5000;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const toQuizQuestion = (question: Question): QuizQuestion => {
    const correctAnswer = decodeHtml(question.correct_answer);
    const incorrectAnswers = question.incorrect_answers.map(decodeHtml);

    return {
        question: decodeHtml(question.question),
        correctAnswer,
        // Keep True/False in a predictable order; shuffle multiple choice.
        alternatives: question.type === 'boolean'
            ? ['True', 'False']
            : shuffle([correctAnswer, ...incorrectAnswers])
    };
};

export const loadQuestions = createAsyncThunk<QuizQuestion[], LoadQuestionsPayload, { state: RootState, rejectValue: string }>(
    'quiz/loadQuestions',
    async (payload, { rejectWithValue }) => {
        try {
            // Open Trivia DB allows one request every 5 seconds per IP; wait and retry once.
            for (let attempt = 0; attempt < 2; attempt++) {
                const { data } = await QuizService.loadQuiz(payload.categoryId, payload.difficulty);

                if (data.response_code === 0 && data.results.length > 0) {
                    return data.results.map(toQuizQuestion);
                }

                if (data.response_code === NOT_ENOUGH_QUESTIONS) {
                    return rejectWithValue("This board doesn't have enough questions at this difficulty yet. Try another difficulty or board.");
                }

                if (data.response_code !== RATE_LIMITED) {
                    break;
                }

                await wait(RATE_LIMIT_WAIT_MS);
            }
        } catch {
            return rejectWithValue("We couldn't reach the question server. Check your connection and try again.");
        }

        return rejectWithValue("Something went wrong while setting up your game. Please try again.");
    },
    {
        // React StrictMode mounts effects twice in development; don't fire a second request.
        condition: (_, { getState }) => getState().quiz.status !== 'loading'
    }
);

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        answerQuestion: (state, action: PayloadAction<string>) => {
            const question = state.questions[state.currentQuestionIndex];
            const alreadyAnswered = state.answers[state.currentQuestionIndex] !== undefined;

            if (!question || alreadyAnswered || state.done || !question.alternatives.includes(action.payload)) {
                return;
            }

            state.answers[state.currentQuestionIndex] = action.payload;
        },
        nextQuestion: (state) => {
            const answered = state.answers[state.currentQuestionIndex] !== undefined;
            const isLast = state.currentQuestionIndex >= state.questions.length - 1;

            if (answered && !isLast) {
                state.currentQuestionIndex += 1;
            }
        },
        finish: (state) => {
            if (state.questions.length > 0 && state.answers.length === state.questions.length) {
                state.done = true;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadQuestions.pending, (state, action) => {
            state.categoryId = action.meta.arg.categoryId;
            state.difficulty = action.meta.arg.difficulty;
            state.questions = [];
            state.answers = [];
            state.currentQuestionIndex = 0;
            state.status = 'loading';
            state.error = null;
            state.done = false;
        })
        .addCase(loadQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.status = 'ready';
        })
        .addCase(loadQuestions.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload ?? "Something went wrong while setting up your game. Please try again.";
        });
    }
});

export const { answerQuestion, nextQuestion, finish } = quizSlice.actions;

export const selectQuiz = (state: RootState) => state.quiz;
export const selectQuestions = (state: RootState) => state.quiz.questions;
export const selectAnswers = (state: RootState) => state.quiz.answers;
export const selectCurrentQuestionIndex = (state: RootState) => state.quiz.currentQuestionIndex;
export const selectStatus = (state: RootState) => state.quiz.status;
export const selectError = (state: RootState) => state.quiz.error;
export const selectDone = (state: RootState) => state.quiz.done;

export const selectCurrentQuestion = (state: RootState): QuizQuestion | undefined =>
    state.quiz.questions[state.quiz.currentQuestionIndex];

export const selectCurrentAnswer = (state: RootState): string | undefined =>
    state.quiz.answers[state.quiz.currentQuestionIndex];

export const selectResults = createSelector(
    [selectQuestions, selectAnswers],
    (questions, answers): QuestionResult[] => questions
        .map((question, index) => ({
            ...question,
            number: index + 1,
            answer: answers[index],
            isCorrect: answers[index] === question.correctAnswer
        }))
        .filter(result => result.answer !== undefined)
);

export const selectScore = createSelector(
    [selectResults],
    (results) => results.filter(result => result.isCorrect).length
);

export default quizSlice.reducer;

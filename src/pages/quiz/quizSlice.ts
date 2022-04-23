import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Question } from "../../interfaces/Question";
import { QuizService } from "../../services/QuizService";

interface loadQuestionsPayload {
    categoryId: string;
    difficult: string;
}

export interface QuizState {
    questions: Question[];
    currentQuestionIndex: number;
    amountCorrectAswers: number;
    isLoading: boolean;
    allowNextQuestion: boolean;
    done: boolean;
}

const initialState: QuizState = {
    questions: [],
    currentQuestionIndex: 0,
    amountCorrectAswers: 0,
    isLoading: false,
    allowNextQuestion: false,
    done: false
};

export const loadQuestions = createAsyncThunk(
    'quiz/loadQuestions',
    async (payload: loadQuestionsPayload): Promise<Question[]> => {
      const response = await QuizService.loadQuiz(payload.categoryId, payload.difficult);
      return response.data.results;
    }
);

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        nextQuestion: (state) => {
            state.allowNextQuestion = false;
            state.currentQuestionIndex += 1;
        },
        allowNextQuestion: (state) => {
            state.allowNextQuestion = true;
        },
        newCorrectAswer: (state) => {
            state.amountCorrectAswers += 1;
        },
        finish: (state) => {
            state.done = true;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadQuestions.pending, (state) => {
            state.isLoading = true;
            state.done = false;
            state.currentQuestionIndex = 0;
            state.questions = [];
        })
        .addCase(loadQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.isLoading = false;
        })
        .addCase(loadQuestions.rejected, (state) => {
            state.questions = [];
            state.isLoading = false;
        });
    }
});

export const { nextQuestion, allowNextQuestion, newCorrectAswer, finish } = quizSlice.actions;

export const selectQuestions = (state: RootState) => state.quiz.questions;
export const selectIsLoading = (state: RootState) => state.quiz.isLoading;
export const selectCurrentQuestionIndex = (state: RootState) => state.quiz.currentQuestionIndex;
export const selectAmountCorrectAswers = (state: RootState) => state.quiz.amountCorrectAswers;
export const selectAllowNextQuestion = (state: RootState) => state.quiz.allowNextQuestion;
export const selectDone = (state: RootState) => state.quiz.done;

export default quizSlice.reducer;
import { createStore } from '../../app/store';
import { QuizService } from '../../services/QuizService';
import quizReducer, {
    answerQuestion, finish, loadQuestions, nextQuestion, QuizQuestion, QuizState, selectResults, selectScore, toQuizQuestion
} from './quizSlice';

jest.mock('../../services/QuizService', () => ({
    QUESTIONS_PER_QUIZ: 10,
    QuizService: { loadQuiz: jest.fn() }
}));

const loadQuiz = QuizService.loadQuiz as jest.Mock;

const question = (text: string, correctAnswer: string): QuizQuestion => ({
    question: text,
    correctAnswer,
    alternatives: [correctAnswer, 'Wrong 1', 'Wrong 2', 'Wrong 3']
});

const readyState = (questions: QuizQuestion[]): QuizState => ({
    categoryId: '17',
    difficulty: 'medium',
    questions,
    answers: [],
    currentQuestionIndex: 0,
    status: 'ready',
    error: null,
    done: false
});

describe('toQuizQuestion', () => {
    it('decodes HTML entities and mixes the correct answer into the alternatives', () => {
        const result = toQuizQuestion({
            type: 'multiple',
            question: 'Which element has the symbol &quot;Fe&quot;?',
            correct_answer: 'Iron',
            incorrect_answers: ['Fluorine', 'Lead', 'Tin &amp; Zinc']
        });

        expect(result.question).toBe('Which element has the symbol "Fe"?');
        expect(result.correctAnswer).toBe('Iron');
        expect([...result.alternatives].sort()).toEqual(['Fluorine', 'Iron', 'Lead', 'Tin & Zinc']);
    });

    it('keeps True/False questions in a fixed order', () => {
        const result = toQuizQuestion({ type: 'boolean', question: 'The sky is blue.', correct_answer: 'True', incorrect_answers: ['False'] });

        expect(result.alternatives).toEqual(['True', 'False']);
    });
});

describe('quiz reducer', () => {
    const questions = [question('Q1', 'A1'), question('Q2', 'A2')];

    it('keeps only the first answer to a question', () => {
        let state = quizReducer(readyState(questions), answerQuestion('Wrong 1'));
        state = quizReducer(state, answerQuestion('A1'));

        expect(state.answers).toEqual(['Wrong 1']);
    });

    it('ignores answers that are not one of the alternatives', () => {
        const state = quizReducer(readyState(questions), answerQuestion('Made up'));

        expect(state.answers).toEqual([]);
    });

    it('only moves on once the current question is answered', () => {
        let state = quizReducer(readyState(questions), nextQuestion());
        expect(state.currentQuestionIndex).toBe(0);

        state = quizReducer(state, answerQuestion('A1'));
        state = quizReducer(state, nextQuestion());
        expect(state.currentQuestionIndex).toBe(1);
    });

    it('only finishes once every question is answered', () => {
        let state = quizReducer(readyState(questions), answerQuestion('A1'));
        state = quizReducer(state, finish());
        expect(state.done).toBe(false);

        state = quizReducer(state, nextQuestion());
        state = quizReducer(state, answerQuestion('Wrong 2'));
        state = quizReducer(state, finish());
        expect(state.done).toBe(true);
    });

    it('scores and lists the answered questions', () => {
        let state = quizReducer(readyState(questions), answerQuestion('A1'));
        state = quizReducer(state, nextQuestion());
        state = quizReducer(state, answerQuestion('Wrong 2'));

        const rootState = { quiz: state, categories: { items: [], status: 'idle' as const } };

        expect(selectScore(rootState)).toBe(1);
        expect(selectResults(rootState).map(result => [result.number, result.answer, result.isCorrect])).toEqual([
            [1, 'A1', true],
            [2, 'Wrong 2', false]
        ]);
    });
});

describe('loadQuestions', () => {
    afterEach(() => loadQuiz.mockReset());

    it('stores the loaded game', async () => {
        loadQuiz.mockResolvedValue({
            data: { response_code: 0, results: [{ type: 'multiple', question: 'Q', correct_answer: 'A', incorrect_answers: ['B', 'C', 'D'] }] }
        });
        const store = createStore();

        await store.dispatch(loadQuestions({ categoryId: '17', difficulty: 'hard' }));

        const { quiz } = store.getState();
        expect(loadQuiz).toHaveBeenCalledWith('17', 'hard');
        expect(quiz.status).toBe('ready');
        expect(quiz.categoryId).toBe('17');
        expect(quiz.difficulty).toBe('hard');
        expect(quiz.questions).toHaveLength(1);
    });

    it('explains when a board has too few questions', async () => {
        loadQuiz.mockResolvedValue({ data: { response_code: 1, results: [] } });
        const store = createStore();

        await store.dispatch(loadQuestions({ categoryId: '30', difficulty: 'hard' }));

        expect(store.getState().quiz.status).toBe('failed');
        expect(store.getState().quiz.error).toMatch(/enough questions/);
    });

    it('reports network failures', async () => {
        loadQuiz.mockRejectedValue(new Error('offline'));
        const store = createStore();

        await store.dispatch(loadQuestions({ categoryId: '9', difficulty: 'easy' }));

        expect(store.getState().quiz.error).toMatch(/couldn't reach/);
    });

    it('does not start a second request while one is loading', () => {
        loadQuiz.mockReturnValue(new Promise(() => undefined));
        const store = createStore();

        store.dispatch(loadQuestions({ categoryId: '9', difficulty: 'easy' }));
        store.dispatch(loadQuestions({ categoryId: '9', difficulty: 'easy' }));

        expect(loadQuiz).toHaveBeenCalledTimes(1);
    });
});

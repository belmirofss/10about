import { AxiosResponse } from "axios";
import { LoadQuizResponse } from "../interfaces/LoadQuizResponse";
import { API } from "./API";

export const QUESTIONS_PER_QUIZ = 10;

export const QuizService = {
    loadQuiz: (categoryId: string | number, difficulty: string): Promise<AxiosResponse<LoadQuizResponse>> =>
        API.get('api.php', { params: { amount: QUESTIONS_PER_QUIZ, category: categoryId, difficulty } })
};

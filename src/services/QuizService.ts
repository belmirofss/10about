import { AxiosResponse } from "axios";
import { LoadQuizResponse } from "../interfaces/LoadQuizResponse";
import { API } from "./API";

export const QuizService = {
    loadQuiz: (categoryId: string | number, difficult: string): Promise<AxiosResponse<LoadQuizResponse>> => API.get(`api.php?amount=10&category=${categoryId}&difficulty=${difficult}`)
};
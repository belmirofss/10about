import { Question } from "./Question";

/**
 * Open Trivia DB response codes: 0 success, 1 not enough questions,
 * 2 invalid parameter, 3/4 token problems, 5 rate limited.
 */
export interface LoadQuizResponse {
    response_code: number;
    results: Question[];
}

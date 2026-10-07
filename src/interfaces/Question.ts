export interface Question {
    type: 'multiple' | 'boolean';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

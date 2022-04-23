import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useDecoderText } from '../../app/hooks';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import Alternatives from './components/alternatives/Alternatives';
import { Container, QuestionText, Title } from './Quiz.styles';
import { finish, loadQuestions, nextQuestion, selectAllowNextQuestion, selectCurrentQuestionIndex, selectIsLoading, selectQuestions } from './quizSlice';
import HashLoader from "react-spinners/HashLoader";
import { theme } from '../../theme';
import { Question } from '../../interfaces/Question';

export default function Quiz() {

    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [currentNumberOfQuestion, setCurrentNumberOfQuestion] = useState<number>(1);

    const questions = useAppSelector(selectQuestions);
    const currentQuestionIndex = useAppSelector(selectCurrentQuestionIndex);
    const isLoading = useAppSelector(selectIsLoading);
    const allowNextQuestion = useAppSelector(selectAllowNextQuestion);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const decoderText = useDecoderText();

    const { categoryId, difficult } = useParams();

    const isTheLastQuestion = currentNumberOfQuestion === questions.length;

    const handleNextQuestionClick = () => dispatch(nextQuestion());
    const handleViewResultsClick = () => {
        dispatch(finish());
        navigate('/result');
    };

    useEffect(() => {
        if (categoryId && difficult) {
             dispatch(loadQuestions({
                categoryId,
                difficult
             }));
        } else {
            navigate('/');
        }
     }, [categoryId, difficult]);

    useEffect(() => {
        setCurrentQuestion(questions[currentQuestionIndex]);
        setCurrentNumberOfQuestion(currentQuestionIndex + 1);
     }, [questions, currentQuestionIndex]);

    if (isLoading || !currentQuestion) {
        return (
            <Container>
                <HashLoader size={60} loading color={theme.colors.primary} speedMultiplier={1.5} />
            </Container>
        );
    }

    return (
        <Container>
            <Title>
                🤔 Question { currentNumberOfQuestion } of { questions.length }
            </Title>
        
            <QuestionText>
                { decoderText(currentQuestion.question) }
            </QuestionText>

            <Alternatives
                correctAnswer={currentQuestion.correct_answer}
                incorrectAnswers={currentQuestion.incorrect_answers}
            />

            {
                isTheLastQuestion ?
                    (
                        <PrimaryButton
                            onClick={handleViewResultsClick}
                            disabled={!allowNextQuestion}>
                            ✅ View results
                        </PrimaryButton>
                    ) :
                    (
                        <PrimaryButton
                            onClick={handleNextQuestionClick}
                            disabled={!allowNextQuestion}>
                            👉 Next question
                        </PrimaryButton>
                    )
            }
        </Container>
    );
}
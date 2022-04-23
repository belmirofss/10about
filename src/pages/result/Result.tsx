import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import { selectAmountCorrectAswers, selectDone } from '../quiz/quizSlice';
import { Container, Message, ResultText } from './Result.styles';

export default function Result() {

    const [messageText, setMessagetText] = useState<string>('');

    const done = useAppSelector(selectDone);
    const amountCorrectAswers = useAppSelector(selectAmountCorrectAswers);

    const navigate = useNavigate();

    const createResultText = () => {
        if (amountCorrectAswers === 0) {
            setMessagetText("💪 Don't be discouraged by not getting any questions right. Keep trying...");
        } else if (amountCorrectAswers < 6) {
            setMessagetText("😎 Come on! You can still improve and get more questions right");
        } else if (amountCorrectAswers < 8) {
            setMessagetText("😁 Good, well done! I think you can get more questions right, let's go!");
        } else if (amountCorrectAswers < 10) {
            setMessagetText("🥳 Wow, excellent! You know a lot. Can you hit them all?");
        } else {
            setMessagetText("🥵 Fantastic! You got all the questions right. You won the game, congratulations!");
        }
    };

    const navigateToNewQuiz = () => navigate('/new-quiz');

    useEffect(() => {
        console.log('AAAA', done);

        if (!done) {
            navigate('/');
        } else {
            createResultText();
        }
    }, [done, amountCorrectAswers]);

    return (
        <Container>
            <ResultText>
                You got 💫 { amountCorrectAswers } 💫 questions out of 10 correct
            </ResultText>
            <Message>
                { messageText }
            </Message>

            <PrimaryButton onClick={navigateToNewQuiz}>
                Try again
            </PrimaryButton>
        </Container>
    );
}

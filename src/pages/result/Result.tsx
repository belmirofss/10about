import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Main, Overline } from '../../App.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GhostButton, GhostLink, PrimaryLink } from '../../components/button/Button.styles';
import Header from '../../components/header/Header';
import { GameChip } from '../../components/header/Header.styles';
import { CheckIcon, CloseIcon, ReplayIcon, ShareIcon } from '../../components/icons/Icons';
import { loadCategories, selectCategoryName } from '../../features/categories/categoriesSlice';
import { difficultyLabel } from '../../utils/difficulty';
import { selectDone, selectQuiz, selectResults, selectScore } from '../quiz/quizSlice';
import {
    Actions, Digit, Digits, Layout, Message, Miss, MissAnswers, MissNumber, Perfect, Review, Run, RunItem, Scoreboard, ShareFeedback, Slash
} from './Result.styles';

export const resultMessage = (score: number, total: number): { title: string, text: string } => {
    if (score === 0) {
        return { title: 'Tough board', text: "Don't be discouraged — every round teaches you something. Try again?" };
    }
    if (score < 6) {
        return { title: 'Keep at it', text: 'You can still climb higher. Run it back?' };
    }
    if (score < 8) {
        return { title: 'Strong showing!', text: `${total - score} away from a perfect night. Same board again?` };
    }
    if (score < total) {
        return { title: 'Excellent!', text: 'You know a lot. Can you hit them all?' };
    }
    return { title: 'Perfect night!', text: 'Every question right. Take a bow — you won the game.' };
};

export default function Result() {

    const [shareFeedback, setShareFeedback] = useState('');

    const done = useAppSelector(selectDone);
    const { categoryId, difficulty } = useAppSelector(selectQuiz);
    const results = useAppSelector(selectResults);
    const score = useAppSelector(selectScore);
    const categoryName = useAppSelector(selectCategoryName(categoryId)) ?? 'Quiz';

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!done) {
            navigate('/', { replace: true });
        } else {
            dispatch(loadCategories());
        }
    }, [done, navigate, dispatch]);

    if (!done) {
        return null;
    }

    const total = results.length;
    const misses = results.filter(result => !result.isCorrect);
    const message = resultMessage(score, total);

    const share = async () => {
        const text = `I scored ${score}/${total} on ${categoryName} (${difficultyLabel(difficulty)}) at 10about?`;
        const url = window.location.origin;

        try {
            if (navigator.share) {
                await navigator.share({ title: '10about?', text, url });
            } else {
                await navigator.clipboard.writeText(`${text} ${url}`);
                setShareFeedback('Score copied to your clipboard.');
            }
        } catch (error) {
            if ((error as Error)?.name !== 'AbortError') {
                setShareFeedback("Couldn't share right now.");
            }
        }
    };

    return (
        <>
            <Header center={
                <GameChip>
                    <span>{categoryName}</span>
                    <span aria-hidden="true">|</span>
                    <span>{difficultyLabel(difficulty)}</span>
                </GameChip>
            } />

            <Main>
                <Layout>
                    <Scoreboard aria-labelledby="result-title">
                        <Overline>Final score</Overline>
                        <Digits role="img" aria-label={`${score} out of ${total}`}>
                            {String(score).split('').map((digit, index) => <Digit key={`s${index}`} $highlight>{digit}</Digit>)}
                            <Slash>/</Slash>
                            {String(total).split('').map((digit, index) => <Digit key={`t${index}`}>{digit}</Digit>)}
                        </Digits>
                        <Message>
                            <h1 id="result-title">{message.title}</h1>
                            <p>{message.text}</p>
                        </Message>
                        <Run aria-label="Answers by question" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
                            {results.map(result => (
                                <RunItem
                                    key={result.number}
                                    $correct={result.isCorrect}
                                    aria-label={`Question ${result.number}: ${result.isCorrect ? 'correct' : 'wrong'}`}>
                                    {result.number}
                                </RunItem>
                            ))}
                        </Run>
                        <Actions>
                            <PrimaryLink to={`/quiz/${categoryId}/${difficulty}`}>
                                <ReplayIcon /> Play again
                            </PrimaryLink>
                            <GhostLink to="/new-quiz">New board</GhostLink>
                            <GhostButton type="button" onClick={share}>
                                <ShareIcon size={18} strokeWidth={2} /> Share
                            </GhostButton>
                        </Actions>
                        <ShareFeedback role="status">{shareFeedback}</ShareFeedback>
                    </Scoreboard>

                    <Review aria-labelledby="review-title">
                        <h2 id="review-title">{misses.length > 0 ? 'Review your misses' : 'Nothing to review'}</h2>
                        {misses.length === 0 && (
                            <Perfect>You got every question right. Try a harder difficulty or a new board.</Perfect>
                        )}
                        {misses.map(miss => (
                            <Miss key={miss.number}>
                                <MissNumber>QUESTION {miss.number}</MissNumber>
                                <h3>{miss.question}</h3>
                                <MissAnswers>
                                    <span><CloseIcon size={14} strokeWidth={3} /> You said {miss.answer}</span>
                                    <span><CheckIcon size={16} strokeWidth={3} /> Answer: {miss.correctAnswer}</span>
                                </MissAnswers>
                            </Miss>
                        ))}
                    </Review>
                </Layout>
            </Main>
        </>
    );
}

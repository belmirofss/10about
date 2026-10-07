import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { Main, Overline } from '../../App.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GhostLink, PrimaryButton } from '../../components/button/Button.styles';
import Header from '../../components/header/Header';
import { GameChip, HeaderLink, LabelHiddenOnMobile } from '../../components/header/Header.styles';
import { ArrowRightIcon, CloseIcon } from '../../components/icons/Icons';
import { loadCategories, selectCategoryName } from '../../features/categories/categoriesSlice';
import { theme } from '../../theme';
import { difficultyLabel, isDifficulty } from '../../utils/difficulty';
import Alternatives, { ALTERNATIVE_KEYS } from './components/alternatives/Alternatives';
import Progress from './components/progress/Progress';
import { Footer, Layout, QuestionSection, QuestionText, StatusActions, StatusPanel, Tip, Verdict } from './Quiz.styles';
import {
    answerQuestion, finish, loadQuestions, nextQuestion, selectCurrentAnswer, selectCurrentQuestion,
    selectCurrentQuestionIndex, selectError, selectQuiz, selectResults, selectScore
} from './quizSlice';

export default function Quiz() {

    const { categoryId = '', difficult = '' } = useParams();
    const validParams = /^\d+$/.test(categoryId) && isDifficulty(difficult);

    const { questions, status, done, categoryId: loadedCategoryId, difficulty: loadedDifficulty } = useAppSelector(selectQuiz);
    const currentQuestion = useAppSelector(selectCurrentQuestion);
    const currentAnswer = useAppSelector(selectCurrentAnswer);
    const currentQuestionIndex = useAppSelector(selectCurrentQuestionIndex);
    const results = useAppSelector(selectResults);
    const score = useAppSelector(selectScore);
    const error = useAppSelector(selectError);
    const categoryName = useAppSelector(selectCategoryName(categoryId));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const questionRef = useRef<HTMLHeadingElement>(null);
    const nextButtonRef = useRef<HTMLButtonElement>(null);

    // Until this page's own request starts, the store may still hold a previous game.
    const isThisGame = !done && loadedCategoryId === categoryId && loadedDifficulty === difficult;
    const answered = currentAnswer !== undefined;
    const isCorrect = answered && currentAnswer === currentQuestion?.correctAnswer;
    const isTheLastQuestion = currentQuestionIndex === questions.length - 1;

    const startGame = useCallback(() => {
        dispatch(loadQuestions({ categoryId, difficulty: difficult }));
    }, [dispatch, categoryId, difficult]);

    useEffect(() => {
        if (!validParams) {
            navigate('/new-quiz', { replace: true });
            return;
        }

        dispatch(loadCategories());
        startGame();
    }, [validParams, navigate, dispatch, startGame]);

    const handleAnswer = useCallback((alternative: string) => {
        dispatch(answerQuestion(alternative));
    }, [dispatch]);

    const handleNext = useCallback(() => {
        if (isTheLastQuestion) {
            dispatch(finish());
            navigate('/result');
        } else {
            dispatch(nextQuestion());
        }
    }, [dispatch, navigate, isTheLastQuestion]);

    // Keyboard play: A–D (or 1–4) to answer, Enter to move on.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
                return;
            }

            if (!currentQuestion || status !== 'ready' || !isThisGame) {
                return;
            }

            if (!answered) {
                const key = event.key.toUpperCase();
                const index = ALTERNATIVE_KEYS.includes(key) ? ALTERNATIVE_KEYS.indexOf(key) : Number(key) - 1;
                const alternative = currentQuestion.alternatives[index];

                if (alternative !== undefined) {
                    event.preventDefault();
                    handleAnswer(alternative);
                }
            } else if (event.key === 'Enter' && !['BUTTON', 'A'].includes(target.tagName)) {
                // Focused buttons and links already handle Enter themselves.
                event.preventDefault();
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentQuestion, status, isThisGame, answered, handleAnswer, handleNext]);

    // Move focus with the game: to "Next" once answered, back to the question when it changes.
    useEffect(() => {
        if (answered) {
            nextButtonRef.current?.focus();
        }
    }, [answered]);

    useEffect(() => {
        if (status === 'ready') {
            questionRef.current?.focus();
        }
    }, [status, currentQuestionIndex]);

    const header = (
        <Header
            center={
                <GameChip aria-label={`${categoryName ?? 'Quiz'}, ${difficultyLabel(difficult)}`}>
                    <span>{categoryName ?? 'Quiz'}</span>
                    <span aria-hidden="true">|</span>
                    <span>{difficultyLabel(difficult)}</span>
                </GameChip>
            }
            right={
                <HeaderLink to="/new-quiz" aria-label="Quit game">
                    <CloseIcon size={18} strokeWidth={2} /> <LabelHiddenOnMobile>Quit game</LabelHiddenOnMobile>
                </HeaderLink>
            } />
    );

    if (status === 'failed' && isThisGame) {
        return (
            <>
                {header}
                <Main>
                    <StatusPanel role="alert">
                        <h1>The show can't go on… yet</h1>
                        <p>{error}</p>
                        <StatusActions>
                            <PrimaryButton type="button" onClick={startGame}>Try again</PrimaryButton>
                            <GhostLink to="/new-quiz">Pick another board</GhostLink>
                        </StatusActions>
                    </StatusPanel>
                </Main>
            </>
        );
    }

    if (status !== 'ready' || !isThisGame || !currentQuestion) {
        return (
            <>
                {header}
                <Main>
                    <StatusPanel aria-busy="true">
                        <HashLoader size={60} loading color={theme.colors.accent} speedMultiplier={1.5} />
                        <p role="status">Setting the stage…</p>
                    </StatusPanel>
                </Main>
            </>
        );
    }

    return (
        <>
            {header}
            <Main>
                <Layout>
                    <QuestionSection>
                        <Overline>Question {currentQuestionIndex + 1} of {questions.length}</Overline>
                        <QuestionText ref={questionRef} tabIndex={-1}>{currentQuestion.question}</QuestionText>

                        <Alternatives
                            key={currentQuestionIndex}
                            alternatives={currentQuestion.alternatives}
                            correctAnswer={currentQuestion.correctAnswer}
                            answer={currentAnswer}
                            onAnswer={handleAnswer} />

                        <Footer>
                            <div aria-live="polite">
                                {answered && (
                                    <Verdict $correct={isCorrect}>
                                        <strong>{isCorrect ? 'Correct!' : 'Not this time'}</strong>
                                        <span>
                                            {isCorrect
                                                ? `That's ${score} out of ${results.length} so far.`
                                                : `The right answer was ${currentQuestion.correctAnswer}.`}
                                        </span>
                                    </Verdict>
                                )}
                                {!answered && (
                                    <Tip>
                                        Tip: press <kbd>A</kbd>–<kbd>{ALTERNATIVE_KEYS[currentQuestion.alternatives.length - 1]}</kbd> to answer
                                    </Tip>
                                )}
                            </div>
                            <PrimaryButton ref={nextButtonRef} type="button" onClick={handleNext} disabled={!answered}>
                                {!answered ? 'Choose an answer' : isTheLastQuestion ? 'See your score' : 'Next question'}
                                {answered && <ArrowRightIcon />}
                            </PrimaryButton>
                        </Footer>
                    </QuestionSection>

                    <Progress
                        total={questions.length}
                        currentIndex={currentQuestionIndex}
                        outcomes={results.map(result => result.isCorrect)}
                        score={score} />
                </Layout>
            </Main>
        </>
    );
}

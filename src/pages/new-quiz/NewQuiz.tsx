import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Main, Overline } from '../../App.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GhostButton, PrimaryButton } from '../../components/button/Button.styles';
import Header from '../../components/header/Header';
import { HeaderLink, LabelHiddenOnMobile } from '../../components/header/Header.styles';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/icons/Icons';
import { loadCategories, selectCategories, selectCategoriesStatus } from '../../features/categories/categoriesSlice';
import { Category } from '../../interfaces/Category';
import { QUESTIONS_PER_QUIZ } from '../../services/QuizService';
import { DEFAULT_DIFFICULTY, DIFFICULTIES, Difficulty, difficultyLabel, isDifficulty } from '../../utils/difficulty';
import { selectQuiz } from '../quiz/quizSlice';
import {
    Board, BoardSection, Difficulties, DifficultyButton, Layout, Notice, Panel, Pip, Pips, Summary, Tile, TilePlaceholder, TitleRow
} from './NewQuiz.styles';

const PLACEHOLDER_TILES = 24;

export default function NewQuiz() {

    const categories = useAppSelector(selectCategories);
    const status = useAppSelector(selectCategoriesStatus);
    const lastGame = useAppSelector(selectQuiz);

    const [category, setCategory] = useState<Category>();
    // Remember the difficulty from the last game; most players stick with one.
    const [difficulty, setDifficulty] = useState<Difficulty>(
        isDifficulty(lastGame.difficulty) ? lastGame.difficulty : DEFAULT_DIFFICULTY
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);

    const startQuiz = () => {
        if (category) {
            navigate(`/quiz/${category.id}/${difficulty}`);
        }
    };

    const renderBoard = () => {
        if (status === 'failed') {
            return (
                <Notice role="alert">
                    We couldn't load the boards. Check your connection and try again.
                    <GhostButton type="button" onClick={() => dispatch(loadCategories())}>Try again</GhostButton>
                </Notice>
            );
        }

        if (status !== 'succeeded') {
            return (
                <Board aria-busy="true" aria-label="Loading boards">
                    {Array.from({ length: PLACEHOLDER_TILES }, (_, index) => <TilePlaceholder key={index} />)}
                </Board>
            );
        }

        return (
            <Board role="group" aria-label="Boards">
                {categories.map(item => (
                    <Tile
                        key={item.id}
                        type="button"
                        $selected={item.id === category?.id}
                        aria-pressed={item.id === category?.id}
                        onClick={() => setCategory(item)}>
                        <span aria-hidden="true">{String(item.id).padStart(2, '0')}</span>
                        <span>{item.name}</span>
                    </Tile>
                ))}
            </Board>
        );
    };

    return (
        <>
            <Header right={
                <HeaderLink to="/" aria-label="Back to home">
                    <ArrowLeftIcon size={18} strokeWidth={2} /> <LabelHiddenOnMobile>Back</LabelHiddenOnMobile>
                </HeaderLink>
            } />

            <Main>
                <Layout>
                    <BoardSection>
                        <TitleRow>
                            <h1>Pick your board</h1>
                            {status === 'succeeded' && <span>{categories.length} categories</span>}
                        </TitleRow>
                        {renderBoard()}
                    </BoardSection>

                    <Panel aria-label="Game settings">
                        <h2 id="difficulty-heading">How hard?</h2>
                        <Difficulties role="group" aria-labelledby="difficulty-heading">
                            {DIFFICULTIES.map(item => (
                                <DifficultyButton
                                    key={item.value}
                                    type="button"
                                    $selected={item.value === difficulty}
                                    aria-pressed={item.value === difficulty}
                                    onClick={() => setDifficulty(item.value)}>
                                    <span>{item.label}</span>
                                    <Pips aria-hidden="true">
                                        {[1, 2, 3].map(level => <Pip key={level} $filled={level <= item.level} />)}
                                    </Pips>
                                </DifficultyButton>
                            ))}
                        </Difficulties>

                        <Summary aria-live="polite">
                            <Overline>Your game</Overline>
                            <strong>{category ? category.name : 'No board picked yet'}</strong>
                            <span>{difficultyLabel(difficulty)} · {QUESTIONS_PER_QUIZ} questions</span>
                        </Summary>

                        <PrimaryButton type="button" onClick={startQuiz} disabled={!category}>
                            {category ? <>Start the game <ArrowRightIcon /></> : 'Pick a board first'}
                        </PrimaryButton>
                    </Panel>
                </Layout>
            </Main>
        </>
    );
}

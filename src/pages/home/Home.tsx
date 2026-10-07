import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Main, Overline, Stage } from '../../App.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GhostButton, PrimaryLink } from '../../components/button/Button.styles';
import Header from '../../components/header/Header';
import { ArrowRightIcon, ShuffleIcon } from '../../components/icons/Icons';
import { loadCategories, selectCategories } from '../../features/categories/categoriesSlice';
import { DEFAULT_DIFFICULTY } from '../../utils/difficulty';
import { Actions, Content, Step, StepNumber, Steps, StepText, SubTitle, Title } from './Home.styles';

// Open Trivia DB category ids, used if the list hasn't loaded yet.
const FIRST_CATEGORY_ID = 9;
const LAST_CATEGORY_ID = 32;

export default function Home() {

    const categories = useAppSelector(selectCategories);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);

    const surpriseMe = () => {
        const categoryId = categories.length > 0
            ? categories[Math.floor(Math.random() * categories.length)].id
            : FIRST_CATEGORY_ID + Math.floor(Math.random() * (LAST_CATEGORY_ID - FIRST_CATEGORY_ID + 1));

        navigate(`/quiz/${categoryId}/${DEFAULT_DIFFICULTY}`);
    };

    return (
        <>
            <Header />

            <Main>
                <Content>
                    <Stage>
                        <Overline>Tonight’s game · ten questions</Overline>
                        <Title>Ten questions. One topic. Your spotlight.</Title>
                        <SubTitle>
                            Pick a board, choose how hard it gets and answer ten multiple-choice questions.
                            No sign-up, no lifelines.
                        </SubTitle>
                        <Actions>
                            <PrimaryLink to="/new-quiz">
                                Start a game <ArrowRightIcon />
                            </PrimaryLink>
                            <GhostButton type="button" onClick={surpriseMe}>
                                <ShuffleIcon /> Surprise me
                            </GhostButton>
                        </Actions>
                    </Stage>

                    <Steps id="how-it-plays" aria-label="How it plays">
                        <Step>
                            <StepNumber>01</StepNumber>
                            <StepText>
                                <strong>Pick a board</strong>
                                <span>From Film to Mythology — and a difficulty.</span>
                            </StepText>
                        </Step>
                        <Step>
                            <StepNumber>02</StepNumber>
                            <StepText>
                                <strong>Answer ten</strong>
                                <span>See the right answer the moment you choose.</span>
                            </StepText>
                        </Step>
                        <Step>
                            <StepNumber>03</StepNumber>
                            <StepText>
                                <strong>Take a bow</strong>
                                <span>Your score, your misses, and a rematch.</span>
                            </StepText>
                        </Step>
                    </Steps>
                </Content>
            </Main>
        </>
    );
}

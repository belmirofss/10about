import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import { Content, SubTitle, Title } from "./Home.styles";


export default function Home() {

    const navigate = useNavigate();

    const navigateToNewQuiz = () => navigate('/new-quiz');
    
    return (
        <Content>
            <Title>
                👋 Welcome!
            </Title>
            
            <SubTitle>
                10about? is a place where you can test your knowledge by aswering a quiz with 10 question about something
            </SubTitle>

            <PrimaryButton onClick={navigateToNewQuiz}>
                Test my knowledge
            </PrimaryButton>
        </Content>
    );
}
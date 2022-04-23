import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import SelectCategory from '../../components/select-category/SelectCategory';
import SelectDifficult from '../../components/select-difficult/SelectDifficult';
import { Category } from '../../interfaces/Category';
import { Container, Text, WrapperSelectDifficult } from './NewQuiz.styles';

export default function NewQuiz() {

    const [category, setCategory] = useState<Category>();
    const [difficult, setDifficult] = useState<string>();

    const navigate = useNavigate();

    const handleSelectCategory = (category: Category) => setCategory(category);

    const handleSelectDifficult = (difficult: string) => setDifficult(difficult);

    const startQuiz = () => navigate(`/quiz/${category?.id}/${difficult}`);

    return (
        <Container>
            <Text>✨ New quiz</Text>
            <SelectCategory onSelect={handleSelectCategory} />

            <WrapperSelectDifficult>
                <SelectDifficult onSelect={handleSelectDifficult} />
            </WrapperSelectDifficult>

            <PrimaryButton onClick={startQuiz} disabled={!category || !difficult}>
                Start quiz
            </PrimaryButton>
        </Container>
    );
}
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useDecoderText } from '../../../../app/hooks';
import { allowNextQuestion, newCorrectAswer } from '../../quizSlice';
import { Alternative, Container } from './Alternatives.styles';

interface Props {
    correctAnswer: string;
    incorrectAnswers: string[];
}

export default function Alternatives(props: Props) {

    const [selected, setSelected] = useState<string>('');
    const [alternatives, setAlternatives] = useState<string[]>([]);
    
    const { correctAnswer, incorrectAnswers } = props;

    const dispatch = useAppDispatch();
    const decoderText = useDecoderText();

    const getRandomIndexAlternative = () => {
        const max = incorrectAnswers.length;
        const min = 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const createArrayOfAlternatives = (): string[] => {
        const correctAlternativeIndex = getRandomIndexAlternative();
        const arrAlternatives = [...incorrectAnswers];
        arrAlternatives.splice(correctAlternativeIndex, 0, correctAnswer);
        return arrAlternatives;
    }

    useEffect(() => {
        setAlternatives(createArrayOfAlternatives());
        setSelected('');
    }, [correctAnswer, incorrectAnswers])

    const handleAlternativeClick = (alternative: string) => {

        setSelected(alternative);
        
        if (alternative === correctAnswer) {
            dispatch(newCorrectAswer());
        }

        dispatch(allowNextQuestion());
    }

    return (
        <Container>
            {
                alternatives.map((alternative, index) => (
                    <Alternative
                        key={`ALTERNATIVE_${index}`}
                        onClick={() => handleAlternativeClick(alternative)}
                        selected={alternative === selected}
                        correct={!!selected && alternative === correctAnswer}
                        wrong={!!selected  && alternative !== correctAnswer}
                        disabled={!!selected}>
                        { decoderText(alternative) }
                    </Alternative>
                ))
            }
        </Container>
    );
}
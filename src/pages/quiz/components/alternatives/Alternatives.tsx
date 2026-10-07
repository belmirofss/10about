import React from 'react';
import { VisuallyHidden } from '../../../../App.styles';
import { CheckIcon, CloseIcon } from '../../../../components/icons/Icons';
import { Alternative, AlternativeState, Container, Key, Text } from './Alternatives.styles';

export const ALTERNATIVE_KEYS = ['A', 'B', 'C', 'D'];

interface Props {
    alternatives: string[];
    correctAnswer: string;
    answer?: string;
    onAnswer(alternative: string): void;
}

export default function Alternatives(props: Props) {

    const { alternatives, correctAnswer, answer, onAnswer } = props;

    const answered = answer !== undefined;

    const stateOf = (alternative: string): AlternativeState => {
        if (!answered) {
            return 'idle';
        }

        if (alternative === correctAnswer) {
            return 'correct';
        }

        return alternative === answer ? 'wrong' : 'dimmed';
    };

    return (
        <Container role="group" aria-label="Answers">
            {
                alternatives.map((alternative, index) => {
                    const state = stateOf(alternative);

                    return (
                        <Alternative
                            key={alternative}
                            type="button"
                            $state={state}
                            onClick={() => onAnswer(alternative)}
                            disabled={answered}>
                            <Key aria-hidden="true">{ALTERNATIVE_KEYS[index]}</Key>
                            <Text>{alternative}</Text>
                            {state === 'correct' && <><CheckIcon size={26} strokeWidth={3} /><VisuallyHidden>(correct answer)</VisuallyHidden></>}
                            {state === 'wrong' && <><CloseIcon size={24} strokeWidth={3} /><VisuallyHidden>(your answer)</VisuallyHidden></>}
                        </Alternative>
                    );
                })
            }
        </Container>
    );
}

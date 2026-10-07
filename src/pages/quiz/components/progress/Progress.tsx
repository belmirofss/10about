import React from 'react';
import { VisuallyHidden } from '../../../../App.styles';
import { CheckIcon, CloseIcon } from '../../../../components/icons/Icons';
import { Bar, Ladder, LadderHeader, Mark, Rung, Rungs, Segment, StepState } from './Progress.styles';

interface Props {
    total: number;
    currentIndex: number;
    /** Whether each answered question (by index) was right. */
    outcomes: boolean[];
    score: number;
}

/** The answer ladder on desktop and a compact segmented bar on phones. */
export default function Progress(props: Props) {

    const { total, currentIndex, outcomes, score } = props;

    const answeredState = (index: number): StepState | undefined => {
        if (index >= outcomes.length) {
            return undefined;
        }

        return outcomes[index] ? 'correct' : 'wrong';
    };

    const steps = Array.from({ length: total }, (_, index) => index);

    return (
        <>
            <Ladder aria-labelledby="ladder-heading">
                <LadderHeader>
                    <h2 id="ladder-heading">The ladder</h2>
                    <span>Score <strong>{score}</strong></span>
                </LadderHeader>
                <Rungs>
                    {steps.map(index => {
                        const state = index === currentIndex ? 'current' : answeredState(index) ?? 'upcoming';

                        return (
                            <Rung key={index} $state={state} aria-current={state === 'current' ? 'step' : undefined}>
                                <span>Question {index + 1}</span>
                                {state === 'current' && <small>NOW</small>}
                                {(state === 'correct' || state === 'wrong') && (
                                    <Mark $correct={state === 'correct'}>
                                        {state === 'correct' ? <CheckIcon size={18} strokeWidth={3} /> : <CloseIcon size={16} strokeWidth={3} />}
                                        <VisuallyHidden>{state === 'correct' ? 'correct' : 'wrong'}</VisuallyHidden>
                                    </Mark>
                                )}
                            </Rung>
                        );
                    })}
                </Rungs>
            </Ladder>

            <Bar aria-label={`Question ${currentIndex + 1} of ${total}, score ${score}`} style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
                {steps.map(index => (
                    <Segment key={index} $state={answeredState(index) ?? (index === currentIndex ? 'current' : 'upcoming')} />
                ))}
            </Bar>
        </>
    );
}

import React from 'react';
import { Container, Text } from './SelectDifficult.styles';
import Select, { SingleValue } from 'react-select';

interface Props {
    onSelect(difficult: string): void;
}

export default function SelectDifficult(props: Props) {

    const options = [
        {
            value: 'hard',
            label: 'Hard'
        },
        {
            value: 'medium',
            label: 'Medium'
        },
        {
            value: 'easy',
            label: 'Easy'
        }
    ];

    const { onSelect } = props;

    const handleOnChange = (option: SingleValue<{ value: string, label: string }>) => {
        if (option) {
            onSelect(option.value);
        }
    }

    return (
        <Container>
            <Text>
                Select the difficult
            </Text>
            <Select options={options} onChange={handleOnChange} />
        </Container>
    );
}
import React, { useEffect, useState } from 'react';
import { Category } from '../../interfaces/Category';
import { CategoryService } from '../../services/CategoryService';
import { Text, Container } from './SelectCategory.styles';
import Select, { SingleValue } from 'react-select';

interface Props {
    onSelect(category: Category): void;
}

export default function SelectCategory(props: Props) {

    const [categories, setCategories] = useState<Category[]>([]);

    const { onSelect } = props;

    const handleOnChange = (option: SingleValue<{ value: number, label: string }>) => {
        const category = categories.find(item => item.id === option?.value);
        if (category) {
            onSelect(category);
        }
    }

    const listCategories = async () => {
        const response = await CategoryService.listAll();
        setCategories(response.data.trivia_categories);
    }

    useEffect(() => {
        listCategories();
    }, []);

    return (
        <Container>
            <Text>
                Select the category
            </Text>
            <Select
                options={categories.map(category => ({
                    value: category.id,
                    label: category.name
                }))}
                onChange={handleOnChange}
            />
        </Container>
    );
}
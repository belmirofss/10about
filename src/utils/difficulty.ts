export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTIES: { value: Difficulty, label: string, level: number }[] = [
    { value: 'easy', label: 'Easy', level: 1 },
    { value: 'medium', label: 'Medium', level: 2 },
    { value: 'hard', label: 'Hard', level: 3 }
];

export const DEFAULT_DIFFICULTY: Difficulty = 'medium';

export const isDifficulty = (value: unknown): value is Difficulty =>
    DIFFICULTIES.some(item => item.value === value);

export const difficultyLabel = (value: string | null | undefined): string =>
    DIFFICULTIES.find(item => item.value === value)?.label ?? '';

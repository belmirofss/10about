import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Category } from "../../interfaces/Category";
import { CategoryService } from "../../services/CategoryService";

export interface CategoriesState {
    items: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CategoriesState = {
    items: [],
    status: 'idle'
};

/** Drops Open Trivia DB's group prefixes: "Entertainment: Books" → "Books". */
export const shortCategoryName = (name: string): string => name.replace(/^(Entertainment|Science): /, '');

export const loadCategories = createAsyncThunk(
    'categories/load',
    async (): Promise<Category[]> => {
        const response = await CategoryService.listAll();
        return response.data.trivia_categories.map(category => ({
            ...category,
            name: shortCategoryName(category.name)
        }));
    },
    {
        // The list never changes during a session, so fetch it once.
        condition: (_, { getState }) => {
            const { status } = (getState() as RootState).categories;
            return status === 'idle' || status === 'failed';
        }
    }
);

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadCategories.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loadCategories.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'succeeded';
        })
        .addCase(loadCategories.rejected, (state) => {
            state.status = 'failed';
        });
    }
});

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesStatus = (state: RootState) => state.categories.status;
export const selectCategoryName = (id: string | number | null | undefined) => (state: RootState) =>
    state.categories.items.find(category => String(category.id) === String(id))?.name;

export default categoriesSlice.reducer;

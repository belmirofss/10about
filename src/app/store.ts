import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from '../features/categories/categoriesSlice';
import quizReducer from '../pages/quiz/quizSlice';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  quiz: quizReducer
});

export const createStore = (preloadedState?: Partial<ReturnType<typeof rootReducer>>) => configureStore({
  reducer: rootReducer,
  preloadedState
});

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

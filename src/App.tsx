import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './App.styles';
import Home from './pages/home/Home';
import NewQuiz from './pages/new-quiz/NewQuiz';
import Quiz from './pages/quiz/Quiz';
import Result from './pages/result/Result';
import { theme } from './theme';

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='new-quiz' element={<NewQuiz />} />
        <Route path='quiz/:categoryId/:difficult' element={<Quiz />} />
        <Route path='result' element={<Result />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </ThemeProvider>
  );
}

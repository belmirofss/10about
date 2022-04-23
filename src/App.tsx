import React from 'react';
import Header from './components/header/Header';
import { Content, GlobalStyles } from './App.styles';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import NewQuiz from './pages/new-quiz/NewQuiz';
import Quiz from './pages/quiz/Quiz';
import Result from './pages/result/Result';

export default function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Content>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='new-quiz' element={<NewQuiz />} />
          <Route path='quiz/:categoryId/:difficult' element={<Quiz />} />
          <Route path='result' element={<Result />} />
        </Routes>
      </Content>
    </ThemeProvider>
  );
}


import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from './app/store';
import App from './App';

jest.mock('./services/CategoryService', () => ({
  CategoryService: { listAll: () => new Promise(() => undefined) }
}));

test('renders the home page call to action', () => {
  const { getByText } = render(
    <Provider store={createStore()}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText(/start a game/i)).toBeInTheDocument();
});

test('sends unknown routes back home', () => {
  const { getByText } = render(
    <Provider store={createStore()}>
      <MemoryRouter initialEntries={['/nowhere']}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText(/ten questions\. one topic\./i)).toBeInTheDocument();
});

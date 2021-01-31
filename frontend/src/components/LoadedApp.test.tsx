import React from 'react';
import {getByText, render, screen} from '@testing-library/react';
import { MoviesResponse } from '../api/api';
import Config from '../domain/Config';
import LoadedApp, { TestIds } from './LoadedApp';
import { makeMovie } from '../domain/Movie.test';
import { renderRating } from '../domain/Movie';

// Mock window.matchMedia not implemented by JSDOM.
// See https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// I suppose that I will need to move this to a common file.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

const makeConfig = (): Config => ({
  title: 'Test Title',
  introduction: 'Welcome to our tests.',
});

const makeMoviesData = (): MoviesResponse => ({
  config: makeConfig(),
  movies: [makeMovie()],
});

test('renders', () => {
  const moviesData = makeMoviesData();
  const movie = makeMovie();
  render(<LoadedApp moviesData={moviesData} />);
  const movieListTable = screen.getByTestId(TestIds.movieListTable);
  expect(getByText(movieListTable, movie.title)).toBeInTheDocument();
  expect(getByText(movieListTable, renderRating(movie))).toBeInTheDocument();
});

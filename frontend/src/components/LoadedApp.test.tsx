import React from 'react';
import { fireEvent, getAllByRole, getByRole, getByText, render, screen, waitFor } from '@testing-library/react';
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
  movies: [
    makeMovie({
      title: 'Movie One',
      year: '1950',
    }),
    makeMovie({
      title: 'Movie Two',
      year: '1940',
    })
  ],
});


const assertDefaultOrder = (moviesData: MoviesResponse, movieListTable: HTMLElement) => {
  const movie1 = moviesData.movies[0];
  const movie2 = moviesData.movies[1];
  const rows = getAllByRole(movieListTable, 'row');
  expect(rows.length).toEqual(3); // 1 header, 2 body
  // Movie Two should actually come first: the default sorting is by year ascending.
  expect(getByText(rows[1], movie2.title)).toBeInTheDocument();
  expect(getByText(rows[1], renderRating(movie2))).toBeInTheDocument();
  expect(getByText(rows[2], movie1.title)).toBeInTheDocument();
};

const assertSortedByTitle = (moviesData: MoviesResponse, movieListTable: HTMLElement) => {
  const movie1 = moviesData.movies[0];
  const movie2 = moviesData.movies[1];
  const rows = getAllByRole(movieListTable, 'row');
  expect(rows.length).toEqual(3); // 1 header, 2 body
  expect(getByText(rows[1], movie1.title)).toBeInTheDocument();
  expect(getByText(rows[2], movie2.title)).toBeInTheDocument();
};

describe('<LoadedApp>', () => {
  it('renders table in proper order', async () => {
    const moviesData = makeMoviesData();
    render(<LoadedApp moviesData={moviesData} />);
    const movieListTable = screen.getByTestId(TestIds.movieListTable);
    assertDefaultOrder(moviesData, movieListTable);

    // Now sort by title.
    fireEvent.click(getByRole(movieListTable, 'columnheader', { name: /Title/ }));
    await waitFor(() => {
      assertSortedByTitle(moviesData, movieListTable);
    });
  });
});

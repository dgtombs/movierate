import React from 'react';
import { fireEvent, getAllByRole, getByRole, getByText, render, screen, waitFor } from '@testing-library/react';
import { MoviesResponse } from '../api/api';
import Config from '../domain/Config';
import LoadedApp, { TestIds } from './LoadedApp';
import { TestIds as MovieDetailsTestIds } from './MovieDetails';
import { makeMovie } from '../domain/Movie.test';
import { renderRating } from '../domain/Movie';

// Mock window.matchMedia not implemented by JSDOM but required by antd.
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
      review: 'Movie One was OK',
    }),
    makeMovie({
      title: 'Movie Two',
      year: '1940',
      review: 'Movie Two was so cool',
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

  it('opens and closes details pane', async () => {
    // Arrange
    const moviesData = makeMoviesData();
    const movie1 = moviesData.movies[0];
    const movie2 = moviesData.movies[1];
    render(<LoadedApp moviesData={moviesData} />);

    const expectNoMovie1 = () => {
      expect(screen.queryByText(movie1.review)).toBeNull();
    };
    const expectNoMovie2 = () => {
      expect(screen.queryByText(movie2.review)).toBeNull();
    };
    const expectMovie1 = () => {
      screen.getByText(movie1.review);
    };
    const expectMovie2 = () => {
      screen.getByText(movie2.review);
    };

    // Act & Assert
    screen.getByText(moviesData.config.introduction);

    expectNoMovie1();
    expectNoMovie2();
    fireEvent.click(screen.getByRole('cell', { name: movie1.title }));

    await waitFor(() => {
      expectMovie1();
      expectNoMovie2();
    });
    fireEvent.click(screen.getByRole('cell', { name: movie2.title }));
    await waitFor(() => {
      expectMovie2();
      expectNoMovie1();
    });
    // Is there a way to find this control other than by testid?
    fireEvent.click(screen.getByTestId(MovieDetailsTestIds.closeButton));
    await waitFor(() => {
      expectNoMovie1();
      expectNoMovie2();
    });
  });
});

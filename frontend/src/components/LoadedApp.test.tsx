import React from 'react';
import { act, fireEvent, getAllByRole, getByRole, getByText, render, screen, waitFor } from '@testing-library/react';
import { MoviesResponse } from '../api/api';
import LoadedApp, { TestIds } from './LoadedApp';
import MovieDetails, { Props } from './MovieDetails';
import { makeMovie } from '../domain/Movie.test';
import { renderRating } from '../domain/Movie';
import { mockMatchMedia } from '../utils/test-utils';

mockMatchMedia();

jest.mock('./MovieDetails');
const MovieDetailsMock = MovieDetails as jest.Mock;

const detailsMockTestId = 'movie-details-mock';

const introductionText = 'Welcome to our tests.';

const makeMoviesData = (): MoviesResponse => ({
  config: {
    title: 'Test Title',
    introduction: introductionText,
  },
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
  beforeEach(() => {
      MovieDetailsMock.mockImplementation(
          (props: Props) => <div data-testid={detailsMockTestId}>{props.movie.title}</div>
      );
  });

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
    /* Arrange */
    const moviesData = makeMoviesData();
    const movie1 = moviesData.movies[0];
    const movie2 = moviesData.movies[1];
    render(<LoadedApp moviesData={moviesData} />);

    const expectNoMovieSelected = () => {
      screen.getByText(introductionText);
      expect(screen.queryByTestId(detailsMockTestId)).toBeNull();
    };

    /* Act & Assert */

    // Default state.
    expectNoMovieSelected();

    // Select Movie 1.
    MovieDetailsMock.mockClear();
    fireEvent.click(screen.getByRole('cell', { name: movie1.title }));
    await waitFor(() => {
      expect(screen.getByTestId(detailsMockTestId)).toHaveTextContent(movie1.title);
    });

    // Select Movie 2.
    MovieDetailsMock.mockClear();
    fireEvent.click(screen.getByRole('cell', { name: movie2.title }));
    await waitFor(() => {
      expect(screen.getByTestId(detailsMockTestId)).toHaveTextContent(movie2.title);
    });

    // Close movie details.
    expect(MovieDetailsMock.mock.calls.length).toBeGreaterThanOrEqual(1);
    const onClose = MovieDetailsMock.mock.calls[0][0].onClose;
    MovieDetailsMock.mockClear();
    act(() => {
      onClose();
    });
    await waitFor(() => {
      expectNoMovieSelected();
    });
  });
});

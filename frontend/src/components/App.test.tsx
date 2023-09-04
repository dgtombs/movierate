import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import App from './App';
import { TestIds as MovieDetailsTestIds } from './MovieDetails';
import { getMovies, MoviesResponse } from '../api/api';
import { makeMovie } from '../domain/Movie.test';
import { mockMatchMedia } from '../utils/test-utils';

mockMatchMedia();

const introductionText = 'This is the introduction.';

const makeMoviesResponse = (): MoviesResponse => ({
    config: {
        title: 'Test Title',
        introduction: introductionText,
    },
    movies: [
        makeMovie({
            title: 'Test Movie One',
            review: 'Movie One was cool.',
        }),
        makeMovie({
            title: 'Test Movie Two',
            review: 'Movie Two was also cool.',
        }),
    ],
});

jest.mock('../api/api');

// Since <App> itself doesn't have much interesting functionality, these are the integration tests.
// I'm just covering some basics: unit tests will cover the rest.
describe('<App>', () => {
    it('opens and closes details pane', async () => {
        // Arrange
        const moviesResponse = makeMoviesResponse();
        (getMovies as jest.Mock).mockImplementation(() => Promise.resolve(moviesResponse));
        const movie1 = moviesResponse.movies[0];
        const movie2 = moviesResponse.movies[1];
        render(<App />);

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

        // Starts with the loading screen.
        screen.getByText('Loading...');

        await waitFor(() => {
            screen.getByText(introductionText);
            expectNoMovie1();
            expectNoMovie2();
        });

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
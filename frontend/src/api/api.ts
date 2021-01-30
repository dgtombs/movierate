/*
 * Communication with backend API.
 *
 * For now this fits in one module. If it gets big, I'll split it up.
 */

import Movie from '../domain/Movie';
import Config from '../domain/Config';

/**
 * Response object format from the movies.json endpoint.
 * This includes both app configuration and the movie list in order to reduce the number of requests needed to load the
 * app.
 */
export interface MoviesResponse {
    config: Config;
    movies: Movie[];
}

export const getMovies = (): Promise<MoviesResponse> =>
    fetch('api/movies.json').then(response => response.json());

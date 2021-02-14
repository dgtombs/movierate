import Movie, { renderRating } from './Movie';

/**
 * Returns a new Movie object with the given properties.
 * Any properties not provided will have sensible defaults.
 */
export const makeMovie = (properties: Partial<Movie> = {}): Movie =>
    Object.assign({
        title: 'Test Movie Title',
        year: '1990',
        rating: 1,
        rateDate: '2021-01-01',
        director: 'Jest',
        review: '',
    }, properties);

describe('renderRating', () => {
    it('returns correct string for a normal rating', () => {
        let movie = makeMovie();
        expect(renderRating(movie)).toEqual('1/5: Very Bad!');
    });
    it('returns correct string for an overridden rating', () => {
        let movie = makeMovie();
        movie.rating = 4;
        movie.ratingText = 'Good (and Ugly)';
        expect(renderRating(movie)).toEqual('4/5: Good (and Ugly)');
    });
});
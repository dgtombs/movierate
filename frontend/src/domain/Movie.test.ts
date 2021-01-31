import Movie, { renderRating } from './Movie';

export const makeMovie = (): Movie => ({
    title: 'Test Movie Title',
    year: '1990',
    rating: 1,
    director: 'Jest',
    review: '',
});

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
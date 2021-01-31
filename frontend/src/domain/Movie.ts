interface Movie {
    title: string;
    year: string;
    director: string;
    rating: Rating;
    // If present, overrides the default text for the rating.
    ratingText?: string;
    // Markdown supported here.
    review: string;
}

export type Rating = 1|2|3|4|5;

/**
 * The default rating text for each of the possible numerical ratings.
 */
export const DEFAULT_RATING_TEXTS = {
    1: 'Very Bad!',
    2: 'Bad',
    3: 'Alright',
    4: 'Good',
    5: 'Very Good!',
};

/**
 * Renders the movie rating as text.
 *
 * @param movie
 */
export const renderRating = (movie: Movie): string =>
    String(movie.rating) + '/5: ' + (movie.ratingText || DEFAULT_RATING_TEXTS[movie.rating]);

export default Movie;

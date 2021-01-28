interface Movie {
    title: string;
    year: string;
    director: string;
    rating: Rating;
    // If present, overrides the default text for the rating.
    ratingText?: string;
    // Just text for now, Markdown format will be supported soon.
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
 * Renders a rating as text.
 *
 * @param rating
 */
export const renderRating = (rating: Rating): string =>
    String(rating) + '/5: ' + DEFAULT_RATING_TEXTS[rating];

export default Movie;
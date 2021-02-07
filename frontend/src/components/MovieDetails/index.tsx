import { Typography } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import '../App.css';
import Movie, { renderRating } from '../../domain/Movie';
import moment from 'moment';

const { Text, Title } = Typography;

export interface Props {
    movie: Movie;
}

const MovieDetails: React.FC<Props> = ({ movie }) =>
        <div className={'movie-details'}>
            <Title level={2}>{movie.title} ({movie.year})</Title>
            <Title level={5}>Rating</Title>
            <Text>{renderRating(movie)}</Text>
            <Title level={5}>Director</Title>
            <Text>{movie.director}</Text>
            <Title level={5}>Review</Title>
            <ReactMarkdown>{movie.review}</ReactMarkdown>
            <Text type={'secondary'}>Reviewed {moment(movie.rateDate).format('LL')}.</Text>
        </div>;

export default MovieDetails;

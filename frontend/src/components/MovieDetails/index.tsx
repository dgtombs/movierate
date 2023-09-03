import { CloseOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import '../App.css';
import Movie, { renderRating } from '../../domain/Movie';
import moment from 'moment';

const { Text, Title } = Typography;

export interface Props {
    movie: Movie;
    // Called when the user clicks the close button.
    onClose: () => void;
}

export const TestIds = {
    closeButton: 'close-button',
}

const MovieDetails: React.FC<Props> = ({ movie, onClose }) =>
        <div className={'movie-details'}>
            <header>
                <Title level={2}>{movie.title} ({movie.year})</Title>
                <Button type={'text'} className={'close-button'} data-testid={TestIds.closeButton} onClick={onClose}>
                    <CloseOutlined />
                </Button>
            </header>
            <Title level={5}>Rating</Title>
            <Text>{renderRating(movie)}</Text>
            <Title level={5}>Director</Title>
            <Text>{movie.director}</Text>
            <Title level={5}>Review</Title>
            <ReactMarkdown>{movie.review}</ReactMarkdown>
            <Text type={'secondary'}>Reviewed {moment(movie.rateDate).format('LL')}.</Text>
        </div>;

export default MovieDetails;

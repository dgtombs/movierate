import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

import Movie, { renderRating } from '../domain/Movie';
import { MoviesResponse } from '../api/api';
import { stringSorter } from '../utils/sorting';
import ConfigContext from './ConfigContext';
import MovieDetails from './MovieDetails';

const { Title } = Typography;

export const TestIds = {
    movieListTable: 'movie-list-table',
};

export interface Props {
    moviesData: MoviesResponse;
}

const Introduction: React.FC = () => {
    const config = useContext(ConfigContext);
    return <div className={'introduction'}>
        <Title level={2}>Introduction</Title>
        <ReactMarkdown>{config.introduction}</ReactMarkdown>
    </div>;
};

/**
 * The App with initial data loaded.
 *
 * @param props
 */
const LoadedApp: React.FC<Props> = ({ moviesData }) => {
    const { config, movies } = moviesData;
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    useEffect(() => {
        document.title = config.title;
    });
    const closeMovie = () => {
        setSelectedMovie(null);
    };

    const columns: ColumnsType<Movie> = [
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => stringSorter(a.title, b.title),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => stringSorter(a.year, b.year),
        },
        {
            title: 'Director',
            dataIndex: 'director',
        },
        {
            title: 'Rating',
            className: 'rating-column',
            dataIndex: 'rating',
            render: (_, movie) => renderRating(movie),
            sorter: (a, b) => b.rating - a.rating,
        },
        {
            title: 'Review Date',
            className: 'review-date-column',
            dataIndex: 'rateDate',
            render: rateDate => moment(rateDate).format('l'),
            sorter: (a, b) => stringSorter(a.rateDate, b.rateDate),
        }
    ];
    // Don't show the Director column if we have a movie selected.
    // Since the movie details panel is wider, it makes the list too crowded when it is open.
    if (selectedMovie) {
        columns.splice(2, 1);
    }

    return (
        <ConfigContext.Provider value={config}>
            <header><Title>{config.title}</Title></header>
            <div className="main-content">
                <div className="movie-list">
                    <Table
                        data-testid={TestIds.movieListTable}
                        columns={columns}
                        dataSource={movies}
                        rowKey={(record => record.title + record.year)}
                        onRow={record => ({
                            onClick: () => setSelectedMovie(record),
                        })}
                    />
                </div>
                {selectedMovie ? <MovieDetails movie={selectedMovie} onClose={closeMovie} /> : <Introduction/>}
            </div>
            <footer>
                {/* Should I use Ant 'secondary' typography here? I feel it's a little too translucent. */}
                <a href='https://github.com/dgtombs/movierate' className={'source-repo-link'}><img src='GitHub-Mark-16px.png' alt='GitHub logo' /> Source Code</a>
            </footer>
        </ConfigContext.Provider>
    );
};

export default LoadedApp;

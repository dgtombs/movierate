import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import Movie, { renderRating } from '../domain/Movie';
import MovieDetails from './MovieDetails';
import { MoviesResponse } from '../api/api';
import ConfigContext from './ConfigContext';

const { Title } = Typography;

export interface Props {
    moviesData: MoviesResponse;
}

const columns: ColumnsType<Movie> = [
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Year',
        dataIndex: 'year',
    },
    {
        title: 'Director',
        dataIndex: 'director',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        render: renderRating,
    },
];

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
    return (
        <ConfigContext.Provider value={config}>
            <header><Title>{config.title}</Title></header>
            <div className="main-content">
                <div className="movie-list">
                    <Table
                        columns={columns}
                        dataSource={movies}
                        rowKey={(record => record.title + record.year)}
                        onRow={record => ({
                            onClick: () => setSelectedMovie(record),
                        })}
                    />
                </div>
                {selectedMovie ? <MovieDetails movie={selectedMovie}/> : <Introduction/>}
            </div>
            <footer>
                {/* Should I use Ant 'secondary' typography here? I feel it's a little too translucent. */}
                <a href='https://github.com/dgtombs/movierate' className={'source-repo-link'}><img src='GitHub-Mark-16px.png' alt='GitHub logo' /> Source Code</a>
            </footer>
        </ConfigContext.Provider>
    );
};

export default LoadedApp;

import React, { useContext, useState } from 'react';
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
        title: 'Rating',
        dataIndex: 'rating',
        render: renderRating,
    },
];

const Introduction: React.FC = () => {
    const config = useContext(ConfigContext);
    return <>
        <Title level={2}>Introduction</Title>
        <ReactMarkdown>{config.introduction}</ReactMarkdown>
    </>;
};

/**
 * The App with initial data loaded.
 *
 * @param props
 */
const LoadedApp: React.FC<Props> = ({ moviesData }) => {
    const { config, movies } = moviesData;
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    return (
        <ConfigContext.Provider value={config}>
            <Title>{config.title}</Title>
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
                <div>
                    {selectedMovie ? <MovieDetails movie={selectedMovie}/> : <Introduction/>}
                </div>
            </div>
        </ConfigContext.Provider>
    );
};

export default LoadedApp;

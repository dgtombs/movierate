import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import 'antd/dist/antd.css';
import React, { useState } from 'react';

import Movie, { Rating, renderRating } from "../domain/Movie";
import './App.css';
import MovieDetails from "./MovieDetails";

const { Title } = Typography;

// Just include some sample data for now until we start loading ratings from the server.
const dataSource: Movie[] = [
    {
        title: 'Sample Movie',
        year: '2020',
        director: 'David Tombs',
        rating: 3,
        review: 'My thoughts will go here.'
    },
];

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

const Introduction: React.FC = () =>
    <>
        <Title level={2}>Introduction</Title>
        <p>When you first load the page, some introductory text appears here.</p>
        <p>When you select a movie, its details will appear here.</p>
    </>;

function App() {
    const [selectedMovie, setSelectedMovie] = useState<Movie|null>(null);
    return (
        <div className="App">
            <Title>Movies Good, Bad, and Ugly</Title>
            <div className="main-content">
                <div className="movie-list">
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={(record => record.title + record.year)}
                        onRow={record => ({
                            onClick: () => setSelectedMovie(record),
                        })}
                    />
                </div>
                <div>
                    {selectedMovie ? <MovieDetails movie={selectedMovie} /> : <Introduction/>}
                </div>
            </div>
        </div>
    );
}

export default App;

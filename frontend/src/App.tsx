import { Table, Typography } from 'antd';
import React from 'react';

import 'antd/dist/antd.css';
import './App.css';

const { Title } = Typography;

const dataSource = [
    {
        title: 'Sample Movie',
        year: '2020',
        rating: 'Good',
    },
];

const columns = [
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
    },
];

function App() {
  return (
    <div className="App">
        <Title>Movies Good, Bad, and Ugly</Title>
        <div className="main-content">
            <div className="movie-list">
                <Table columns={columns} dataSource={dataSource} rowKey={(record => record.title + record.year)}/>
            </div>
            <div className="movie-details">
                <Title level={2}>Introduction</Title>
                <p>When you first load the page, some introductory text appears here.</p>
                <p>When you select a movie, its details will appear here.</p>
            </div>
        </div>
    </div>
  );
}

export default App;

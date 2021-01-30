import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';

import './App.css';
import LoadedApp from './LoadedApp';
import { getMovies, MoviesResponse } from '../api/api';

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [moviesResponse, setMoviesResponse] = useState<MoviesResponse|null>(null);

    if (!moviesResponse) {
        getMovies().then(response => {
            setMoviesResponse(response);
        }).finally(() => {
            // Whether we succeeded or failed, we're done loading.
            setLoading(false)
        });
    }

    return (
        <div className="App">
            {loading ?
                <><Spin/> Loading...</> :
                // If we finished loading but `movies` is null, that means we failed to load the movies.
                moviesResponse ?
                    <LoadedApp moviesData={moviesResponse} /> :
                    <>Unable to load movie database. Please contact the site owner.</>
            }
        </div>
    );
};

export default App;

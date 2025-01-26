import React from 'react';
import HorrorMovies from "./HorrorMovies";
import ComedyMovies from "./ComedyMovies";
import AnimeMovies from "./AnimeMovies";
import FantasyMovies from './FantasyMovies';
import MusicMovies from "./MusicMovies";
import WarMovies from "./WarMovies";

function Movies(props) {
    return (
        <div className='MovieAction'>
            <div className="container">
                <HorrorMovies/>
                <ComedyMovies/>
                <AnimeMovies/>
                <FantasyMovies/>
                <MusicMovies/>
                <WarMovies/>
            </div>
        </div>
    );
}

export default Movies;
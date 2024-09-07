import React from 'react';
import HorrorMovies from "./HorrorMovies";
import ComedyMovies from "./ComedyMovies";

function Movies(props) {
    return (
        <div className='MovieAction'>
            <div className="container">
                <HorrorMovies/>
                <ComedyMovies/>
            </div>
        </div>
    );
}

export default Movies;
import React from 'react';
import ActionMovie from "../../Components/FilmsCategory/actionMovie/ActionMovie";
import Movies from "../../Components/FilmsCategory/Movies";

function Home(props) {
    return (
        <div className='home'>
           <Movies/>
        </div>
    );
}

export default Home;
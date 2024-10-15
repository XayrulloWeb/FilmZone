import React from 'react';
import Movies from "../../Components/FilmsCategory/Movies";
import Banner from "../../Header/Navbar/Banner";

function Home(props) {
    return (
        <div className='home'>
            <div className="navbar_back">
                <Banner movieId={1}/>

            </div>

           <Movies/>
        </div>
    );
}

export default Home;
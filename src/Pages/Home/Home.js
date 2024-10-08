import React from 'react';
import ActionMovie from "../../Components/FilmsCategory/actionMovie/ActionMovie";
import Movies from "../../Components/FilmsCategory/Movies";
import Banner from "../../Header/Navbar/Banner";

function Home(props) {
    return (
        <div className='home'>
            <div className="navbar_back">
                <Banner />

            </div>

           <Movies/>
        </div>
    );
}

export default Home;
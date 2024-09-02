import React from 'react';
import logo from "../../assets/Logo's/logoSite.png"
import profile_logo from "../../assets/Logo's/profile_logo.png"

function Navbar(props) {
    return (
        <div className='navbar'>
            <div className="container">
                <div className="navbar_start">
                    <div className="navbar_logo">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="navbar_links">
                        <ul>
                            <li><a className='navbar_link' href="#">Home</a></li>
                            <li><a className='navbar_link' href="#">Discover</a></li>
                            <li><a className='navbar_link' href="#">Movie Release</a> </li>
                            <li><a className='navbar_link' href="#">Forum</a></li>
                            <li><a className='navbar_link' href="#">About</a></li>
                        </ul>
                    </div>
                    <div className="navbar_profile">
                        <div className="navbar_profile-search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="navbar_profile-notification">
                            <i className="fa-regular fa-bell"></i>
                        </div>
                        <div className="navbar_profile_logo">
                            <img src={profile_logo} alt="profile_logo"/>
                            <i className="fa-solid fa-arrow-down"></i>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
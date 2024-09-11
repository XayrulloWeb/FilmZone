import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo's/logoSite.png";
import profile_logo from "../../assets/Logo's/profile_logo.png";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const openDropdown = () => {
        dropdownRef.current.classList.replace("hidden", "dropdown-open");
    };

    const closeDropdown = () => {
        dropdownRef.current.classList.replace("dropdown-open", "dropdown-close");
        dropdownRef.current.addEventListener("animationend", () => {
            dropdownRef.current.classList.add("hidden");
            dropdownRef.current.classList.remove("dropdown-close");
        }, { once: true });
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
        if (!isOpen) {
            openDropdown();
        } else {
            closeDropdown();
        }
    };

    const handleClickOutside = (event) => {
        if (isOpen && !buttonRef.current.contains(event.target) && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            closeDropdown();
        }
    };

    useEffect(() => {
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className='navbar'>
            <div className="container">
                <div className="navbar_start">
                    <div className="navbar_logo">
                        <Link to='/'>
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="navbar_links">
                        <ul>
                            <li><Link className='navbar_active' to="/">Home</Link></li>
                            <li><Link to='/discover'>Discover</Link></li>
                            <li><Link to='/movie-release'>Movie Release</Link></li>
                            <li><Link to='/forum'>Forum</Link></li>
                            <li><Link to='/about'>About</Link></li>
                        </ul>
                    </div>
                    <div className="navbar_profile">
                        <div className="navbar_profile-search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="navbar_profile-notification">
                            <i className="fa-regular fa-bell"></i>
                        </div>
                        <div className="navbar_profile_logo" id="dropdown-btn" ref={buttonRef} onClick={toggleDropdown}>
                            <img src={profile_logo} alt="profile_logo" />
                            <i className="fa-solid fa-arrow-down"></i>
                        </div>
                        <div ref={dropdownRef} id="dropdown"
                             className="dropdown-menu hidden">
                            <div className="p-2 px-3">
                                <span>My Account</span>
                            </div>
                            <div className="p-1">
                                <button
                                    className="dropdown-item">Profile
                                </button>
                                <button
                                    className="dropdown-item">Dashboard
                                </button>
                                <button
                                    className="dropdown-item">Settings
                                </button>
                            </div>
                            <div className="p-1">
                                <button
                                    className="dropdown-item">Github
                                </button>
                            </div>
                            <div className="p-1">
                                <button
                                    className="dropdown-item">Sign Out
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

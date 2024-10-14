import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo's/logoSite.png";
import profile_logo from "../../assets/Logo's/profile_logo.png";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle Dropdown Menu
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
        if (!isOpen) openDropdown();
        else closeDropdown();
    };

    // Handle clicking outside the dropdown
    const handleClickOutside = (event) => {
        if (isOpen && !buttonRef.current.contains(event.target) && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            closeDropdown();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
        return () => document.removeEventListener("click", handleClickOutside);
    }, [handleClickOutside]);

    // Handle Search Toggle
    const searchToggle = (evt) => {
        if (!isActive) {
            setIsActive(true);
            evt.preventDefault();
        } else if (!evt.target.closest('.input-holder')) {
            setIsActive(false);
            setSearchValue('');
        }
    };

    // Handle Scroll Event for Navbar
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle Mobile Menu
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    return (
        <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar_start">
                    <div className="navbar_logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="burger-menu" onClick={toggleMobileMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className={`navbar_links ${isMobileMenuOpen ? 'open' : ''}`}>
                        <ul>
                            <li><Link className='navbar_active' to="/">Home</Link></li>
                            <li><Link to='/discover'>Discover</Link></li>
                            <li><Link to='/movie-release'>Movie Release</Link></li>
                            <li><Link to='/forum'>Forum</Link></li>
                            <li><Link to='/about'>About</Link></li>
                        </ul>
                        <div className="navbar_profile-search">
                            <span>Search</span>
                            <div className={`search-wrapper ${isActive ? 'active' : ''}`} onClick={searchToggle}>
                                <div className="input-holder">
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Type to search"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                    <i onClick={searchToggle} className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <span className="close" onClick={searchToggle}></span>
                            </div>
                        </div>
                    </div>
                    <div className="navbar_profile">
                        <div className="navbar_profile-search">
                            <div className={`search-wrapper ${isActive ? 'active' : ''}`} onClick={searchToggle}>
                                <div className="input-holder">
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Type to search"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                    <i onClick={searchToggle} className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <span className="close" onClick={searchToggle}></span>
                            </div>
                        </div>
                        <div className="navbar_profile-notification">
                            <Link to="/watchlist">
                                <i className="fa-regular fa-bell"></i>
                            </Link>
                        </div>
                        <div className="navbar_profile_logo" ref={buttonRef} onClick={toggleDropdown}>
                            <img src={profile_logo} alt="profile_logo" />
                            <i className="fa-solid fa-arrow-down"></i>
                        </div>
                        <div ref={dropdownRef} className="dropdown-menu hidden">
                            <div className="p-2"><i className="fa-solid fa-user"></i> <span>My Account</span></div>
                            <div className="p-1">
                                <button className="dropdown-item">Profile</button>
                                <button className="dropdown-item">Dashboard</button>
                                <button className="dropdown-item">Settings</button>
                            </div>
                            <div className="p-1"><button className="dropdown-item">Github</button></div>
                            <div className="p-1"><button className="dropdown-item">Sign Out</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

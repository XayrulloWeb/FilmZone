import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo's/logoSite.png";
import profile_logo from "../../assets/Logo's/profile_logo.png";
import { Link, useHistory } from "react-router-dom";
import LogoutButton from "../../Buttons/LogoutButton";

function Navbar() {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // New state for user authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Change this based on your authentication logic

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
    }, [isOpen]);

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

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {
                try {
                    const query = encodeURIComponent(searchTerm);
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&query=${query}`);
                    const result = await response.json();
                    const sortedResults = result.results.sort((a, b) => b.popularity - a.popularity);
                    setData(sortedResults);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [searchTerm]);

    const filteredData = data.filter(item => {
        const titleLowerCase = item.title ? item.title.toLowerCase() : '';
        const searchTermLowerCase = searchTerm.toLowerCase();
        return titleLowerCase.includes(searchTermLowerCase);
    });

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            history.push('/search-results', { results: filteredData, searchQuery: searchTerm });
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    </div>
                    <div className="navbar_profile">
                        <form onSubmit={handleSearchSubmit}>
                            <div className={`search-wrapper ${isActive ? 'active' : ''}`} onClick={searchToggle}>
                                <div className="input-holder">
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Type to search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <i onClick={handleSearchSubmit} className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                        </form>
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
                                {isAuthenticated ? (
                                    <button className="dropdown-item"><LogoutButton /></button>
                                ) : (
                                    <>
                                        <button className="dropdown-item" onClick={() => history.push('/login')}>Kirish</button>
                                        <button className="dropdown-item" onClick={() => history.push('/register')}>Ro'yhatdan o'tish</button>
                                    </>
                                )}
                            </div>
                            {isAuthenticated && (
                                <div className="p-1">
                                    <button className="dropdown-item">Github</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
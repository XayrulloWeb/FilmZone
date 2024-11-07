import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo's/logoSite.png";
import profile_logo from "../../assets/Logo's/profile_logo.png";
import { Link, useHistory } from "react-router-dom";

function Navbar() {
    const history = useHistory();
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
    }, [isOpen]); // Используйте isOpen в зависимостях

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

    const [data, setData] = useState([]); // Данные из API
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {
                try {
                    const query = encodeURIComponent(searchTerm); // Кодируем строку запроса
                    console.log('Encoded Query:', query); // Логируем закодированный запрос

                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&query=${query}`);
                    const result = await response.json();
                    console.log('API Result:', result); // Логируем результат от API

                    const sortedResults = result.results.sort((a, b) => b.popularity - a.popularity);
                    setData(sortedResults);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [searchTerm]);

// Логируем данные перед фильтрацией
    const filteredData = data.filter(item => {
        const titleLowerCase = item.title ? item.title.toLowerCase() : '';
        const searchTermLowerCase = searchTerm.toLowerCase();
        console.log('Filtering:', titleLowerCase, searchTermLowerCase); // Логируем процесс фильтрации

        return titleLowerCase.includes(searchTermLowerCase);
    });


    // Функция для обработки поиска и редиректа
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            // Используйте `data` или `filteredData`, в зависимости от ваших предпочтений
            history.push('/search-results', { results: filteredData, searchQuery: searchTerm });
        }
    };


    // Handle Scroll Event for Navbar
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
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
                            <img src={logo} alt="logo"/>
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
                        <img src={profile_logo} alt="profile_logo"/>
                        <i className="fa-solid fa-arrow-down"></i>
                    </div>
                    <div ref={dropdownRef} className="dropdown-menu hidden">
                        <div className="p-2"><i className="fa-solid fa-user"></i> <span>My Account</span></div>
                        <div className="p-1">
                            <button className="dropdown-item">Profile</button>
                            <button className="dropdown-item">Dashboard</button>
                            <button className="dropdown-item">Settings</button>
                        </div>
                        <div className="p-1">
                            <button className="dropdown-item">Github</button>
                        </div>
                        <div className="p-1">
                            <button className="dropdown-item">Sign Out</button>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Navbar;

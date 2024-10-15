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
            try {
                const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375');
                const result = await response.json();
                console.log(result); // Посмотрите структуру данных в консоли
                setData(result.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    // Фильтруем данные на основе поискового запроса
    const filteredData = data.filter(item =>
        item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Функция для обработки поиска и редиректа
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            history.push({
                pathname: '/search-results',
                state: { searchTerm, results: filteredData },
            });
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
                        </div>
                    </div>
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
    );
}

export default Navbar;

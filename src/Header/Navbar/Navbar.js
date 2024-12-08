import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/Logo's/logoSite.png";
import profile_logo from "../../assets/Logo's/profile_logo.png";
import { FlagIcon } from "react-flag-kit";
import "../../Lang/i18n";
import NavbarMobile from "./NavbarMobile"; // Make sure your i18n initialization is correct

function Navbar() {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangOpen, setLangOpen] = useState(false);

    const [data, setData] = useState([]); // Data fetched from the API

    // Handle dropdown menu visibility
    const openDropdown = () => {
        dropdownRef.current.classList.replace("hidden", "dropdown-open");
    };

    const closeDropdown = () => {
        dropdownRef.current.classList.replace("dropdown-open", "dropdown-close");
        dropdownRef.current.addEventListener(
            "animationend",
            () => {
                dropdownRef.current.classList.add("hidden");
                dropdownRef.current.classList.remove("dropdown-close");
            },
            { once: true }
        );
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
        if (!isOpen) openDropdown();
        else closeDropdown();
    };

    const handleClickOutside = (event) => {
        if (
            isOpen &&
            !buttonRef.current.contains(event.target) &&
            !dropdownRef.current.contains(event.target)
        ) {
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

    // Handle search input visibility toggle
    const searchToggle = (evt) => {
        if (!isActive) {
            setIsActive(true);
            evt.preventDefault();
        } else if (!evt.target.closest('.input-holder')) {
            setIsActive(false);
            setSearchTerm('');
        }
    };

    // Fetch data from API based on search term
    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {
                try {
                    const query = encodeURIComponent(searchTerm); // Encode the query string
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&query=${query}`
                    );
                    const result = await response.json();
                    const sortedResults = result.results.sort((a, b) => b.popularity - a.popularity);
                    setData(sortedResults);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchData();
    }, [searchTerm]);

    // Filter results based on search term
    const filteredData = data.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle search form submission
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            history.push('/search-results', { results: filteredData, searchQuery: searchTerm });
        }
    };

    // Handle scroll event to change navbar style
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle mobile menu visibility
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    // Toggle language dropdown visibility
    const openLang = () => {
        setLangOpen(prev => !prev);
    };

    // Change language
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setLangOpen(false); // Close the language dropdown after selection
    };

    return (
        <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
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
                    <div className={`navbar_links ${isMobileMenuOpen ? "open" : ""}`}>
                        <ul>
                            <li><Link className="navbar_active" to="/"><i className="fa-solid fa-home"></i>{t('welcome')}</Link></li>
                            <li><Link to="/discover"><i className="fa-solid fa-layer-group"></i>{t('selection')}</Link></li>
                            <li><Link to="/movie-release"><i className="fa-solid fa-clock"></i>{t('movieRelease')}</Link></li>
                            <li><Link to="/about"><i className="fa-solid fa-history"></i>{t('history')}</Link></li>
                        </ul>
                    </div>
                    <div className="navbar_profile">
                        <div className="language-switcher">
                            <button className="selected-language" onClick={openLang}>
                                <FlagIcon code={i18n.language === 'ru' ? "RU" : i18n.language === 'en' ? "GB" : "UZ"}
                                          size={24}/>
                                {i18n.language === 'ru' ? 'RU' : i18n.language === 'en' ? 'EN' : 'UZ'} <span
                                className="arrow">▾</span>
                            </button>
                            {/* Dropdown language menu */}
                            {isLangOpen && (
                                <div id="dropdown-lang" className="{`dropdown-lang ${isLangOpen ? 'show' : ''}`}">
                                    <button onClick={() => changeLanguage('ru')} className="language-option">
                                        <FlagIcon code="RU" size={24}/>
                                        Русский
                                    </button>
                                    <button onClick={() => changeLanguage('en')} className="language-option">
                                        <FlagIcon code="GB" size={24}/>
                                        English
                                    </button>

                                    <button className="language-option" onClick={() => changeLanguage('uz')}>
                                        <FlagIcon code="UZ" size={24}/>
                                        Uzbek
                                    </button>
                                </div>
                            )}
                        </div>


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
                                <i className="fa-solid fa-bookmark"></i>
                            </Link>
                        </div>

                        <div className="navbar_profile_logo" ref={buttonRef} onClick={toggleDropdown}>
                            <img src={profile_logo} alt="profile_logo"/>
                            <i className="fa-solid fa-arrow-down"></i>
                        </div>
                        <div ref={dropdownRef} className="dropdown-menu hidden">
                            <div className="p-2">
                                <i className="fa-solid fa-user"></i> <span>{t('myAccount')}</span>
                            </div>
                            <div className="p-1">
                                <button className="dropdown-item">{t('profile')}</button>
                                <button className="dropdown-item">{t('dashboard')}</button>
                                <button className="dropdown-item">{t('settings')}</button>
                            </div>
                            <div className="p-1">
                                <button className="dropdown-item">{t('github')}</button>
                            </div>
                            <div className="p-1">
                                <button className="dropdown-item">{t('signOut')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Navbar;

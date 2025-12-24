// src/Header/Navbar/Navbar.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import logo from "../../assets/Logo's/logoSite.png";
import profile_logo from "../../assets/Logo's/profile_logo.png";
// import './Navbar.css'; // Убедись, что стили подключены

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
	const [data, setData] = useState([]);

	const [user, setUser] = useState(null);
	const [loadingAuth, setLoadingAuth] = useState(true);

	// --- Логика получения данных пользователя (без изменений) ---
	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				console.log('Navbar: No token found.');
				setUser(null);
				setLoadingAuth(false);
				return;
			}

			setLoadingAuth(true);
			try {
				const response = await axios.get('http://localhost:5000/api/auth/me', {
					headers: { Authorization: `Bearer ${token}` },
				});
				console.log('Navbar user data fetched:', response.data); // Данные приходят правильно
				setUser(response.data);
			} catch (error) {
				// Ошибка теперь не возникает, но обработку оставим
				console.error('Navbar: Error fetching user data:', error.response?.data?.message || error.message);
				localStorage.removeItem('token');
				setUser(null);
			} finally {
				setLoadingAuth(false);
			}
		};

		fetchUser();
	}, []);

	// --- Логика выхода (без изменений) ---
	const handleLogout = () => {
		localStorage.removeItem('token');
		setUser(null);
		setIsOpen(false);
		closeDropdown();
		history.push('/login');
	};


	// --- Обработка дропдауна (без изменений) ---
	const openDropdown = () => {
		if (dropdownRef.current) {
			dropdownRef.current.classList.remove("hidden", "dropdown-close");
			dropdownRef.current.classList.add("dropdown-open");
		}
	};

	const closeDropdown = () => {
		if (dropdownRef.current && dropdownRef.current.classList.contains("dropdown-open")) {
			dropdownRef.current.classList.replace("dropdown-open", "dropdown-close");
			dropdownRef.current.addEventListener(
				"animationend",
				() => {
					if (dropdownRef.current) {
						dropdownRef.current.classList.add("hidden");
						dropdownRef.current.classList.remove("dropdown-close");
					}
				},
				{ once: true }
			);
		} else if (dropdownRef.current) {
			dropdownRef.current.classList.add("hidden");
		}
	};

	const toggleDropdown = () => {
		setIsOpen((prev) => {
			const nextState = !prev;
			if (nextState) {
				openDropdown();
			} else {
				closeDropdown();
			}
			return nextState;
		});
	};

	const handleClickOutside = useCallback((event) => {
		if (
			isOpen &&
			buttonRef.current &&
			dropdownRef.current &&
			!buttonRef.current.contains(event.target) &&
			!dropdownRef.current.contains(event.target)
		) {
			setIsOpen(false);
			closeDropdown();
		}
	}, [isOpen]);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isOpen, handleClickOutside]);


	// --- Поиск (без изменений) ---
	const searchToggle = (evt) => {
		if (!isActive) {
			setIsActive(true);
			evt.preventDefault();
		} else if (!evt.target.closest('.input-holder')) {
			setIsActive(false);
			setSearchTerm('');
		}
	};

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
					console.error("Error fetching data:", error);
				}
			} else {
				setData([]);
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
			setIsActive(false);
			history.push('/search-results', { results: filteredData, searchQuery: searchTerm });
		}
	};

	// --- Scroll & Mobile Menu (без изменений) ---
	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang);
		setLangOpen(false);
	};


	// --- РЕНДЕР КОМПОНЕНТА ---
	return (
		<div className={`navbar ${scrolled ? "scrolled" : ""}`}>
			<div className="container">
				<div className="navbar_start">
					<div className="navbar_logo">
						<Link to="/">
							<img src={logo} alt="logo" />
						</Link>
					</div>

					{/* Навигационные ссылки */}
					<div className={`navbar_links ${isMobileMenuOpen ? "open" : ""}`}>
						<ul>
							<li><Link className="navbar_active" to="/"><i className="fa-solid fa-home"></i>{t('common.welcome')}</Link></li>
							<li><Link to="/discover"><i className="fa-solid fa-layer-group"></i>{t('common.selection')}</Link></li>
							<li><Link to="/trending"><i className="fa-solid fa-fire"></i>{t('common.trending')}</Link></li>
							<li><Link to="/top-rated"><i className="fa-solid fa-star"></i>{t('common.topRated')}</Link></li>
							<li><Link to="/now-playing"><i className="fa-solid fa-film"></i>{t('common.nowPlaying')}</Link></li>
							<li><Link to="/movie-release"><i className="fa-solid fa-clock"></i>{t('common.movieRelease')}</Link></li>
							<li><Link to="/about"><i className="fa-solid fa-history"></i>{t('common.history')}</Link></li>
						</ul>
						{/* Показываем поиск и язык только в мобильном меню */}
						<div className="navbar_profile-search mobile-only"> {/* Класс для стилизации, если нужен */}
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
										<i className="fa-solid fa-magnifying-glass"></i> {/* Иконка внутри */}
									</div>
								</div>
							</form>
						</div>
						<div className="language-switcher mobile-only"> {/* Класс для стилизации */}
							{/* Твой код переключателя языка */}
						</div>
					</div>

					{/* Правая часть навбара */}
					<div className="navbar_profile">
						{/* Переключатель языка (только десктоп) */}
						<div className="language-switcher desktop-only"> {/* Класс для стилизации */}
							<button className="selected-language" onClick={() => setLangOpen(!isLangOpen)}>
								{i18n.language === 'ru' ? 'RU' : i18n.language === 'en' ? 'EN' : 'UZ'} <span className="arrow">▾</span>
							</button>
							{isLangOpen && (
								<div className={`dropdown-lang ${isLangOpen ? 'show' : ''}`}>
									<button onClick={() => changeLanguage('ru')} className="language-option">Русский</button>
									<button onClick={() => changeLanguage('en')} className="language-option">English</button>
									<button onClick={() => changeLanguage('uz')} className="language-option">Uzbek</button>
								</div>
							)}
						</div>

						{/* Поиск (только десктоп) */}
						<div className="desktop-only"> {/* Класс для стилизации */}
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
										<i className="fa-solid fa-magnifying-glass"></i> {/* Иконка внутри */}
									</div>
								</div>
							</form>
						</div>

						{/* Уведомления (только десктоп) */}
						<div className="navbar_profile-notification desktop-only"> {/* Класс для стилизации */}
							<Link to="/watchlist">
								<i className="fa-regular fa-bell"></i>
							</Link>
						</div>

						{/* Иконка профиля */}
						<div className="navbar_profile_logo" ref={buttonRef} onClick={toggleDropdown}>
							<img src={profile_logo} alt="profile_logo" />
						</div>

						{/* Выпадающее меню */}
						<div ref={dropdownRef} className="dropdown-menu hidden"> {/* Убедись, что классы применяются */}
							{loadingAuth ? (
								<div className="p-2">Загрузка...</div> // Можно добавить спиннер
							) : user ? (
								// Пользователь ЗАЛОГИНЕН
								<>
									{/* --- ИСПРАВЛЕНИЕ ЗДЕСЬ --- */}
									<div className="p-2 user-info"> {/* Добавь класс user-info */}
										<i className="fa-solid fa-user"></i>
										{/* Отображаем никнейм, если есть, иначе email */}
										<span>{user.username || user.email}</span>
									</div>
									{/* --- КОНЕЦ ИСПРАВЛЕНИЯ --- */}

									<div className="p-1"> {/* Убери p-1, если стили на item */}
										<button className="dropdown-item" onClick={() => { history.push('/my-account'); closeDropdown(); }}>My Account</button>
									</div>
									<div className="p-1"> {/* Убери p-1, если стили на item */}
										<button onClick={handleLogout} className="dropdown-item logout-btn">Выйти</button>
									</div>
								</>
							) : (
								// Пользователь НЕ ЗАЛОГИНЕН
								<>
									<div className="p-1"> {/* Убери p-1, если стили на item */}
										<button className="dropdown-item" onClick={() => { history.push('/login'); closeDropdown(); }}>Kirish</button>
									</div>
									<div className="p-1"> {/* Убери p-1, если стили на item */}
										<button className="dropdown-item" onClick={() => { history.push('/register'); closeDropdown(); }}>Ro'yhatdan o'tish</button>
									</div>
								</>
							)}
						</div>
					</div>
				</div>

				{/* Гамбургер для мобильной версии */}

			</div>
		</div>
	);
}

export default Navbar;
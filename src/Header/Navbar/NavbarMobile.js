import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../Lang/i18n";


function NavbarMobile(props) {
    const { t, i18n } = useTranslation();
    const [activeLink, setActiveLink] = useState("/");

    // Обработчик для изменения активного элемента
    const handleSetActive = (path) => {
        setActiveLink(path);
    };

    return (
        <div className='navbar_mobile'>
            <div className="navbar_mobile-links">
                <ul>
                    <li>
                        <Link
                            className={activeLink === "/" ? "navbar_active" : ""}
                            to="/"
                            onClick={() => handleSetActive("/")}
                        >
                            <i className="fa-solid fa-home"></i>{t('common.welcome')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={activeLink === "/discover" ? "navbar_active" : ""}
                            to="/discover"
                            onClick={() => handleSetActive("/discover")}
                        >
                            <i className="fa-solid fa-layer-group"></i>{t('common.selection')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={activeLink === "/movie-release" ? "navbar_active" : ""}
                            to="/movie-release"
                            onClick={() => handleSetActive("/movie-release")}
                        >
                            <i className="fa-solid fa-clock"></i>{t('common.movieRelease')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={activeLink === "/about" ? "navbar_active" : ""}
                            to="/about"
                            onClick={() => handleSetActive("/about")}
                        >
                            <i className="fa-solid fa-history"></i>{t('common.history')}
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default NavbarMobile;

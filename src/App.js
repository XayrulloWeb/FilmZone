// src/App.js
import React, { useEffect, useState } from 'react';
// --- ИСПОЛЬЗУЕМ Switch ИЗ СТАРОЙ ВЕРСИИ ---
import { Switch, Route, useLocation } from 'react-router-dom';
// -----------------------------------------
import Navbar from "./Header/Navbar/Navbar";
import routes from "./routes";
import '../src/assets/Style/style.css';
import Loader from "./Components/Loader/Loader";
// import axios from 'axios'; // Не используется напрямую здесь
import SearchResults from "./Components/search component/SearchResults";
import Footer from "./Footer/Footer";
import NavbarMobile from "./Header/Navbar/NavbarMobile";
// import NotFoundPage from './Pages/NotFoundPage'; // Импортируй страницу 404, если она есть

function App() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    // useParams можно использовать только внутри рендер-функции Route или компонента, который рендерится Route

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); // Уменьшил время лоадера
        return () => clearTimeout(timer);
    }, [location]);

    // Определяем, нужно ли показывать Navbar и Footer
    const showHeaderFooter = !['/login', '/register'].includes(location.pathname);

    return (
        <div className="App">
            {loading ? (
                <Loader />
            ) : (
                <div className="wrapper">
                    {/* Показываем мобильный навбар */}
                    <NavbarMobile/>

                    {/* Показываем основной Navbar */}
                    {showHeaderFooter && <Navbar />}

                    <div className="routes">
                        {/* --- ИСПОЛЬЗУЕМ Switch И component --- */}
                        <Switch>
                            {routes.map(item => (
                                <Route
                                    key={item.id}
                                    path={item.path}
                                    component={item.component} // Используем component
                                    exact // Добавляем exact для большинства маршрутов
                                />
                            ))}
                            {/* Убери exact для MovieDetails, если путь /movie/:id */}
                             {/* <Route path="/movie/:id" component={MovieDetails} /> */}
                            <Route path="/search-results" component={SearchResults} />

                            {/* Роут для 404 страницы должен быть последним и без path */}
                            <Route component={require('./Pages/NotFoundPage').default} />
                        </Switch>
                        {/* ---------------------------------- */}
                    </div>
                    {/* Показываем Footer */}
                    {showHeaderFooter && <Footer/>}
                </div>
            )}
        </div>
    );
}

export default App;
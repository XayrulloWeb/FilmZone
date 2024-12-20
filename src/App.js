import React, { useEffect, useState } from 'react';
import Navbar from "./Header/Navbar/Navbar";
import { Switch, Route, useLocation, useParams } from 'react-router-dom';
import routes from "./routes";
import '../src/assets/Style/style.css';
import Loader from "./Components/Loader/Loader";
import axios from 'axios';
import SearchResults from "./Components/search component/SearchResults";
import Footer from "./Footer/Footer";
import NavbarMobile from "./Header/Navbar/NavbarMobile";

function App() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Включаем loader перед началом запроса
            try {
                if (id) {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=bc25b198a01dce97d9fbeb1bada0f375`);
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setTimeout(() => { // Задержка для тестирования loader
                    setLoading(false);
                }, 2000); // Устанавливаем таймаут 2 секунды
            }
        };

        fetchData();
    }, [location, id]);

    return (
        <div className="App">
            {loading ? (
                <Loader /> // Show loader while loading
            ) : (
                <div className="wrapper">
                    <NavbarMobile/>

                    {location.pathname !== '/login' && <Navbar />}
                    <div className="routes">
                        <Switch>
                            {routes.map(item => (
                                <Route
                                    key={item.id}
                                    path={item.path}
                                    component={item.component}
                                    exact
                                />
                            ))}
                            <Route path="/search-results" component={SearchResults} />
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            )}
        </div>
    );
}

export default App;

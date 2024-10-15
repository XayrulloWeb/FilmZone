import React, { useEffect, useState } from 'react';
import Navbar from "./Header/Navbar/Navbar";
import { Switch, Route, useLocation, useParams } from 'react-router-dom';
import routes from "./routes";
import '../src/assets/Style/style.css';
import Loader from "./Components/Loader/Loader";
import axios from 'axios';
import SearchResults from "./Components/search component/SearchResults"; // Импорт компонента SearchResults

function App() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const location = useLocation();
    const { id } = useParams(); // Получаем id из URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=bc25b198a01dce97d9fbeb1bada0f375`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) { // Только вызываем fetchData, если id определен
            fetchData();
        }
    }, [location, id]); // Добавляем id в зависимости



    return (
        <div className="App">
            <div className="wrapper">
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
            </div>
        </div>
    );
}

export default App;

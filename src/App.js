import React, { useEffect, useState } from 'react';
import Navbar from "./Header/Navbar/Navbar";
import { Switch, Route,useLocation  } from 'react-router-dom'; // Using Switch for React Router v5
import routes from "./routes";

import '../src/assets/Style/style.css';
import Loader from "./Components/Loader/Loader"; // Assuming you have a Loader component

function App() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <Loader />;  // Show loader while the app is loading
    }

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
                                component={item.component}  // Use 'component' in React Router v5
                                exact  // Add 'exact' to avoid partial matches
                            />
                        ))}
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default App;

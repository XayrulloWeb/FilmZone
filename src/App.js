import React, { useEffect, useState } from 'react';
import Navbar from "./Header/Navbar/Navbar";
import { Switch, Route } from 'react-router-dom'; // Using Switch for React Router v5
import Footer from "./Header/Footer/Footer";
import routes from "./routes";
import '../src/assets/Style/style.css';
import Loader from "./Components/Loader/Loader"; // Assuming you have a Loader component

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if (loading) {
        return <Loader />;  // Show loader while the app is loading
    }

    return (
        <div className="App">
            <div className="wrapper">
                <Navbar />
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
                <Footer />
            </div>
        </div>
    );
}

export default App;

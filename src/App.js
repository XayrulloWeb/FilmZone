import React from 'react';
import Navbar from "./Header/Navbar/Navbar";
import {Switch, Route, Redirect} from 'react-router-dom';
import Footer from "./Header/Footer/Footer";
import routes from "./routes";
import '../src/assets/Style/style.css';
import Banner from "./Header/Navbar/Banner";

function App() {
  return (
    <div className="App">
        <div className="wrapper">
            <div className="navbar_back">
                <Navbar/>
                <Banner/>
            </div>
            <div className="routes">
                <Switch>
                    {
                        routes.map(item => {
                            return <Route
                                key={item.id}
                                path={item.path}
                                component={item.component}
                                exact
                            />
                        })
                    }
                </Switch>
            </div>

            <Footer/>
        </div>
    </div>
  );
}

export default App;

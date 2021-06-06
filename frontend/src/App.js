import React, { useState } from "react";
import axios from "axios";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import MyPage from "./components/MyPage";
import NavBar from "./components/NavBar";
import AuthRoute from "./AuthRoute";
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";

function App() {
    const [user, setUser] = useState(null);
    const authenticated = (user != null);

    const login = ({ ID, password }) => axios.get(`/api/login`, {
        accountID: ID,
        accountPW: password
    }).then(response => { setUser(response.data) });
    const logout = () => setUser(null);
    const siginin = ({ ID, password }) => axios.post(`/api/login`, {
        accountID: ID,
        accountPW: password
    }).then(response => { setUser(response.data) });

    return (
        <BrowserRouter>
            <NavBar />
            {authenticated ? (
                <LogoutButton logout={logout} />
            ) : (
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
            )}
            <Switch>
                <Route exact path="/">
                    <h1>Main</h1>
                </Route>
                <AuthRoute authenticated={authenticated} exact path="/MyPage" render={props => <MyPage user={user} {...props} />} />
                <Route exact path="/login" render={props => (
                    <LoginPage authenticated={authenticated} login={login} signin={siginin} {...props} />
                )}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
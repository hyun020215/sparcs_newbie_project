import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import MyPage from "./components/MyPage";
import NavBar from "./components/NavBar";
import AuthRoute from "./AuthRoute";
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";
import EditProfilePage from "./components/EditProfilePage";

function App() {
    const [user, setUser] = useState(() => JSON.parse(window.localStorage.getItem("user")) || null);
    const authenticated = (user != null);

    useEffect(() => {
        window.localStorage.setItem("user", JSON.stringify(user));
    }, [user])

    const login = ({ ID, password }) => axios.get(`/api/login/${ID}/${password}`)
        .then(response => {
            setUser(response.data);
        })
        .catch(function (error) {
            alert("Failed to login. Check ID and Password again.");
        });
    const logout = () => setUser(null);
    const siginin = ({ ID, password }) => axios.post(`/api/login`, {
        accountID: ID,
        accountPW: password
    }).then(response => { setUser(response.data) })
        .catch(function (error) {
            alert("Failed to signin. The ID already exists.");
        });
    const withdraw = (ID) => axios.delete(`/api/login/${ID}`).then(response => { logout() });
    const editProfile = (ID, newID, newPW, newNick) => axios.put(`/api/login`, {
        accountID: ID,
        newAccountID: newID,
        newAccountPassword: newPW,
        newAccountNickname: newNick
    }).then(response => {
        setUser(response.data);
        console.log(user);
    })
        .catch(function (error) {
            alert("Failed to change Profile. The ID already exists.");
        });

    return (
        <BrowserRouter>
            <NavBar />
            {authenticated ? (
                <LogoutButton logout={logout} />
            ) : (
                    <Link to="/login">
                        <button>Log in</button>
                    </Link>
                )}
            <Link to="/editProfile">
                <button>Edit Profile</button>
            </Link>
            <Switch>
                <Route exact path="/">
                    <h1>Main</h1>
                </Route>
                <AuthRoute authenticated={authenticated} exact path="/MyPage" render={props => <MyPage user={user} withdraw={withdraw} {...props} />} />
                <AuthRoute authenticated={authenticated} exact path="/editProfile" render={props => <EditProfilePage editProfile={editProfile} user={user} {...props} />} />
                <Route exact path="/login" render={props => (
                    <LoginPage authenticated={authenticated} login={login} signin={siginin} {...props} />
                )}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

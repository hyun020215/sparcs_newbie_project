import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const LoginPage = ({ authenticated, login, signin, location }) => {
    const [ID, setID] = useState("");
    const [password, setPassword] = useState("");

    const loginClick = () => {
        try {
            login({ ID, password });
        } catch (e) {
            alert("Failed to login. Check ID and Password again.");
            setID("");
            setPassword("");
        }
    };

    const signinClick = () => {
        try {
            signin({ ID, password });
        } catch (e) {
            alert("Failed to signin. The ID already exists.");
            setID("");
            setPassword("");
        }
    };

    const { from } = location.state || { from: { pathname: "/" } };
    if (authenticated) return (<Redirect to={from} />);

    return (
        <div className="LoginPage">
            <h1>Login</h1>
            <input
                value={ID}
                onChange={({ target: { value } }) => setID(value)}
                type="text"
                placeholder="ID"
            />
            <br/>
            <input
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                placeholder="password"
            />
            <br/>
            <button onClick={loginClick}>Login</button>
            <button onClick={signinClick}>Sign in</button>
        </div>
    );
}

export default LoginPage;

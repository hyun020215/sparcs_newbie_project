import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const LoginPage = ({ authenticated, login, signin, location }) => {
    const [ID, setID] = useState("");
    const [password, setPassword] = useState("");

    const loginClick = () => {
        login({ ID, password });
    };

    const signinClick = () => {
        signin({ ID, password });
    };

    const { from } = location.state || { from: { pathname: "/" } };
    if (authenticated) return (<Redirect to={from} />);

    return (
        <div className="LoginPage">
            <h1>Login</h1>
            <h3>ID: </h3>
            <input
                value={ID}
                onChange={({ target: { value } }) => setID(value)}
                type="text"
                placeholder="ID"
            />
            <br />
            <h3>password: </h3>
            <input
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                placeholder="password"
            />
            <br/>
            <button onClick={loginClick}>Log in</button>
            <button onClick={signinClick}>Sign in</button>
        </div>
    );
}

export default LoginPage;

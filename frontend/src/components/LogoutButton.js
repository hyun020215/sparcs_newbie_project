import React from "react";
import { withRouter } from "react-router-dom";

function LogoutButton({ logout, history }) {
    const handleClick = () => {
        const answer = window.confirm("Are you sure to log out?");
        if (answer) {
            logout();
            history.push("/");
        }
    };
    return <button onClick={handleClick}>Logout</button>;
}

export default withRouter(LogoutButton);
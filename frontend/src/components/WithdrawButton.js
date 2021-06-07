import React from "react";
import { withRouter } from "react-router-dom";

function WithdrawButton({ withdraw, accountID, history }) {
    const handleClick = () => {
        const answer = window.confirm("Are you sure to withdraw and delete your account?");
        if (answer) {
            withdraw(accountID);
            history.push("/");
        }
    };
    return <button onClick={handleClick}>Withdraw</button>;
}

export default withRouter(WithdrawButton);
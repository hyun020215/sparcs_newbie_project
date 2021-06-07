import React, { useState } from "react";

const EditProfilePage = ({ editProfile, user }) => {
    const { accountID, accountPassword, accountNickname, posts } = user || {};

    const [ID, setID] = useState(accountID);
    const [password, setPassword] = useState(accountPassword);
    const [nickname, setNickname] = useState(accountNickname);

    const editClick = () => {
        editProfile({ accountID, ID, password, nickname });
    };

    return (
        <div className="EditProfilePage">
            <h1>Profile</h1>
            <h3>ID: </h3>
            <h3>{ID}</h3>
            <input
                value={ID}
                onChange={({ target: { value } }) => setID(value)}
                type="text"
                placeholder="ID"
            />
            <br />
            <h3>password: </h3>
            <h3>{password}</h3>
            <input
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                placeholder="password"
            />
            <br />
            <h3>nickname: </h3>
            <h3>{nickname}</h3>
            <input
                value={nickname}
                onChange={({ target: { value } }) => setNickname(value)}
                type="text"
                placeholder="nickname"
            />
            <button onClick={editClick}>Edit Profile</button>
        </div>
    );
}

export default EditProfilePage;

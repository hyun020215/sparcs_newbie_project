import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem"
import WithdrawButton from "./WithdrawButton";
import "./MyPage.css";

const Page = ({ user, withdraw }) => {
    const { accountID, accountPassword, accountNickname, posts } = user || {};
    const [items, setItems] = useState(posts);

    useEffect(() => {
        // ��� ��ȸ ��û ����
        axios.get(`/api/myposts/${accountID}`)
            // ������ ���ƿ��� ���� �������� ����� ����
            .then(response => {
                setItems(response.data);
            });
    }, []);

    const onDeleteClick = (item) => {
        axios.delete(`/api/myposts/${accountID}/${item._id}/delete`)
            .then(() => axios.get(`/api/myposts/${accountID}`))
            .then(response => {
                setItems(response.data)
            });
    };

    const postItemEls = items.map(v => (
        <PostItem
            key={v._id}
            title={v.title}
            date={v.date}
            author={v.author}
            content={v.content}
            onDeleteClick={() => onDeleteClick(v)}
        />
    ));

    return (
        <div className="MyPage">
            <div className="Profile">
                <h3>{accountNickname}</h3>
                <WithdrawButton withdraw={withdraw} accountID={accountID} />
            </div>
            {postItemEls}
        </div>
    );
}

export default Page;

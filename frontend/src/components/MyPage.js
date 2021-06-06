import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem"
import "./MyPage.css";

const Page = ({ user }) => {
    const { ID, pw, nickname, posts } = user || {};
    const [items, setItems] = useState([]);

    useEffect(() => {
        // ��� ��ȸ ��û ����
        axios.get(`/api/myposts/${ID}`)
            // ������ ���ƿ��� ���� �������� ����� ����
            .then(response => {
                setItems(response.data);
            });
    }, []);

    const onDeleteClick = (item) => {
        axios.delete(`/api/myposts/${ID}/${item._id}/delete`)
            .then(() => axios.get(`/api/myposts/${ID}`))
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
            {postItemEls}
        </div>
    );
}

export default Page;

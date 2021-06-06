import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem"
import "./MyPage.css";

const Page = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // 목록 조회 요청 전송
        axios.get(`/api/myposts/${account.ID}`)
            // 응답이 돌아오면 응답 내용으로 목록을 변경
            .then(response => {
                setItems(response.data);
            });
    }, []);

    const onEditClick = (item) => {
        axios.edit(`/api/myposts/${account.ID}/${item._id}/edit`)
            .then(() => axios.get(`/api/myposts/${account.ID}`))
            .then(response => {
                setItems(response.data)
            });
    };

    const onDeleteClick = (item) => {
        axios.delete(`/api/myposts/${account.ID}/${item._id}/delete`)
            .then(() => axios.get(`/api/myposts/${account.ID}`))
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
            onEditClick={() => onEditClick(v)}
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

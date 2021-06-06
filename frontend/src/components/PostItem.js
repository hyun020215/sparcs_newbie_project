import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./PostItem.css";

const PostItem = (props) => {
    return (
        <div className="post-item">
            <span>{props.title}</span>
            <span>{props.date}</span>
            <span>{props.author}</span>
            <span>{props.content}</span>
            <div className="post-item-action" onClick={props.onDeleteClick}>
                <FaTrashAlt />
            </div>
        </div>
    );
};

export default PostItem;

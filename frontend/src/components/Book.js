import React from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import "./Book.css";

const Book = (props) => {
    return (
        <div className="Book">
            <span>{props.title}</span>
            <span>{props.author}</span>
            <span>{props.publisher}</span>
            <div className="Book-action" onClick={props.onSelectClick}>
                <FaRegCheckSquare />
            </div>
        </div>
    );
};

export default Book;

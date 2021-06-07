import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Book from "./Book";

const NewPostPage = ({ authenticated, user, location }) => {
    const [posted, setPosted] = useState(false);
    const { accountID, accountPassword, accountNickname, posts } = user || {};
    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const { from } = location.state || { from: { pathname: "/" } };
    useEffect(() => {
        if (!authenticated || posted) return (<Redirect to={from} />);
    }, [posted])

    const search = () => {
        try {
            axios.get(`/api/naver/${keyword}`).then(response => {
                if (response && response.status === 200) {
                    const { data } = response;
                    console.log(data);
                    setBooks(data.items);
                }
            });
        }
        catch (e) {
            console.log("error", e);
        }
    };

    const postup = () => {
        const time = new Date();
        const date = time.getFullYear().toString() + "/" + time.getMonth().toString() + "/" + time.getDate().toString();
        console.log(date);
        axios.post(`/api/myposts/${accountID}`, {
            title: title,
            date: date,
            author: author,
            content: content
        });
        setPosted(true);
    };

    const onSelectClick = (book) => {
        setKeyword(book.title.replace(/(<([^>]+)>)/gi, ""));
        setBooks([]);
        setTitle(book.title.replace(/(<([^>]+)>)/gi, ""));
        setAuthor(book.author.replace(/(<([^>]+)>)/gi, ""));
    };

    const BookList = (books == null) ? null : books.map(v => (
        <Book
            key={v._id}
            title={v.title.replace(/(<([^>]+)>)/gi, "")}
            author={v.author.replace(/(<([^>]+)>)/gi, "")}
            publisher={v.publisher.replace(/(<([^>]+)>)/gi, "")}
            onSelectClick={() => onSelectClick(v)}
        />
    ));

    return (
        <div className="NewPostPage">
            <h1>New Post</h1>
            <input
                value={keyword}
                onChange={({ target: { value } }) => setKeyword(value)}
                type="text"
                placeholder="Search the title of the book!"
            />
            <button onClick={search}>Search</button>
            {BookList}
            <textarea
                value={content}
                onChange={({ target: { value } }) => setContent(value)}
                type="text"
                placeholder="Write you own book report!"
                name="content"
                rows="10"
                cols="30"
                wrap="physical"
            />
            <button onClick={postup}>Post up</button>
        </div>
    );
}

export default NewPostPage;

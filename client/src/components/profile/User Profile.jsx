import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as bookService from "../../services/bookService";
import AuthContext from "../../contexts/authContext";

import BookItem from "../books-main/all-books/book-item/Book Item";

import styles from "./UserProfile.module.css";

export default function UserProfile() {
    const { id, username } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { bookService.getBooksForUser(id).then(res => setBooks(res)).catch(err => console.log(err)); }, [id]);
    useEffect(() => { if (!id) { navigate("/"); } }, [id, navigate]);

    return (
        <div className={styles.profile}>
            <h2>{username}'s profile</h2>

            <div className={styles.profileInfo}>
                <h3>Added books:</h3>
                {books.length === 0 && (<p className={styles.noBooks}>No books found...</p>)}
                <div className={styles.addedBooks}>
                    {books.map(book => (<BookItem key={book._id} {...book} />))}
                </div>
            </div>
        </div>
    );
}
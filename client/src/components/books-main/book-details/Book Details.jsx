import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import * as bookService from "../../../services/bookService";
import * as commentsService from "../../../services/commentsService";
import AuthContext from "../../../contexts/authContext";
import useForm from "../../../hooks/useForm";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./BookDetails.module.css";

export default function BookDetails() {
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);

    const { bookId } = useParams();
    const { id, isAuthenticated, username } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { bookService.getOneBook(bookId).then(setBook); commentsService.getComments(bookId).then(setComments).catch(error => error.message) }, [bookId]);

    const addCommentSubmitHandler = async (values) => {
        const result = await commentsService.addComment(bookId, values.comment, username);
        setComments(state => [...state, result]);

        resetField();
        return result;
    }

    const { values, inputErrors, onChange, onSubmit, resetField } = useForm(addCommentSubmitHandler, { comment: '' });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteBookSubmitHandler = async () => { await bookService.deleteBook(bookId); navigate("/all-books"); }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.bookContainer}>
                <div className={styles.book}>
                    <div className={styles.media}>
                        <img src={book.img} />
                    </div>
                    <h3>{book.name}</h3>
                    {id === book._ownerId && (
                        <div className={styles.buttons}>
                            <Link className={styles.editButton} to={`/all-books/${bookId}/edit-book`}>Edit</Link>
                            <button className={styles.deleteButton} onClick={handleShow}>Delete</button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you'd like to delete this book?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={deleteBookSubmitHandler} variant="primary">
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    )}
                </div>

                <div className={styles.bookInfo}>
                    <h4>Author's Note:</h4>
                    <div className={styles.note}>
                        <ul>
                            {book.note && book.note.map((notes, index) => (
                                <li key={index}>{notes}</li>
                            ))}
                        </ul>
                    </div>
                    <h4>Motivational Quote:</h4>
                    <div className={styles.quote}>
                        <ul>
                            {book.quote && book.quote.map((quotes, index) => (
                                <li key={index}>{quotes}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            <div className={styles.comments}>
                <h4>Comments:</h4>
                <div className={styles.comment}>
                    <ul>
                        {comments.map(({ _id, content, username, _ownerId }) => (
                            <li key={_id}>
                                <div className={styles.commentContainer}>
                                    <span className={styles.commenter}>
                                        {_ownerId === book._ownerId ? 'Author' : username}
                                    </span>
                                    <p className={styles.commentContent}>{content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {comments.length === 0 && (<p className={styles.noComments}>No comments yet. Perhaps you want to add one?</p>)}
                {isAuthenticated && (
                    <form className={styles.formSubmit} onSubmit={onSubmit}>
                        <h5>Add comment:</h5>
                        <textarea name="comment" id="comment" onChange={onChange} value={values.comment}></textarea>
                        {inputErrors && <p className="error">{inputErrors.comment}</p>}
                        <input type="submit" value="Add Comment" className={styles.buttonSubmit} />
                    </form>
                )}
            </div>
        </div>
    );
}
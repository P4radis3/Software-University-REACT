import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as bookService from "../../../services/bookService";
import { validateInputs } from "../../../utils/validateFieldsUtil";
import { validateStructure } from "../../../utils/validateStructure";

import styles from "./EditBook.module.css";

export default function EditBook() {
    const [book, setBook] = useState({ name: '', img: '', note: '', steps: '', });
    const [inputErrors, setInputErrors] = useState({});
    const [structureErrors, setStructureErrors] = useState({});
    const { bookId } = useParams();
    const navigate = useNavigate();

    useEffect(() => { bookService.getOneBook(bookId).then(result => { setBook({ name: result.name, img: result.img, note: result.note.join("\n"), quote: result.quote.join("\n") }); }) }, [bookId])

    const onChange = (e) => {
        setBook(state => ({ ...state, [e.target.name]: e.target.value }))
        setInputErrors(state => ({ ...state, [e.target.name]: null }))
    }

    const editBookSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));
        const errors = validateInputs(values);
        const typeErrors = validateStructure(values);

        if (Object.keys(errors).length === 0 && Object.keys(typeErrors).length === 0) {
            const data = { name: values.name, img: values.img, note: values.note.split("\n"), quote: values.quote.split("\n") };

            try {
                await bookService.editBook(bookId, data);
                navigate(`/all-books/${bookId}`);
            } catch (error) {
                console.error(error.message);
                throw error;
            }

        } else if (Object.keys(errors).length !== 0) {
            setInputErrors(errors);
        } else if (Object.keys(typeErrors).length !== 0) {
            setStructureErrors(typeErrors);
        }
    }

    return (
        <div className={styles.bookInfo}>
            <form onSubmit={editBookSubmitHandler}>
                <h2>Edit Book</h2>

                <label htmlFor="name">Book Name:</label>
                <input type="text" id="name" name="name" onChange={onChange} value={book.name} />
                {inputErrors && <p className="error">{inputErrors.name}</p>}

                <label htmlFor="img">Image URL:</label>
                <input type="text" id="img" name="img" onChange={onChange} value={book.img} />
                {inputErrors && <p className="error">{inputErrors.img}</p>}

                <label htmlFor="note">Notes:</label>
                <textarea name="note" id="note" onChange={onChange} value={book.note} placeholder="Enter Author's note(s) separated by a new line..."></textarea>
                {inputErrors && <p className="error">{inputErrors.note}</p>}
                {structureErrors && <p className="error">{structureErrors.note}</p>}

                <label htmlFor="quote">Quotes:</label>
                <textarea name="quote" id="quote" onChange={onChange} value={book.quote} placeholder="Enter quote(s) separated by a new line..."></textarea>
                {inputErrors && <p className="error">{inputErrors.quote}</p>}
                {structureErrors && <p className="error">{structureErrors.quote}</p>}

                <input type="submit" className={styles.buttonSubmit} value="Edit Book" />
            </form>
        </div>
    );
}
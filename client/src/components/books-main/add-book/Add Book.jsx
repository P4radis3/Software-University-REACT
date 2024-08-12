import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as bookService from "../../../services/bookService";
import { validateInputs } from "../../../utils/validateFieldsUtil";

import styles from "./AddBook.module.css";
import { validateStructure } from "../../../utils/validateStructure";

import AuthContext from "../../../contexts/authContext";

export default function AddBook() {
    const [book, setBook] = useState({
        name: '',
        img: '',
        note: '',
        quote: '',
    });
    const [inputErrors, setInputErrors] = useState({});
    const [structureErrors, setStructureErrors] = useState({});

    const { id } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/login");
        }
    }, []);

    const onChange = (e) => {
        setBook(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));

        setInputErrors(state => ({
            ...state,
            [e.target.name]: null
        }));
    }

    const createBookSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));
        const errors = validateInputs(values);
        const typeErrors = validateStructure(values);

        if (Object.keys(errors).length === 0 && Object.keys(typeErrors).length === 0) {
            const data = {
                name: values.name,
                img: values.img,
                note: values.note.split("\n"),
                quote: values.quote.split("\n"),
            }

            try {
                await bookService.createBook(data);
                navigate("/all-books");
            } catch (error) {
                console.error(error.message);
                throw error;
            }

        } else if (Object.keys(errors).length !== 0) {
            setInputErrors(errors);
        } else if (Object.keys(typeErrors).length !== 0) {
            setStructureErrors(typeErrors);
        }

    };

    return (
        <div className={styles.bookInfo}>
            <form onSubmit={createBookSubmitHandler}>
                <h2>Add Book</h2>

                <label htmlFor="name">Book Name:</label>
                <input type="text" id="name" name="name" onChange={onChange} value={book.name} />
                {inputErrors && <p className="error">{inputErrors.name}</p>}

                <label htmlFor="img">Image URL:</label>
                <input type="text" id="img" name="img" onChange={onChange} value={book.img} />
                {inputErrors && <p className="error">{inputErrors.img}</p>}
                {structureErrors && <p className="error">{structureErrors.img}</p>}

                <label htmlFor="note">Author's Note:</label>
                <textarea name="note" id="note" onChange={onChange} value={book.note} placeholder="Enter note separated by a new line..."></textarea>
                {inputErrors && <p className="error">{inputErrors.note}</p>}
                {structureErrors && <p className="error">{structureErrors.note}</p>}

                <label htmlFor="quote">Quote:</label>
                <textarea name="quote" id="quote" onChange={onChange} value={book.quote} placeholder="Enter quote separated by a new line..."></textarea>
                {inputErrors && <p className="error">{inputErrors.quote}</p>}
                {structureErrors && <p className="error">{structureErrors.quote}</p>}

                <input type="submit" className={styles.buttonSubmit} value="Add Book" />
            </form>
        </div>
    );

}
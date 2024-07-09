import { useEffect, useState } from "react";
import * as booksService from "../../../services/bookService";

import BookItem from "./book-item/Book Item";

import styles from "./AllBooks.module.css";

export default function AllBooks() {
  const [books, setOfBooks] = useState([]);
  useEffect(() => { booksService.getBooks().then(result => setOfBooks(result)) }, []);

  return (
    <>
      <div className={styles.booksList}>
        <h2>Books List</h2>

        <div className={styles.allBooks}>
          {books.length === 0 && (<p className={styles.noBooks}>No books found...</p>)}
          {books.map(book => (<BookItem key={book._id} {...book} />))}
        </div>
      </div>
    </>
  );
}
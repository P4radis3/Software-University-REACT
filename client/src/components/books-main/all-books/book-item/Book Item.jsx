import { Link } from "react-router-dom";

import styles from "./BookItem.module.css";

export default function BookItem({ name, img, _id, }) {
    return (
        <div className={styles.bookContainer}>
            <div className={styles.book}>
                <div className={styles.images}><img src={img} /></div>
                <h3>{name}</h3>
                <div className={styles.buttonContainer}>
                    <Link to={`/all-books/${_id}`} className={styles.detailsButton}>Details</Link>
                </div>
            </div>
        </div>
    );
};
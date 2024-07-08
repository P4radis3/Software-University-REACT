import { Link } from "react-router-dom";

import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles.homePage}>
            <div className={styles.container}>
                <div className={styles.welcomeMessage}>
                    <h2>Welcome to 'The World of Knowledge'!</h2>
                    <h3>#1 Book record website that contains information about your favorite book! </h3>
                    <h2>Today's Motto: Dig, find, read!</h2>
                    <div className={styles.buttonContainer}>
                        <Link to="/all-books" className={styles.booksButton}>View the books in our record!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
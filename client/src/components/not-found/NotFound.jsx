import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.css';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => { navigate('/404'); }, [navigate]);

    return (
        <div className={styles.notFound}>
            <h1>Oops!</h1>
            <h2>The page you're trying to reach is not in our database. &#x1F641;</h2>
            <button onClick={() => navigate('/')} className={styles.button}>Go back to the home-page and navigate from there.</button>
        </div>
    );
}

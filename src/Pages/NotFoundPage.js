import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <h1 style={{fontSize: '4rem', marginBottom: '20px'}}>404</h1>
            <h2 style={{marginBottom: '20px'}}>Страница не найдена</h2>
            <p style={{marginBottom: '30px'}}>Извините, такой страницы не существует.</p>
            <Link to="/" style={{color: '#1976d2', textDecoration: 'underline'}}>На главную</Link>
        </div>
    );
}

export default NotFoundPage; 
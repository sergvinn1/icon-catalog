// icon-catalog-frontend/src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleAdminToggle = () => {
        if (isAuthenticated) {
            logout();
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <header className="header">
            <h1><Link to="/">Іконний Каталог</Link></h1>
            <nav className="nav-links">
                {/* Можна додати інші посилання тут, якщо потрібно */}
                <button onClick={handleAdminToggle} className="admin-login-toggle">
                    {isAuthenticated ? 'Вийти (Адмін)' : 'Вхід для Адміна'}
                </button>
            </nav>
        </header>
    );
}

export default Header;
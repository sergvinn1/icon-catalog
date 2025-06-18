// icon-catalog-frontend/src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import axios from 'axios'; // Закоментуйте або видаліть для ТЕСТУВАННЯ БЕЗ БЕКЕНДУ

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // --- ПОЧАТОК: ТИМЧАСОВИЙ КОД ДЛЯ ТЕСТУВАННЯ БЕЗ БЕКЕНДУ ---
        if (username === 'admin' && password === 'testpass') { // Використовуйте свої тестові логін/пароль
            // Імітуємо успішний вхід
            login('fake-admin-token', { username: 'admin', role: 'admin' });
            navigate('/admin');
        } else {
            setError('Невірний логін або пароль. Спробуйте: admin / testpass');
        }
        return; // Виходимо, щоб не виконувати реальний запит
        // --- КІНЕЦЬ: ТИМЧАСОВИЙ КОД ДЛЯ ТЕСТУВАННЯ БЕЗ БЕКЕНДУ ---

        /*
        // --- РЕАЛЬНИЙ КОД (РОЗКОМЕНТУВАТИ ПІСЛЯ ТЕСТУВАННЯ) ---
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            login(response.data.token, response.data.user);
            navigate('/admin');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Помилка входу. Спробуйте ще раз.');
        }
        */
    };

    return (
        <div className="form-container">
            <h2>Вхід для адміністратора</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Логін</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="form-error-message">{error}</p>}
                <div className="form-actions">
                    <button type="submit" className="form-submit-btn">Увійти</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
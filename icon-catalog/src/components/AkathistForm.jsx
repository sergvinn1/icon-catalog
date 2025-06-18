/* eslint-disable no-useless-escape */
// icon-catalog-frontend/src/components/AkathistForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Можна закоментувати, якщо useAuth не використовується для інших цілей

const API_URL_AKATHISTS = 'http://localhost:5000/api/akathists'; // Переконайтеся, що це правильний URL

function AkathistForm({ onClose, onSubmit, akathistToEdit }) {
    const [akathistData, setAkathistData] = useState({
        name: '',
        author: '',
        description: '',
        // Додайте інші поля, якщо вони є у вашій моделі Akathist
    });
    const [error, setError] = useState(null);
    // const { getToken } = useAuth(); // ЗАКОМЕНТУВАТИ АБО ВИДАЛИТИ

    useEffect(() => {
        if (akathistToEdit) {
            setAkathistData(akathistToEdit);
        }
    }, [akathistToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAkathistData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // const token = getToken(); // ЗАКОМЕНТУВАТИ АБО ВИДАЛИТИ

        try {
            if (akathistToEdit) {
                // Оновлення акафіста
                await axios.put(`${API_URL_AKATHISTS}/${akathistToEdit._id}`, akathistData, {
                    // headers: { Authorization: `Bearer ${token}` } // ЗАКОМЕНТУВАТИ АБО ВИДАЛИТИ
                });
            } else {
                // Створення нового акафіста
                await axios.post(API_URL_AKATHISTS, akathistData, {
                    // headers: { Authorization: `Bearer ${token}` } // ЗАКОМЕНТУВАТИ АБО ВИДАЛИТИ
                });
            }
            onSubmit();
        } catch (err) {
            console.error('Помилка збереження акафіста:', err);
            setError(err.response?.data?.message || 'Не вдалося зберегти акафіст. Перевірте всі поля.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{akathistToEdit ? 'Редагувати Акафіст' : 'Додати Новий Акафіст'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Назва:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={akathistData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Автор:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={akathistData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Опис:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={akathistData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    {/* Додайте інші поля, якщо вони є */}
                    {error && <p className="form-error-message">{error}</p>}
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Скасувати
                        </button>
                        <button type="submit" className="btn-primary">
                            {akathistToEdit ? 'Оновити' : 'Додати'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AkathistForm;
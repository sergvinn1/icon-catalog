// icon-catalog-frontend/src/components/IconForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Можна закоментувати, якщо getToken більше ніде не використовується у файлі

const API_URL_ICONS = 'http://localhost:5000/api/icons';

function IconForm({ onClose, onSubmit, iconToEdit }) {
    const [iconData, setIconData] = useState({
        name: '',
        number: '',
        cabinet: '',
        notes: '',
        imageUrl: ''
    });
    const [error, setError] = useState(null);
    // const { getToken } = useAuth(); // Закоментувати

    useEffect(() => {
        if (iconToEdit) {
            setIconData(iconToEdit);
        }
    }, [iconToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIconData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // const token = getToken(); // Закоментувати

        try {
            if (iconToEdit) {
                // Оновлення ікони
                await axios.put(`${API_URL_ICONS}/${iconToEdit._id}`, iconData, {
                    // headers: { Authorization: `Bearer ${token}` } // Закоментувати
                });
            } else {
                // Створення нової ікони
                await axios.post(API_URL_ICONS, iconData, {
                    // headers: { Authorization: `Bearer ${token}` } // Закоментувати
                });
            }
            onSubmit(); // Закриваємо модалку та оновлюємо список
        } catch (err) {
            console.error('Помилка збереження ікони:', err);
            setError(err.response?.data?.message || 'Не вдалося зберегти ікону. Перевірте всі поля.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="form-container">
                    <h2>{iconToEdit ? 'Редагувати Ікону' : 'Додати Нову Ікону'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Назва:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={iconData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">Номер:</label>
                            <input
                                type="text"
                                id="number"
                                name="number"
                                value={iconData.number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cabinet">Шафа / Місце зберігання:</label>
                            <input
                                type="text"
                                id="cabinet"
                                name="cabinet"
                                value={iconData.cabinet}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes">Примітки:</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={iconData.notes}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl">URL Зображення:</label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={iconData.imageUrl}
                                onChange={handleChange}
                                // optional - required
                            />
                        </div>
                        {error && <p className="form-error-message">{error}</p>}
                        <div className="form-actions">
                            <button type="button" className="form-cancel-btn" onClick={onClose}>Скасувати</button>
                            <button type="submit" className="form-submit-btn">
                                {iconToEdit ? 'Оновити' : 'Додати'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default IconForm;
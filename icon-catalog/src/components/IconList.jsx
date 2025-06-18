// icon-catalog-frontend/src/components/IconList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconCard from './IconCard';
import IconForm from './IconForm';
//import { useAuth } from '../context/AuthContext';

const API_URL_ICONS = 'http://localhost:5000/api/icons';

function IconList() {
    const [icons, setIcons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingIcon, setEditingIcon] = useState(null);
    // const { getToken } = useAuth(); // Закоментувати

    const fetchIcons = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL_ICONS); // Для GET-запитів токен зазвичай не потрібен
            setIcons(response.data);
        } catch (err) {
            console.error('Помилка завантаження ікон:', err);
            setError('Не вдалося завантажити ікони.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIcons();
    }, []);

    const handleAddIcon = () => {
        setEditingIcon(null); // Скидаємо редагування для нової ікони
        setShowModal(true);
    };

    const handleEditIcon = (icon) => {
        setEditingIcon(icon);
        setShowModal(true);
    };

    const handleDeleteIcon = async (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити цю ікону?')) {
            try {
                // const token = getToken(); // Закоментувати
                await axios.delete(`${API_URL_ICONS}/${id}`, {
                    // headers: { Authorization: `Bearer ${token}` } // Закоментувати
                });
                fetchIcons();
            } catch (err) {
                console.error('Помилка видалення ікони:', err);
                setError(err.response?.data?.message || 'Не вдалося видалити ікону.');
            }
        }
    };

    const handleFormSubmit = () => {
        setShowModal(false);
        setEditingIcon(null);
        fetchIcons(); // Оновлюємо список після додавання/редагування
    };

    if (loading) return <p className="loading-message">Завантаження ікон...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="icon-management">
            <div className="admin-actions-bar"> {/* Перенесено сюди для стилізації */}
                <button className="action-btn" onClick={handleAddIcon}>
                    <i className="fas fa-plus"></i> Додати Ікону
                </button>
            </div>

            <div className="list-grid">
                {icons.length > 0 ? (
                    icons.map(icon => (
                        <IconCard
                            key={icon._id}
                            icon={icon}
                            isAdmin={true}
                            onEdit={handleEditIcon}
                            onDelete={handleDeleteIcon}
                        />
                    ))
                ) : (
                    <p className="no-results">Немає ікон у каталозі.</p>
                )}
            </div>

            {showModal && (
                <IconForm
                    onClose={() => setShowModal(false)}
                    onSubmit={handleFormSubmit}
                    iconToEdit={editingIcon}
                />
            )}
        </div>
    );
}

export default IconList;
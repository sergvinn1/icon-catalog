// icon-catalog-frontend/src/components/AkathistList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AkathistCard from './AkathistCard';
import AkathistForm from './AkathistForm';
// import { useAuth } from '../context/AuthContext'; // Закоментуйте або видаліть, якщо не використовується для інших цілей

const API_URL_AKATHISTS = 'http://localhost:5000/api/akathists';

function AkathistList() {
    const [akathists, setAkathists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingAkathist, setEditingAkathist] = useState(null);
    // const { getToken } = useAuth(); // ЗАКОМЕНТУВАТИ АБО ВИДАЛИТИ ЦЕЙ РЯДОК

    const fetchAkathists = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL_AKATHISTS);
            setAkathists(response.data);
        } catch (err) {
            console.error('Помилка завантаження акафістів:', err);
            setError('Не вдалося завантажити акафісти.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAkathists();
    }, []);

    const handleAddAkathist = () => {
        setEditingAkathist(null);
        setShowModal(true);
    };

    const handleEditAkathist = (akathist) => {
        setEditingAkathist(akathist);
        setShowModal(true);
    };

    const handleDeleteAkathist = async (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити цей акафіст?')) {
            try {
                // const token = getToken(); // ЗАКОМЕНТУВАТИ АБО ВИДАЛИТИ ЦЕЙ РЯДОК
                await axios.delete(`${API_URL_AKATHISTS}/${id}`, {
                    // headers: { Authorization: `Bearer ${token}` } // ЗАКОМЕНТУВАТИ АБО ВИДАЛИТИ ЦЕЙ ОБ'ЄКТ
                });
                fetchAkathists();
            } catch (err) {
                console.error('Помилка видалення акафіста:', err);
                setError(err.response?.data?.message || 'Не вдалося видалити акафіст.');
            }
        }
    };

    const handleFormSubmit = () => {
        setShowModal(false);
        setEditingAkathist(null);
        fetchAkathists();
    };

    if (loading) return <p className="loading-message">Завантаження акафістів...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="akathist-management">
            <div className="admin-actions-bar">
                <button className="action-btn" onClick={handleAddAkathist}>
                    <i className="fas fa-plus"></i> Додати Акафіст
                </button>
            </div>

            <div className="list-grid">
                {akathists.length > 0 ? (
                    akathists.map(akathist => (
                        <AkathistCard
                            key={akathist._id}
                            akathist={akathist}
                            isAdmin={true}
                            onEdit={handleEditAkathist}
                            onDelete={handleDeleteAkathist}
                        />
                    ))
                ) : (
                    <p className="no-results">Немає акафістів у каталозі.</p>
                )}
            </div>

            {showModal && (
                <AkathistForm
                    onClose={() => setShowModal(false)}
                    onSubmit={handleFormSubmit}
                    akathistToEdit={editingAkathist}
                />
            )}
        </div>
    );
}

export default AkathistList;
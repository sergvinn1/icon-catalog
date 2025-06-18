// icon-catalog-frontend/src/components/AkathistCard.jsx (Без змін)
import React from 'react';

function AkathistCard({ akathist, isAdmin, onEdit, onDelete }) {
    return (
        <div className="akathist-card">
            <h3>{akathist.name}</h3>
            <p><strong>Автор:</strong> {akathist.author}</p>
            {akathist.description && <p><strong>Опис:</strong> {akathist.description}</p>}
            {isAdmin && (
                <div className="card-actions">
                    <button className="edit-btn" onClick={() => onEdit(akathist)}>Редагувати</button>
                    <button className="delete-btn" onClick={() => onDelete(akathist._id)}>Видалити</button>
                </div>
            )}
        </div>
    );
}

export default AkathistCard;
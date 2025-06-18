// icon-catalog-frontend/src/components/IconCard.jsx (Без змін)
import React from 'react';

function IconCard({ icon, isAdmin, onEdit, onDelete }) {
    return (
        <div className="icon-card">
            {/* Закоментовано: Тимчасово прибрано відображення зображення */}
            {/* {icon.imageUrl && (
                <div className="icon-image-container">
                    <img src={icon.imageUrl} alt={icon.name} onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150?text=No+Image"; }} />
                </div>
            )} */}
            <h3>{icon.name}</h3>
            <p><strong>Номер:</strong> {icon.number}</p>
            <p><strong>Шафа / Місце зберігання:</strong> {icon.cabinet}</p>
            {icon.notes && <p><strong>Примітки:</strong> {icon.notes}</p>}
            {isAdmin && (
                <div className="card-actions">
                    <button className="edit-btn" onClick={() => onEdit(icon)}>Редагувати</button>
                    <button className="delete-btn" onClick={() => onDelete(icon._id)}>Видалити</button>
                </div>
            )}
        </div>
    );
}

export default IconCard;
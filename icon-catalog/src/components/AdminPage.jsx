// icon-catalog-frontend/src/components/AdminPage.jsx
import React, { useState } from 'react';
import IconList from './IconList';
import AkathistList from './AkathistList';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AdminPage() {
    const [activeTab, setActiveTab] = useState('icons'); // 'icons' або 'akathists'
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container"> {/* Контейнер для центрування */}
            <div className="admin-actions-bar">
                <div className="tab-switcher">
                    <button
                        className={`tab-btn ${activeTab === 'icons' ? 'active' : ''}`}
                        onClick={() => setActiveTab('icons')}
                    >
                        Керування Іконами
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'akathists' ? 'active' : ''}`}
                        onClick={() => setActiveTab('akathists')}
                    >
                        Керування Акафістами
                    </button>
                </div>
            </div>

            {activeTab === 'icons' && <IconList />}
            {activeTab === 'akathists' && <AkathistList />}
        </div>
    );
}

export default AdminPage;
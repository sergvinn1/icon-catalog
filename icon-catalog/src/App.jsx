// icon-catalog-frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext'; // Імпортуємо AuthProvider та useAuth
import './index.css'; // Імпорт глобальних стилів

// Приватний маршрут для адмін-сторінки
const PrivateRoute = ({ children, roles }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        // Якщо не авторизований, перенаправляємо на сторінку входу
        return <Navigate to="/login" />;
    }

    // Якщо ролі вказані, перевіряємо, чи має користувач потрібну роль
    if (roles && !roles.includes(user?.role)) {
        // Якщо користувач не має потрібної ролі, перенаправляємо на домашню сторінку або сторінку 403
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <Router>
            {/* Обертаємо весь додаток AuthProvider'ом */}
            <AuthProvider>
                <div className="app-container">
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute roles={['admin']}>
                                        <AdminPage />
                                    </PrivateRoute>
                                }
                            />
                            {/* Додайте інші маршрути, якщо потрібно */}
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
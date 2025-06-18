/* eslint-disable react-refresh/only-export-components */
// icon-catalog-frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Створення контексту авторизації
const AuthContext = createContext(null);

// Компонент-провайдер контексту авторизації
export const AuthProvider = ({ children }) => {
    // Стан для зберігання токена та інформації про користувача
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Перевіряємо наявність токена

    // Функція для входу
    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('token', newToken); // Зберігаємо токен у localStorage
        localStorage.setItem('user', JSON.stringify(newUser)); // Зберігаємо користувача у localStorage
    };

    // Функція для виходу
    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token'); // Видаляємо токен
        localStorage.removeItem('user'); // Видаляємо інформацію про користувача
    };

    // Ефект для оновлення заголовка авторизації Axios при зміні токена
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Значення контексту, яке буде надано дочірнім компонентам
    const contextValue = {
        token,
        user,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для зручного використання контексту авторизації
export const useAuth = () => {
    return useContext(AuthContext);
};
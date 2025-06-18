require('dotenv').config(); // Завантажуємо змінні середовища з .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Виправлено: const cors = require('cors');
const iconRoutes = require('./routes/iconRoutes');
const akathistRoutes = require('./routes/akathistRoutes'); // Додано: імпорт маршруту для акафістів
const searchRoutes = require('./routes/searchRoutes'); // Додано: імпорт маршруту для пошуку

const app = express();
const PORT = process.env.PORT || 5000; // Порт для Backend, за замовчуванням 5000

// Middleware
app.use(cors()); // Дозволяємо крос-доменні запити з Frontend
app.use(express.json()); // Дозволяємо Express парсити JSON-тіло запитів

// Підключення до MongoDB
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('Підключено до MongoDB'))
    .catch(err => console.error('Помилка підключення до MongoDB:', err));

// Простий тестовий маршрут
app.get('/', (req, res) => {
    res.send('Ласкаво просимо до Backend Іконного Каталогу!');
});

// Маршрути для ікон
app.use('/api/icons', iconRoutes); // Всі маршрути з iconRoutes будуть починатися з /api/icons
app.use('/api/akathists', akathistRoutes); // Додано: маршрути для акафістів
app.use('/api/search', searchRoutes); // Додано: маршрути для пошуку    

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
// icon-catalog-backend/routes/akathistRoutes.js

const express = require('express');
const router = express.Router();
const akathistController = require('../controllers/akathistController');

// Додайте цей middleware для логування всіх запитів, що надходять до цього роутера
router.use((req, res, next) => {
    console.log(`[AkathistRoutes] Received ${req.method} request for ${req.originalUrl}`);
    next(); // Продовжуємо обробку запиту
});

//GET /api/akathists - Отримати всі акафісти
router.get('/', akathistController.getAllAkathists);

// GET /api/akathists/:id - Отримати акафіст за ID
router.get('/:id', akathistController.getAkathistById);

// POST /api/akathists - Створити новий акафіст
router.post('/', akathistController.createAkathist);

// PUT /api/akathists/:id - Оновити акафіст за ID
router.put('/:id', akathistController.updateAkathist);

// DELETE /api/akathists/:id - Видалити акафіст за ID
router.delete('/:id', akathistController.deleteAkathist);

module.exports = router;
const express = require('express');
const router = express.Router();
const Icon = require('../models/Icon'); // Імпортуємо модель Ікони

// GET /api/icons - Отримати всі ікони
router.get('/', async (req, res) => {
    try {
        const icons = await Icon.find().sort({ createdAt: -1 }); // Сортуємо за датою створення (новіші першими)
        res.status(200).json(icons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/icons - Додати нову ікону
router.post('/', async (req, res) => {
    const { name, number, cabinet, notes, imageUrl } = req.body;

    // Валідація наявності обов'язкових полів
    if (!name || !number || !cabinet) {
        return res.status(400).json({ message: 'Будь ласка, заповніть усі обов\'язкові поля: Назва, Номер, Шафа.' });
    }

    const newIcon = new Icon({
        name,
        number,
        cabinet,
        notes,
        imageUrl
    });

    try {
        const savedIcon = await newIcon.save();
        res.status(201).json(savedIcon); // 201 Created
    } catch (err) {
        // Перевіряємо, чи це помилка унікальності номера
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Ікона з таким номером вже існує.' });
        }
        res.status(400).json({ message: err.message }); // 400 Bad Request
    }
});

// PUT /api/icons/:id - Оновити ікону за ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Отримуємо ID з URL
        const { name, number, cabinet, notes, imageUrl } = req.body;

        // Валідація наявності обов'язкових полів при оновленні
        if (!name || !number || !cabinet) {
            return res.status(400).json({ message: 'Будь ласка, заповніть усі обов\'язкові поля: Назва, Номер, Шафа.' });
        }

        const updatedIcon = await Icon.findByIdAndUpdate(
            id,
            { name, number, cabinet, notes, imageUrl },
            { new: true, runValidators: true } // new: true повертає оновлений документ; runValidators: true запускає валідатори схеми
        );

        if (!updatedIcon) {
            return res.status(404).json({ message: 'Ікону не знайдено.' });
        }

        res.status(200).json(updatedIcon);
    } catch (err) {
        if (err.code === 11000) { // Перевіряємо, чи це помилка унікальності номера
            return res.status(400).json({ message: 'Ікона з таким номером вже існує.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/icons/:id - Видалити ікону за ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Отримуємо ID з URL
        const deletedIcon = await Icon.findByIdAndDelete(id);

        if (!deletedIcon) {
            return res.status(404).json({ message: 'Ікону не знайдено.' });
        }

        res.status(200).json({ message: 'Ікону успішно видалено.', deletedIcon });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
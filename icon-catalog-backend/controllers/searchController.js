// icon-catalog-backend/controllers/searchController.js
const Icon = require('../models/Icon');
const Akathist = require('../models/Akathist');

exports.searchAll = async (req, res) => {
    try {
        const { query } = req.query; // Отримуємо пошуковий запит з параметрів URL
        if (!query) {
            return res.status(400).json({ message: 'Будь ласка, введіть пошуковий запит.' });
        }

        const searchQuery = { $regex: query, $options: 'i' }; // Регулярний вираз для пошуку без урахування регістру

        // Пошук в колекції Ікон
        const icons = await Icon.find({
            $or: [
                { name: searchQuery },
                { number: searchQuery },
                { cabinet: searchQuery },
                { notes: searchQuery }
            ]
        });

        // Пошук в колекції Акафістів
        const akathists = await Akathist.find({
            $or: [
                { name: searchQuery },
                { description: searchQuery },
                { notes: searchQuery }
            ]
        });

        res.json({ icons, akathists }); // Повертаємо результати обох пошуків
    } catch (err) {
        console.error('Помилка під час універсального пошуку:', err);
        res.status(500).json({ message: 'Помилка сервера під час пошуку.' });
    }
};
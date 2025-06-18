// icon-catalog-backend/controllers/akathistController.js

const Akathist = require('../models/Akathist'); // Переконайтеся, що модель Akathist існує та коректно визначена

// Отримання всіх акафістів
exports.getAllAkathists = async (req, res) => {
    console.log('[AkathistController] Attempting to get all akathists...');
    try {
        const akathists = await Akathist.find();
        console.log(`[AkathistController] Found ${akathists.length} akathists.`);
        res.json(akathists);
    } catch (err) {
        console.error('[AkathistController] Error getting all akathists:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Отримання акафісту за ID
exports.getAkathistById = async (req, res) => {
    console.log(`[AkathistController] Attempting to get akathist by ID: ${req.params.id}`);
    try {
        const akathist = await Akathist.findById(req.params.id);
        if (!akathist) {
            console.log(`[AkathistController] Akathist with ID ${req.params.id} not found.`);
            return res.status(404).json({ message: 'Акафіст не знайдено' });
        }
        console.log(`[AkathistController] Found akathist: ${akathist.name}`);
        res.json(akathist);
    } catch (err) {
        console.error(`[AkathistController] Error getting akathist by ID ${req.params.id}:`, err.message);
        res.status(500).json({ message: err.message });
    }
};

// Створення нового акафісту
exports.createAkathist = async (req, res) => {
    console.log('[AkathistController] Attempting to create new akathist with data:', req.body);
    const { name, description, pdfUrl, notes } = req.body;

    if (!name || !description) {
        console.log('[AkathistController] Missing required fields for new akathist.');
        return res.status(400).json({ message: 'Назва та опис є обов\'язковими полями' });
    }
    const akathist = new Akathist({
        name,
        description,
        pdfUrl,
        notes,
    });
    try {
        const newAkathist = await akathist.save();
        console.log('[AkathistController] Successfully created new akathist:', newAkathist._id);
        res.status(201).json(newAkathist);
    } catch (err) {
        console.error('[AkathistController] Error creating akathist:', err.message);
        // Перевіряємо, чи це помилка валідації Mongoose (наприклад, унікальність)
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(400).json({ message: err.message });
    }
};

// Оновлення акафісту
exports.updateAkathist = async (req, res) => {
    console.log(`[AkathistController] Attempting to update akathist with ID: ${req.params.id} with data:`, req.body);
    try {
        const akathist = await Akathist.findById(req.params.id);
        console.log(`[AkathistController] Result of findById for ${req.params.id}:`, akathist); // ЦЕЙ ЛОГ
        if (!akathist) {
            console.log(`[AkathistController] Akathist with ID ${req.params.id} not found for update.`);
            return res.status(404).json({ message: 'Акафіст не знайдено' });
        }

        // Оновлюємо тільки ті поля, які були надані в запиті
        akathist.name = req.body.name || akathist.name;
        akathist.description = req.body.description || akathist.description;
        akathist.pdfUrl = req.body.pdfUrl || akathist.pdfUrl;
        akathist.notes = req.body.notes || akathist.notes;

        const updatedAkathist = await akathist.save();
        console.log('[AkathistController] Successfully updated akathist:', updatedAkathist._id);
        res.json(updatedAkathist);
    } catch (err) {
        console.error('[AkathistController] Error updating akathist:', err.message);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(400).json({ message: err.message });
    }
};

// Видалення акафісту
exports.deleteAkathist = async (req, res) => {
    console.log(`[AkathistController] Attempting to delete akathist with ID: ${req.params.id}`);
    try {
        const akathist = await Akathist.findById(req.params.id);
        

        if (!akathist) {
            console.log(`[AkathistController] Akathist with ID ${req.params.id} not found for deletion.`);
            return res.status(404).json({ message: 'Акафіст не знайдено' });
        }

        

        await Akathist.deleteOne({ _id: req.params.id }); // Використовуємо deleteOne
        console.log('[AkathistController] Successfully deleted akathist:', req.params.id);
        res.json({ message: 'Акафіст успішно видалено' });
    } catch (err) {
        console.error('[AkathistController] Error deleting akathist:', err.message);
        res.status(500).json({ message: err.message });
    }
};
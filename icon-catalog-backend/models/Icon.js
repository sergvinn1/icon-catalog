const mongoose = require('mongoose');

const IconSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        unique: true, // Номер ікони має бути унікальним
        trim: true
    },
    cabinet: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        default: '', // Може бути порожнім
        trim: true
    },
    imageUrl: { // Додаємо поле для URL зображення
        type: String,
        default: '' // Може бути порожнім, або можна зробити обов'язковим
    },
    createdAt: {
        type: Date,
        default: Date.now // Автоматично додає дату створення
    }
});

module.exports = mongoose.model('Icon', IconSchema);
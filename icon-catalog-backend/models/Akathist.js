const mongoose = require('mongoose');

const akathistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    pdfUrl: {
        type: String,
        required: false, // Поле не обов'язкове
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Akathist', akathistSchema);
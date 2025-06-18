// icon-catalog-backend/routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET /api/search?query=... - Універсальний пошук
router.get('/', searchController.searchAll);

module.exports = router;
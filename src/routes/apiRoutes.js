// src/routes/apiRoutes.js
const express = require('express');
const { getCombinedData } = require('../controllers/dataController'); // Ensure this path is correct

const router = express.Router();

// Define the combined data route
router.get('/combined-data', getCombinedData);

module.exports = router;

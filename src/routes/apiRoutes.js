// src/routes/apiRoutes.js
const express = require('express');
const { getCombinedData } = require('../controllers/dataController'); // Adjust according to your file structure

const router = express.Router();

// Define the combined data route
router.get('/combined-data', getCombinedData);

module.exports = router;

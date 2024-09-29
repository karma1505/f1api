const express = require('express');
const { fetchData } = require('../controllers/dataController'); // Adjust according to your file structure

const router = express.Router();

// Define the combined data route
router.get('/combined-data', fetchData);

module.exports = router;

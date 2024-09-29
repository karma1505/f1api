// src/controllers/dataController.js
const { fetchData } = require('../services/apiService');

// Controller to fetch combined data from multiple endpoints
const getCombinedData = async (req, res) => {
    try {
        // Log the request
        console.log("Fetching combined data with latest keys...");

        // Construct endpoints using "latest" as the keys
        const endpoints = {
            carData: `https://api.openf1.org/v1/car_data?session_key=latest&meeting_key=latest`,
            drivers: `https://api.openf1.org/v1/drivers?session_key=latest&meeting_key=latest`,
            intervals: `https://api.openf1.org/v1/intervals?session_key=latest&meeting_key=latest`,
            laps: `https://api.openf1.org/v1/laps?session_key=latest&meeting_key=latest`,
            location: `https://api.openf1.org/v1/location?session_key=latest&meeting_key=latest`,
            pit: `https://api.openf1.org/v1/pit?session_key=latest&meeting_key=latest`,
            position: `https://api.openf1.org/v1/position?session_key=latest&meeting_key=latest`,
            raceControl: `https://api.openf1.org/v1/race_control?session_key=latest&meeting_key=latest`,
            stints: `https://api.openf1.org/v1/stints?session_key=latest&meeting_key=latest`,
            teamRadio: `https://api.openf1.org/v1/team_radio?session_key=latest&meeting_key=latest`,
            weather: `https://api.openf1.org/v1/weather?session_key=latest&meeting_key=latest`,
        };

        // Step 4: Fetch all combined data
        const combinedData = {};
        for (const key in endpoints) {
            combinedData[key] = await fetchData(endpoints[key]);
            console.log(`${key} data:`, combinedData[key]); // Log each fetched data
        }

        // Step 5: Send combined data as JSON response
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error); // Log the complete error for debugging
        res.status(500).json({ 
            message: 'Error fetching data', 
            error: error.message, 
            stack: error.stack 
        });
    }
};

module.exports = { getCombinedData };

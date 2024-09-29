const { fetchData } = require('../services/apiService');

const getCombinedData = async (req, res) => {
    const endpoints = {
        carData: 'https://api.openf1.org/v1/car_data',
        drivers: 'https://api.openf1.org/v1/drivers',
        intervals: 'https://api.openf1.org/v1/intervals',
        laps: 'https://api.openf1.org/v1/laps',
        location: 'https://api.openf1.org/v1/location',
        meetings: 'https://api.openf1.org/v1/meetings',
        pit: 'https://api.openf1.org/v1/pit',
        position: 'https://api.openf1.org/v1/position',
        raceControl: 'https://api.openf1.org/v1/race_control',
        sessions: 'https://api.openf1.org/v1/sessions',
        stints: 'https://api.openf1.org/v1/stints',
        teamRadio: 'https://api.openf1.org/v1/team_radio',
        weather: 'https://api.openf1.org/v1/weather',
    };

    try {
        const combinedData = {};

        // Fetch each piece of data with individual error handling
        try {
            console.log("Fetching meeting data...");
            combinedData.meeting = await fetchData(endpoints.meetings);
        } catch (error) {
            console.error('Error fetching meeting data:', error.message);
            combinedData.meeting = null; // Handle accordingly
        }

        try {
            console.log("Fetching session data...");
            combinedData.session = await fetchData(endpoints.sessions);
        } catch (error) {
            console.error('Error fetching session data:', error.message);
            combinedData.session = null; // Handle accordingly
        }

        // Repeat for each endpoint
        for (const key in endpoints) {
            if (!combinedData[key]) { // Avoid re-fetching if error occurred
                try {
                    console.log(`Fetching ${key} data...`);
                    combinedData[key] = await fetchData(endpoints[key]);
                } catch (error) {
                    console.error(`Error fetching ${key} data:`, error.message);
                    combinedData[key] = null; // Handle accordingly
                }
            }
        }

        res.json(combinedData);
    } catch (error) {
        console.error('General error fetching data:', error);
        res.status(500).json({ 
            message: 'Error fetching data', 
            error: error.message, 
            stack: error.stack 
        });
    }
};

module.exports = { getCombinedData };

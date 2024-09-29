const { fetchData } = require('../services/apiService');

// Controller to fetch combined data from multiple endpoints
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
        // Fetching meeting data
        console.log("Fetching meeting data...");
        const meetingData = await fetchData(endpoints.meetings);
        
        // Fetching session data
        console.log("Fetching session data...");
        const sessionData = await fetchData(endpoints.sessions);

        const combinedData = {
            meeting: meetingData,
            session: sessionData,
            carData: await fetchData(endpoints.carData),
            drivers: await fetchData(endpoints.drivers),
            intervals: await fetchData(endpoints.intervals),
            laps: await fetchData(endpoints.laps),
            location: await fetchData(endpoints.location),
            pit: await fetchData(endpoints.pit),
            position: await fetchData(endpoints.position),
            raceControl: await fetchData(endpoints.raceControl),
            stints: await fetchData(endpoints.stints),
            teamRadio: await fetchData(endpoints.teamRadio),
            weather: await fetchData(endpoints.weather),
        };

        // Sending combined data as JSON response
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching data:', error); // Log the complete error for debugging
        res.status(500).json({ 
            message: 'Error fetching data', 
            error: error.message, 
            stack: error.stack 
        });
    }
};

module.exports = { getCombinedData };

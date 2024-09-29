const fetchAllData = async (endpoints) => {
    const results = {};
    for (const [key, url] of Object.entries(endpoints)) {
        try {
            results[key] = await fetchData(url);
        } catch (error) {
            console.error(`Error fetching ${key}:`, error.message);
            results[key] = null; // or handle the error as needed
        }
    }
    return results;
};

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
        console.log("Fetching data from multiple endpoints...");
        const combinedData = await fetchAllData(endpoints);
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching data:', error); // Log error for debugging
        res.status(500).json({ 
            message: 'Error fetching data', 
            error: error.message, 
            stack: error.stack 
        });
    }
};

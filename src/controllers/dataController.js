const getCombinedData = async (req, res) => {
    console.log("Request received:", req.method, req.url);
    
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
        
        const responses = await Promise.all([
            fetchData(endpoints.meetings),
            fetchData(endpoints.sessions),
            fetchData(endpoints.carData),
            fetchData(endpoints.drivers),
            fetchData(endpoints.intervals),
            fetchData(endpoints.laps),
            fetchData(endpoints.location),
            fetchData(endpoints.pit),
            fetchData(endpoints.position),
            fetchData(endpoints.raceControl),
            fetchData(endpoints.stints),
            fetchData(endpoints.teamRadio),
            fetchData(endpoints.weather),
        ]);

        console.log("Data fetched successfully:", responses);

        const combinedData = {
            meeting: responses[0],
            session: responses[1],
            carData: responses[2],
            drivers: responses[3],
            intervals: responses[4],
            laps: responses[5],
            location: responses[6],
            pit: responses[7],
            position: responses[8],
            raceControl: responses[9],
            stints: responses[10],
            teamRadio: responses[11],
            weather: responses[12],
        };

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

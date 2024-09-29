const axios = require('axios');

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data; // Adjust if you need a specific property from the response
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        throw error; // Rethrow to handle in the controller
    }
};

module.exports = { fetchData };

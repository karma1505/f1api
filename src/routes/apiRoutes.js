const axios = require('axios');

const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data; // Adjust if you need a specific property from the response
};

module.exports = { fetchData };

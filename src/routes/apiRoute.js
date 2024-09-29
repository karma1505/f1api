const express = require('express');
const apiRoutes = require('./routes/apiRoute'); // Adjust the path as needed

const app = express();

// Use the API routes
app.use('/api', apiRoutes);

// Add error middleware
app.use(errorMiddleware);

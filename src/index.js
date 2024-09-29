const express = require('express');
const apiRoutes = require('./routes/apiRoutes'); // Ensure this is the correct path

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the F1 API!');
});

// Use API routes
app.use('/api', apiRoutes);

// Vercel requires you to export the app
module.exports = app;

// Start the server only for local development
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

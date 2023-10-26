const express = require('express');
require('./config/database');
require('dotenv').config();

const app = express();

const employeeRoutes = require('./routes/employee');

const PORT = process.env.PORT || 3000;

// Set up middleware, routes, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

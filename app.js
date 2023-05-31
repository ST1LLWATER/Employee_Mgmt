const express = require('express');
const db = require('./config/database');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// Set up middleware, routes, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('node:path');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(
session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
})
);

// Routes
app.use('/', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const { connectDB } = require('./config/userdatabase');
connectDB();
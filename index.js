const express = require('express');
const { connectDB, sequelize } = require('./config/userdatabase');
const User = require('./models/user');
const Todo = require('./models/todo');
const router = express.Router();
const path = require('node:path');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per JSON
app.use(express.json());

app.use('/', authRoutes);

// Sincronizza i modelli
sequelize.sync({ alter: true }).then(() => {
    console.log('Modelli sincronizzati con il DB');
});


router.get('/login', function(req, res, next) {
    res.render('login');
});

app.use(express.json());
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
console.log('disponibile su http://localhost:3000');
connectDB();

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
});
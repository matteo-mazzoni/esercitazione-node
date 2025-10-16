const express = require('express');
const session = require('express-session');
const { connectDB, sequelize } = require('./config/userdatabase');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Todo = require('./models/todo');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per JSON
app.use(express.json());

// Sincronizza i modelli
sequelize.sync({ alter: true }).then(() => {
    console.log('Modelli sincronizzati con il DB');
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
console.log('disponibile su http://localhost:3000');
connectDB();
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

app.use(express.json());

// User registration
app.post('/register', async (req, res) => {
try {
const { username, password } = req.body;
const user = new User({ username, password: bcrypt.hashSync(password, 10) });
await user.save();
res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
console.error('Registration error:', error);
res.status(500).json({ error: 'Registration failed' });
}
});
// User login
app.post('/login', async (req, res) => {
try {
const { username, password } = req.body;
const user = await User.findOne({
where: { username: req.body.username }
});
if (!user) {
return res.status(401).json({ error: 'Authentication failed' });
}
const passwordMatch = await bcrypt.compare(password, user.password);
if (!passwordMatch) {
return res.status(401).json({ error: 'Authentication failed' });
}
const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
expiresIn: '1h',
});
res.status(200).json({ token });
}
catch (error) {
console.error('Registration error:', error);
res.status(500).json({ error: 'Login failed' });
}
});
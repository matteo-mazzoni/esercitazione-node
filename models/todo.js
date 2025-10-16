const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./config/userdatabase');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;

// view engine per EJS (HTML dinamico)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(express.json()); // per file JSON
app.use(express.urlencoded({ extended: true })); // per form HTML

// importare le rotte in caso di creazione
const authRouter = require('./routes/auth');
app.use('/', authRouter);

// sincronizza DB e avvia il server in maniera pulita
async function start() {
  try {
    await connectDB(); // assicura che la connessione sia stabilita
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Errore avviando il server:', err);
    process.exit(1);
  }
}
start();

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
{
  tableName: 'todos',
  timestamps: true,
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
    }
  }
});

// Metodo di istanza per verificare la password
User.prototype.verifyPassword = function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = User;
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('java', 'root', process.env.DATABASEPSSWD, {
host: 'localhost',
dialect: 'mysql',
logging: false,
});

const connectDB = async () => {
try {
    await sequelize.authenticate();
    console.log('Connessione riuscita');
} catch (error) {
    console.error('Impossibile connettersi.', error);
}
};

module.exports = { sequelize, connectDB };

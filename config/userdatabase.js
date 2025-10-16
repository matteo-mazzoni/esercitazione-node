const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('java', 'root', 'mazzoni', {
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

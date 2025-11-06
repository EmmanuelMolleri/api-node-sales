const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: process.env.DB_SSL === 'true' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

// Adicionar métodos que o app.js espera
const database = {
  sequelize,
  authenticate: async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexão com PostgreSQL estabelecida!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao conectar com PostgreSQL:', error);
      throw error;
    }
  },
  close: async () => {
    try {
      await sequelize.close();
      console.log('🔌 Conexão com PostgreSQL fechada.');
    } catch (error) {
      console.error('❌ Erro ao fechar conexão:', error);
      throw error;
    }
  }
};

module.exports = database;


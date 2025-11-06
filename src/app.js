require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const database = require('./infraestructure/database/connection');
const logger = require('./shared/monitoring/logger');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://seusite.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    nodeVersion: process.version
  });
});

app.use('/api/auth', require('./infraestructure/http/routes/AuthorizationRoutes'));
app.use('/api/cart', require('./infraestructure/http/routes/CartRoutes'));
app.use('/api/product', require('./infraestructure/http/routes/ProductRoutes'));

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((error, req, res, next) => {
  logger.error('Erro não tratado:', error);
  
  res.status(error.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

process.on('SIGTERM', async () => {
  logger.info('Recebido SIGTERM. Encerrando servidor graciosamente...');
  await database.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('Recebido SIGINT. Encerrando servidor graciosamente...');
  await database.close();
  process.exit(0);
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await database.authenticate();
    logger.info('✅ Conectado ao PostgreSQL');
    
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${PORT}`);
      logger.info(`📊 Ambiente: ${process.env.NODE_ENV}`);
      logger.info(`🔗 Health Check: http://localhost:${PORT}/health`);
    });
    
  } catch (error) {
    logger.error('❌ Falha ao iniciar servidor:', error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
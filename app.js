const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const pcRoutes = require('./routes/pcRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/soportetecnico/api', pcRoutes);

// Verificar conexión y arrancar servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente.');
    
    await sequelize.sync(); // Sincroniza modelos con la BD
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error de conexión/inicialización:', error);
    process.exit(1); // Termina el proceso con error
  }
}

startServer();

// Manejo de cierre elegante
process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit();
});
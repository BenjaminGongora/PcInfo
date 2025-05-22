const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const pcRoutes = require('./routes/pcRoutes');

const app = express();
const path = require('path');
// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


// Rutas
app.use('/soportetecnico/api', pcRoutes);

// Verificar conexión y arrancar servidor

const PORT = process.env.PORT || 10000; // Render usa process.env.PORT
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente.');
    
    await sequelize.sync();
   
    app.listen(PORT, '0.0.0.0', () => { // Escucha en todas las interfaces
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error de inicio:', error);
    process.exit(1);
  }
}

startServer();

// Manejo de cierre elegante
process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit();
});
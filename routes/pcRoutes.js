const express = require('express');
const router = express.Router();
const pcController = require('../controllers/pcController');

// Ruta POST para recibir datos del PC (JSON)
router.post('/recibir-datos', pcController.recibirDatosPC);

// Ruta GET para listar todos los registros
router.get('/listar-datos', pcController.listarDatosPC);

module.exports = router;
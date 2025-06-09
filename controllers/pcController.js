const PcInfo = require('../models/PcInfo');

// Controlador para recibir datos
exports.recibirDatosPC = async (req, res) => {
  try {
    const { UserInfo, SystemInfo } = req.body;
    
    const pcInfo = await PcInfo.create({
      nombre: UserInfo.Nombre,
      apellido: UserInfo.Apellido,
      dni: UserInfo.DNI,
      area: UserInfo.Area,
      sucursal: UserInfo.sucursal,
      systemmodel: SystemInfo.SystemModel, // Ahora en minúsculas
      systemserial: SystemInfo.SystemSerial, // Ahora en minúsculas
      operatingsystem: SystemInfo.OperatingSystem,
      cpu: SystemInfo.CPU,
      totalramgb: SystemInfo.TotalRAMGB,
      gpus: SystemInfo.GPUs,
      storagedevices: SystemInfo.StorageDevices,
      timestamp: new Date(SystemInfo.Timestamp)
    });

    res.status(201).json({
      success: true,
      data: pcInfo
    });
  } catch (error) {
    console.error('Error al guardar datos:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.listarDatosPC = async (req, res) => {
    try {
        // 1. Obtener los datos crudos desde PostgreSQL
        const datos = await PcInfo.findAll({
            raw: true,  // Obtener datos crudos sin instancias del modelo
            order: [['timestamp', 'DESC']]
        });

        // 2. Procesar los datos manualmente
        const resultados = datos.map(item => {
            // Manejo especial para GPUs (jsonb que contiene string con pipes)
            let gpus = [];
            if (item.gpus) {
                try {
                    // Intenta parsear como JSON primero (por si acaso)
                    const parsed = JSON.parse(item.gpus);
                    gpus = Array.isArray(parsed) ? parsed : [parsed];
                } catch (e) {
                    // Si falla el parseo JSON, asumimos que es string con pipes
                    gpus = typeof item.gpus === 'string' 
                        ? item.gpus.split('|').filter(g => g.trim() !== '')
                        : [];
                }
            }

            // Manejo para storageDevices (jsonb)
            let storageDevices = [];
            if (item.storageDevices) {
                try {
                    storageDevices = JSON.parse(item.storageDevices);
                    if (!Array.isArray(storageDevices)) {
                        storageDevices = [storageDevices];
                    }
                } catch (e) {
                    storageDevices = [];
                }
            }

            return {
                ...item,
                gpus,
                storageDevices
            };
        });

        res.status(200).json({
            success: true,
            data: resultados,
            count: resultados.length
        });

    } catch (error) {
        console.error('Error al listar datos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al recuperar los datos',
            error: error.message
        });
    }
};
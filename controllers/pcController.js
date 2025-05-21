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
      systemmodel: SystemInfo.SystemModel, // Ahora en minúsculas
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

// Controlador para listar datos
exports.listarDatosPC = async (req, res) => {
    try {
        const datos = await PcInfo.findAll({
            order: [['timestamp', 'DESC']]
        });
        
        // Procesamiento seguro de los datos
        const resultados = datos.map(item => {
            const dato = item.get({ plain: true });
            
            // Manejo seguro de los campos JSON
            try {
                dato.gpus = dato.gpus ? JSON.parse(dato.gpus) : [];
            } catch {
                dato.gpus = [];
            }
            
            try {
                dato.storageDevices = dato.storageDevices ? JSON.parse(dato.storageDevices) : [];
            } catch {
                dato.storageDevices = [];
            }
            
            return dato;
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

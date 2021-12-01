const express = require('express')
const router = express.Router();
const proyecto = require('../controllers/proyectoController')

//RUTAS DE PROYECTO
// router.get('/listar',proyecto.listar)
// router.get('/listar/:id', proyecto.listarPorId)
 router.post('/crear',proyecto.crear)
 router.get('/listar',proyecto.listar)
 router.get('/listar/:id',proyecto.listarPorId)
 router.delete('/eliminar/:id',proyecto.eliminarPorId)
 router.put('/actualizar/:id',proyecto.actualizarPorId)
 router.get('/foto/:id',proyecto.foto)
// router.delete('/eliminar/:id',proyecto.eliminarPorId)
// router.put('/editar/:id',proyecto.editarPorId)

module.exports = router;
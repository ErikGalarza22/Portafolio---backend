const express = require('express')
const router = express.Router()
const categoria = require('../controllers/categoriaController')


//RUTAS DE CATEGORIA
router.get('/listar',categoria.listar)
router.get('/listar/:id', categoria.listarPorId)
router.post('/crear',categoria.crear)
router.delete('/eliminar/:id',categoria.eliminarPorId)
router.put('/editar/:id',categoria.editarPorId)
router.get('/proyectos/:idcategoria',categoria.proyectosPorCategoria)




module.exports = router;

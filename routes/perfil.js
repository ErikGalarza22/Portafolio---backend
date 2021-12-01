const express = require('express')
const router = express.Router()
const perfil = require('../controllers/perfilController')

router.get('/listar',perfil.listar)
// router.get('/listar/:id', perfil.listarPorId)
router.post('/crear',perfil.crear)
router.delete('/eliminar/:id',perfil.eliminarPorId)
router.put('/editar/:id',perfil.editarPorId)
router.get('/foto/:id',perfil.foto)

module.exports = router;
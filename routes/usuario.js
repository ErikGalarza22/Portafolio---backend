const express = require('express')
const router = express.Router()
const usuario = require('../controllers/usuarioController')

router.get('/listar',usuario.listar)
// router.get('/listar/:id', perfil.listarPorId)
router.post('/signup',usuario.crear)
router.post('/login',usuario.login)
// router.delete('/eliminar/:id',usuario.eliminarPorId)
// router.put('/editar/:id',usuario.editarPorId)
module.exports = router;
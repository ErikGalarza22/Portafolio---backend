const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

exports.crear = (req, res, next) =>{
    console.log(req.body)
var salt = 12;
const usuario = new Usuario({
    nombre : req.body.nombre,
    correo : req.body.correo,
    clave : req.body.clave
})

bcrypt.hash(req.body.clave, salt)
.then(function(hashedpassword){
    usuario.clave = hashedpassword
    usuario.save()
    return res.send({message:'Usuario agregado exitosamente'})
})
.catch(function(error){
console.log("error")
next();
})
}



exports.login = async (req, res)=>{
    try{
  const {correo, clave} = req.body

  if(!correo || !clave){
      return res.status(400).json({msg:'Ingrese el correo y contraseña'})
  }
  const user = await Usuario.findOne({correo:correo});
  if(!user){
      return res.status(400).json({msg:'No hay una cuenta registrada con ese correo'})
  }

  const isMath = await bcrypt.compare(clave, user.clave);
  if(!isMath){
      return res.status(400).json({msg:'Credenciales incorrectas'})
  }

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
  res.json({
      token,
      user:{
          id : user._id,
          nombre:user.nombre,
          correo:user.correo
      }
  })

}catch(error){
    res.status(500).send({err:error.message})
}

}



exports.listar = (req, res)=>{
    Usuario.find()
    
    .then(usuarios=>{
        res.send(usuarios)
    })
    .catch(err=>{
        res.send(err)
    })
}


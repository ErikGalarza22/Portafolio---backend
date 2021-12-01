const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        maxlength:20,
        trim:true
    }
    ,
   correo:{
       type:String,
       trim:true,
       lowercase:true,
       unique:true
   }
   ,
   clave:{
       type:String,
       minlength:8
   }
})

module.exports = mongoose.model('Usuario', usuarioSchema)

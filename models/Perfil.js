const mongoose = require('mongoose')

const perfilSchema = new mongoose.Schema({
    nombre:{
        type:String,
        trim:true
    },
    correo:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true
    },
    foto:{
       data:Buffer,
       contentType: String
    },
    
    especialidad:{
        type:String,
        maxlength:40,
        trim:true
    },
    telefono:{
        type:String,
        maxlength:13,
        trim:true
    }
    ,
    descripcion:{
        type:String,
        maxlength:120,
        trim:true
    }
},{timestamps:true})

module.exports = mongoose.model('Perfil', perfilSchema);


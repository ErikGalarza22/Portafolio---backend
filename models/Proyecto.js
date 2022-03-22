const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const proyectoSchema = new mongoose.Schema({
    
    categoria: {
        type: ObjectId,
        ref: 'Categoria',
        require: true
      },
    
    nombre: {
      type: String,
      unique: true,
      trim: true,
    },

    url: {
      type: String,
    },
    
    public_id: {
      type: String,
    },

    enlace:{
        type:String,
        unique:true,
        trim:true
    },

    descripcion:{
        type:String,
        maxlength:2000
    }

  },
  
  {timestamps: true});
  
  module.exports = mongoose.model("Proyecto", proyectoSchema);
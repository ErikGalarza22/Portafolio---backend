const mongoose = require('mongoose')

const tecnologia = new mongoose.Schema({


    nombre:{
        type:String,
        trim:true,
        minlength:0,
        maxlength:40
    },
    foto:{
        data:Buffer,
        contentType: String
    },
    tipo:{
        type:Number,
        min:1,max:3 //1: backend 2:frontend 3:database
    }


},{timestamps:true})

module.exports = mongoose.model('Tecnologia', tecnologia);
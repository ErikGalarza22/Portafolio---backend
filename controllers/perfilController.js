const Perfil = require('../models/Perfil')
const formidable = require('formidable')
const fs = require('fs');


exports.crear = (req, res) => {
    console.log(req.body)
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        let perfil = new Perfil(fields)
        console.log(files.foto.path)
         perfil.foto.data = fs.readFileSync(files.foto.path)//aqui se obtiene el contenido de la imagen, en base 64
         perfil.foto.contentType = files.foto.type
        // console.log("aqui va a estar data")
        // console.log(data)
       perfil.save((error, data)=>{
           if(error){
               return res.status(400).send({message:'error al guardar el perfil'})
           }
           return res.json(data)
       })
      })
    }

    
exports.listar=(req,res)=>{
    Perfil.find()
    .select("-foto")
    .then(perfiles=>{
        res.send(perfiles)
    }).catch(err=>{
        res.send(err)
    })
}

exports.eliminarPorId = (req,res)=>{
    Perfil.findByIdAndRemove(req.params.id).then(()=>{
        res.send({message:'Perfil eliminado'})
    }).catch(err=>{
        res.send({message:'Error al eliminar el perfil'})
    })
}

exports.editarPorId = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        let perfilNuevo = new Perfil(fields)
        perfilNuevo.foto.data = fs.readFileSync( files.foto.path)
        perfilNuevo.foto.contentType = files.foto.type

        Perfil.findByIdAndUpdate(req.params.id,
            {nombre: fields.nombre,
               correo: fields.correo,
               especialidad: fields.especialidad,
               telefono: fields.telefono,
               descripcion: fields.descripcion,
               foto: perfilNuevo.foto
           }, {new: true}, ()=>{
               res.send('Perfil con id: '+req.params.id+' actualizado')
           })
    })
}

exports.foto = (req, res)=>{
    console.log(req.params.id)
    Perfil.findById(req.params.id)
    .exec((err, perfil) => {
      if (err || !perfil) {
        return res.status(400).json({
          error: "perfil not found"
        });
      }
      req.perfil = perfil;

      if (req.perfil.foto.data) {
        res.set('Content-Type', req.perfil.foto.contentType)
        return res.send(req.perfil.foto.data)
      }
     return res.send(req.perfil.foto.data)
    })
}
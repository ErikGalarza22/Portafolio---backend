const Proyecto = require('../models/Proyecto')
const formidable = require('formidable');
const fs = require('fs');

exports.crear = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        let proyecto = new Proyecto(fields)
        console.log(files.foto.path)
         proyecto.foto.data = fs.readFileSync(files.foto.path)//aqui se obtiene el contenido de la imagen, en base 64
         proyecto.foto.contentType = files.foto.type
       proyecto.save((error, data)=>{
           if(error){
               return res.status(400).send({message:'error al guardar el proyecto'})
           }
           return res.json(data)
       })
      })
    }

exports.listar=(req,res)=>{
    Proyecto.find()
    .select("-foto")
    .then(proyectos=>{
        res.send(proyectos)
    }).catch(err=>{
        res.send(err)
    })
}

exports.listarPorId = (req,res)=>{
    Proyecto.findById(req.params.id).then(proyecto=>{
        if(!proyecto){
            return res.send({message:'No se encontro el proyecto con id: '+req.params.id})
        }
        res.send(proyecto)
    }).catch(err=>{
        res.send(err)
    })
}

exports.eliminarPorId = (req,res)=>{
    Proyecto.findByIdAndRemove(req.params.id).then(()=>{
        res.send({message:'Proyecto eliminado'})
    }).catch(err=>{
        res.send({message:'Error al eliminar el proyecto'})
    })
}

exports.actualizarPorId = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        let proyectoNuevo = new Proyecto(fields)
        proyectoNuevo.foto.data = fs.readFileSync( files.foto.path)
        proyectoNuevo.foto.contentType = files.foto.type

        Proyecto.findByIdAndUpdate(req.params.id,
            {nombre: fields.nombre,
               categoria: fields.categoria,
               descripcion: fields.descripcion,
               enlace: fields.enlace,
               foto: proyectoNuevo.foto
           }, {new: true}, ()=>{
               res.send('Proyecto con id: '+req.params.id+' actualizado')
           })
    })
}

exports.foto = (req, res)=>{
    console.log(req.params.id)
    Proyecto.findById(req.params.id)
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

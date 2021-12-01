const Tecnologia = require('../models/Tecnologia')
const formidable = require('formidable');
const fs = require('fs');

exports.crear = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        let tecnologia = new Tecnologia(fields)
        console.log(fields)
        console.log(files.foto.path)
         tecnologia.foto.data = fs.readFileSync(files.foto.path)//aqui se obtiene el contenido de la imagen, en base 64
         tecnologia.foto.contentType = files.foto.type
       tecnologia.save((error, data)=>{
           if(error){
               return res.status(400).send({message:'error al guardar la tecnología'})
           }
           return res.json(data)
       })
      })
    }

    exports.listar=(req,res)=>{
        Tecnologia.find()
        .select("-foto")
        .then(tecnologias=>{
            res.send(tecnologias)
        }).catch(err=>{
            res.send(err)
        })
    }


    exports.tecnologiasFrontend=(req, res)=>{
        Tecnologia.findOne({tipo:2})
        .then(tecnologias=>{
            if(!tecnologias){
                res.status(404).json({msg:'No se hallaron tecnologias disponibles'})
            }
             res.send(tecnologias)
        })
        .catch(err=>{
             res.status(400).send({message:'No se pudo obtener las tecnologias de frontend'})
        })
    }

    exports.tecnologiasBackend=(req, res)=>{
        Tecnologia.findOne({tipo:1})
        .then(tecnologias=>{
            if(!tecnologias){
            res.send({message:'No se encontraron tecnologías disponibles para el Backend'})
            }
             res.send(tecnologias)
        })
        .catch(err=>{
             res.status(400).send({message:'No se pudo obtener las tecnologias de backend'})
        })
    }
    exports.tecnologiasDatabase=(req, res)=>{
        Tecnologia.findOne({tipo:3})
        .then(tecnologias=>{
            if(!tecnologias){
             res.send({message:'No se encontraron tecnologías disponibles de bases de datos'})
            }
             res.send(tecnologias)
        })
        .catch(err=>{
             res.status(400).send({message:'No se pudo obtener las tecnologias de bases de datos'})
        })
    }

    
exports.eliminarPorId = (req,res)=>{
    Tecnologia.findByIdAndRemove(req.params.id).then(()=>{
        res.send({message:'Tecnologia eliminada'})
    }).catch(err=>{
        res.send({message:'Error al eliminar la tecnología'})
    })
}

exports.actualizarPorId = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        let tecnologiaNuevo = new Tecnologia(fields)
        tecnologiaNuevo.foto.data = fs.readFileSync( files.foto.path)
        tecnologiaNuevo.foto.contentType = files.foto.type

        Tecnologia.findByIdAndUpdate(req.params.id,
            {nombre: fields.nombre,
               foto: tecnologiaNuevo.foto
           }, {new: true}, ()=>{
               res.send('Tecnología con id: '+req.params.id+' actualizada')
           })
    })
}

exports.foto = (req, res)=>{
    console.log(req.params.id)
    Tecnologia.findById(req.params.id)
    .exec((err, tecnologia) => {
      if (err || !tecnologia) {
        return res.status(400).json({
          error: "tecnologia not found"
        });
      }
      req.tecnologia = tecnologia;
      if (req.tecnologia.foto.data) {
        res.set('Content-Type', req.tecnologia.foto.contentType)
        return res.send(req.tecnologia.foto.data)
      }
     return res.send(req.tecnologia.foto.data)
    })
}
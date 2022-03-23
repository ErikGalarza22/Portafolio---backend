const Proyecto = require('../models/Proyecto')
const formidable = require('formidable');
const fs = require("fs");
var cloudinary = require("cloudinary");

exports.crear = (req, res) => {
  console.log('editar proyecto');
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(fields);
      if (!fields.nombre) {
        return res.status(400).send({ message: "El nombre es requerido" });
      }
      if (!fields.enlace) {
        return res.status(400).send({ message: "El enlace es requerido" });
      }
  
      let proyecto = new Proyecto(fields);
      console.log(files);
  
  if(files.foto){
  console.log('si existe');
    console.log(fs.existsSync(files.foto.path));//true
  
    var obj = cloudinary.uploader.upload(files.foto.path);
    obj.then(response=>{
      proyecto.url = response.secure_url,
      proyecto.public_id = response.public_id
      console.log(proyecto);
  
      proyecto.save()
      .then((data) => {
        res.send(data);
      }).catch(err=>{
        res.status(500).send({
          message: err.message || "Algun error ocurrió mientras se creaba el proyecto.",
        });
      })
    });//promesa cloudinary  
  
  }else{
  console.log('no existe');
  proyecto.save()
        .then((data) => {
          res.send(data);
        }).catch(err=>{
          res.status(500).send({
            message: err.message || "Algun error ocurrió mientras se creaba el proyecto.",
          });
        })
  
      }
    });
  }

exports.listar=(req,res)=>{
    Proyecto.find()
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


exports.actualizarPorId = (req, res) => {
  console.log(req.params.id);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {

    console.log(fields);
    let id = req.params.id;
    tecno = Proyecto.findById(id, (err,data)=>{
      if(err){
        console.log(err);
      }
      console.log(data);
      cloudinary.uploader.destroy(data.public_id);//elimino la imagen anterior

  if (files.foto) {//si viene una imagen nueva
    console.log('Si hay nueva imagen');

    var newImg = cloudinary.uploader.upload(files.foto.path);//cargo la nueva imagen
    newImg.then(response=>{
      Proyecto.findByIdAndUpdate(
        id, {nombre:fields.nombre,enlace:fields.enlace, descripcion:fields.descripcion,  url:response.secure_url, public_id:response.public_id}
        ).then(tecEdit=>{
          res.send(tecEdit)
        }).catch(err=>{
          res.send({ message: "Error al actualizar el proyecto" });
        })
    }).catch(err=>{
      res.send({message:"Error al editar el proyecto"});
    }) 
    }else{
      Proyecto.findByIdAndUpdate(
        id, {nombre:fields.nombre, enlace:fields.enlace, descripcion:fields.descripcion}
        ).then(tecEdit=>{
          res.send(tecEdit)
        }).catch(err=>{
          res.send({ message: "Error al actualizar el proyecto" });
        })
    }

     
    });//findById

});
}


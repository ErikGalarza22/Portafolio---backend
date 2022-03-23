const Tecnologia = require("../models/Tecnologia");
const formidable = require("formidable");
const fs = require("fs");
var cloudinary = require("cloudinary");

exports.crear = (req, res) => {

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(files);
    if (!fields.nombre) {
      return res.status(400).send({ message: "El nombre es requerido" });
    }
    if (!fields.tipo) {
      return res.status(400).send({ message: "El tipo es requerido" });
    }

    let tecnologia = new Tecnologia(fields);
    console.log(files);

if(files.foto){
console.log('si existe');
  console.log(fs.existsSync(files.foto.path));//true

  var obj = cloudinary.uploader.upload(files.foto.path);
  obj.then(response=>{
    tecnologia.url = response.secure_url,
    tecnologia.public_id = response.public_id
    console.log(tecnologia);

    tecnologia.save()
    .then((data) => {
      res.send(data);
    }).catch(err=>{
      res.status(500).send({
        message: err.message || "Algun error ocurrió mientras se creaba la tecnología.",
      });
    })
  });//promesa cloudinary  

}else{
console.log('no existe');
      tecnologia.save()
      .then((data) => {
        res.send(data);
      }).catch(err=>{
        res.status(500).send({
          message: err.message || "Algun error ocurrió mientras se creaba la tecnología.",
        });
      })

    }

    

  });//form-parse
};

exports.listar = (req, res) => {
  Tecnologia.find()
    .then((tecnologias) => {
      return res.send(tecnologias);
    })
    .catch((err) => {
      return res.send(err);
    });
};


exports.eliminarPorId = (req, res) => {
  console.log(req.params.id);
  Tecnologia.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: "Tecnologia eliminada" });
    })
    .catch((err) => {
      res.send({ message: "Error al eliminar la tecnología" });
    });
};

exports.actualizarPorId = (req, res) => {
  console.log(req.params.id);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {

    console.log(fields);
    let id = req.params.id;
    tecno = Tecnologia.findById(id, (err,data)=>{
      if(err){
        console.log(err);
      }
      console.log(data);
      cloudinary.uploader.destroy(data.public_id);//elimino la imagen anterior

  if (files.foto) {//si viene una imagen nueva
    console.log('Si hay nueva imagen');

    var newImg = cloudinary.uploader.upload(files.foto.path);//cargo la nueva imagen
    newImg.then(response=>{
      Tecnologia.findByIdAndUpdate(
        id, {nombre:fields.nombre, tipo:fields.tipo, url:response.secure_url, public_id:response.public_id}
        ).then(tecEdit=>{
          res.send(tecEdit)
        }).catch(err=>{
          res.send({ message: "Error al actualizar la tecnología" });
        })
    }).catch(err=>{
      res.send({message:"Error al editar la tecnología"});
    }) 
    }else{
      Tecnologia.findByIdAndUpdate(
        id, {nombre:fields.nombre, tipo:fields.tipo}
        ).then(tecEdit=>{
          res.send(tecEdit)
        }).catch(err=>{
          res.send({ message: "Error al actualizar la tecnología" });
        })
    }

     
    });//findById

});
}


exports.tecnologiasFrontend = (req,res) =>{
console.log("tecnologias frontend");
Tecnologia.find({tipo:"1"}, (err,data)=>{
  if(err){
    res.send({message:"No se pudo realizar la búsqueda de las tecnologías"});
  }
  if(!data){
    res.send({message:"No se encontraron coincidencias"});
  }
 res.send(data);
})
}

exports.tecnologiasBackend = (req,res) =>{
  console.log("tecnologias backend");
  Tecnologia.find({tipo:"2"}, (err,data)=>{
    if(err){
      res.send({message:"No se pudo realizar la búsqueda de las tecnologías"});
    }
    if(!data){
      res.send({message:"No se encontraron coincidencias"});
    }
   res.send(data);
  })
  }

  exports.tecnologiasDatabase = (req,res) =>{
    console.log("tecnologias database");
    Tecnologia.find({tipo:"3"}, (err,data)=>{
      if(err){
        res.send({message:"No se pudo realizar la búsqueda de las tecnologías"});
      }
      if(!data){
        res.send({message:"No se encontraron coincidencias"});
      }
     res.send(data);
    })
    }


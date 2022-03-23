const Categoria = require('../models/Categoria');
const formidable = require("formidable");
const fs = require("fs");
const Proyecto = require('../models/Proyecto')

// Create and Save a new Categoria
exports.crear = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(fields);
      if (!fields.nombre) {
        return res.status(400).send({ message: "El nombre es requerido" });
      }
     
      let categoria = new Categoria(fields);
      console.log(files);
  
      categoria.save()
      .then((data) => {
        res.send(data);
      }).catch(err=>{
        res.status(500).send({
          message: err.message || "Algun error ocurrió mientras se creaba la categoría.",
        });
      })       
  
    });//form-parse
  };

//traer todas las categorias
exports.listar = (req, res)=>{
    Categoria.find()
    .then(categorias=>{
        res.send(categorias)
    })
    .catch(err=>{
        res.send(err)
    })
}
///traer una categoria
exports.listarPorId = (req, res) => {
    Categoria.findById(req.params.id)
        .then(categoria => {
            if(!categoria) {
                return res.status(404).send({
                    message: "categoriaa not found with id " + req.params.id
                });            
            }
            res.send(categoria);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "categoria2 not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
    };


    //eliminar una categoria
    exports.eliminarPorId = (req, res) => {
        Categoria.findByIdAndRemove(req.params.id)
            .then(categoria => {
                if(!categoria) {
                    return res.status(404).send({
                        message: "categoria not found with id " + req.params.id
                    });
                }
                res.send({message: "Categoria eliminada exitosamente!"});
            }).catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Categoria no encontrada con el id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "No se encontro la categoria con el id: " + req.params.id
                });
            });
        };

        exports.editarPorId = (req, res) => {
            console.log(req.params.id);
            let form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
          
              console.log(fields);
              let id = req.params.id;

                Categoria.findByIdAndUpdate(
                  id, {nombre:fields.nombre}
                  ).then(catEdit=>{
                    res.send(catEdit)
                  }).catch(err=>{
                    res.send({ message: "Error al actualizar la categoría" });
                  })
  
              });//findById
          
          }


exports.proyectosPorCategoria = (req, res) =>{
    Proyecto.find({categoria:req.params.idcategoria})
    .then(proyectos=>{

        if(!proyectos){
            return res.send({message:'No se encontraron proyectos en la categoria con id: '+req.params.idcategoria})
        }
        res.send(proyectos)
    })

}
    




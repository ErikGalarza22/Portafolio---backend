const Categoria = require('../models/Categoria');
const Proyecto = require('../models/Proyecto')


// Create and Save a new Categoria
exports.crear = (req, res) => {
    // Validate request
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "categoria content can not be empty"
        });
    }
    console.log(req.body);
    // Create
    const categoria = new Categoria({
        nombre: req.body.nombre || "Default", 
    });
    
    // Save Categoria in the database
    categoria.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algun error ocurrio mientras se creaba la categoria."
        });
    });
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

//editar categoria
exports.editarPorId = (req, res) => {
    // Validate Request
    console.log(req.body)
    console.log(req.params.id)
    console.log(req.body.content)
        if(!req.body.nombre) {
            return res.status(400).send({
                message: "Categoria content can not be empty"
            });
        }
    
        // Find note and update it with the request body
        Categoria.findByIdAndUpdate(req.params.id, {
            nombre: req.body.nombre,
        }, {new: true})
        .then(categoria => {
            if(!categoria) {
                return res.status(404).send({
                    message: "categoria not found with id " + req.params.id
                });
            }
            res.send(categoria);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "categoria not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating categoria with id " + req.params.id
            });
        });
    };


exports.proyectosPorCategoria = (req, res) =>{
    Proyecto.find({categoria:req.params.idcategoria})
    .then(proyectos=>{

        if(!proyectos){
            return res.send({message:'No se encontraron proyectos en la categoria con id: '+req.params.idcategoria})
        }
        res.send(proyectos)
    })

}
    




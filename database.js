const mongoose = require('mongoose')


//database setup
 const conexion = mongoose.connect(process.env.MONGODB_URI)
.then(db=> console.log('Conexión con MongoDB Atlas'))
.catch(error=>console.error(error))

module.exports = conexion;
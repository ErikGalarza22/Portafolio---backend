const express = require('express')
const morgan = require('morgan')
const cors = require('cors')//CROOS
const cloudinary = require("cloudinary");

//conexion a la bd
require('dotenv').config()//para usar variables de entorno
const app = express()//instancia de un server
const {conexion} = require('./database')

//middlewares

app.use(morgan('dev'))//ver estado de request
app.use(express.json())//la data llega en json
app.use(cors())//permite req y res entre front-back


//Routes setup
//http://localhost:5000/api/perfil/listar
//localhost:3000/ ->index
app.use('/api/categoria',require('./routes/categoria'))
app.use('/api/proyecto',require('./routes/proyecto'))
app.use('/api/perfil',require('./routes/perfil'))
app.use('/api/usuario',require('./routes/usuario'))
app.use('/api/tecnologia',require('./routes/tecnologia')
)
// app.get('/',(req,res)=>{ //escucha la ruta
//     res.send('hola desde proyect mern');
// })

const port = process.env.PORT || 5000
//se define el puerto en el que se escuchara
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(port, ()=>{
    console.log(`Server escuchando en el puerto ${port}`)
})




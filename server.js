import express from 'express';
import router from './routers/products.js';
import config from './config.js';
import DB from './models/products-mongodb.js'

DB.connectDB();

const PORT = config.PORT;
const app = express()

app.use(express.json()) // se habilita el middleware para recibir datos en formato JSON en las solicitudes POST
app.use(express.urlencoded({extended: true})) // se habilita el middleware para que pueda recibir datos en formato URL en las solicitudes POST

app.use('/api/products', router)

const server = app.listen(PORT, () => console.log(`Servidor express escuchando el puerto ${PORT}`));
server.on('error', error => console.log(`Se produjo un error al intentar iniciar el servidor Express ${error.message}`));

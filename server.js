const express = require('express');
const app = express();
require('dotenv').config();
const coneccion = require('./db/conexion')
const cors = require('cors');
const { corsOption } = require('./middlewares/cors.midlewares');

const rutasUsuario = require('./routes/usuarios.routes.js')
const rutasPresupuesto = require('./routes/presupuestos.routes.js')



app.use(express.json());
app.use(express.urlencoded({ extended : true }))
//app.use(cors(corsOption));

async function inicioServidor () {
    try {
        await coneccion.sequelize.authenticate();
        console.log('Coneccion establecida correctamente.');
        app.listen(process.env.PORT, () => {
            console.log(`Sistema inicado en htpp://${process.env.HOST}:${process.env.PORT}`)
        })
    } catch (error) {
        console.error('No se pudo conectar a la base o al servidor: ',error)
    }
}

inicioServidor();
rutasUsuario(app);
rutasPresupuesto(app);
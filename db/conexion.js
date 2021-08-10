const Sequelize = require('sequelize');

const modeloUsuario = require('../models/usuario.model')
const modeloPresupuesto = require('../models/presupuesto.model')
const modeloIdPpto = require('../models/idppto.model')
const modeloPresupuestoExt = require('../models/presupuestoext.model')

const sequelize = new Sequelize(process.env.DB_NOMBRE,process.env.DB_USER,process.env.DB_PASS,{
    dialect: 'mysql',
    server: process.env.DB_HOST,
    port: process.env.DB_PORT
})

const Usuario = modeloUsuario(sequelize,Sequelize);
const Presupuesto = modeloPresupuesto(sequelize,Sequelize)
const idPpto = modeloIdPpto(sequelize,Sequelize)
const PresupuestoExt = modeloPresupuestoExt(sequelize,Sequelize)

sequelize.sync({ force:false })
    .then( () => {
        console.log('Tablas sincronizadas con modelos.')
    })
module.exports = {
    sequelize,
    Usuario,
    Presupuesto,
    idPpto,
    PresupuestoExt
}

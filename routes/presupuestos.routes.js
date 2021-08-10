const serviciosPresupuesto = require('../services/presupuestos.services.js')
const serviciosToken = require('../services/jwt.services')
const middJWT = require('../middlewares/jwt.middlewares')
const serviciosUsuario = require('../services/usuarios.services')
const { Usuario } = require('../db/conexion.js')

module.exports = async (app) => {

    app.get('/mispresupuestos', async (req,res) => {
        usuario = req.body
        try {
            const idUsuario = await serviciosUsuario.obtenerIdUsuario(usuario)
            const listaPresupuestos = await serviciosPresupuesto.misPresupuestos(idUsuario)
            res.status(200).json(listaPresupuestos)
        } catch (error) {
            console.log(error)
            res.status(400).json({message : 'Hubo un error al obtener sus presupuestos.'})
        }
    })

     app.get('/desglocetotal', async (req,res) => {
         presupuesto = req.body
         try {
             const idPresupuesto = await serviciosPresupuesto.obtenerIdPresupuesto(presupuesto)
             //console.log(idPresupuesto[0].dataValues)
             const desgloseTotal = await serviciosPresupuesto.obtenerDesgloseTotal(idPresupuesto[0].dataValues)
             res.status(200).json(desgloseTotal)
         } catch (error) {
             console.log(error)
             res.status(400).json({message: 'hubo un error al obtener le desgloce.'})
         }
     })

     app.get('/desglocemensual',async (req,res) => {
         presupuesto = req.body
         try {
            const idPresupuesto = await serviciosPresupuesto.obtenerIdPresupuesto(presupuesto)
            presupuesto.id = idPresupuesto[0].dataValues.id_presupuesto
            const desgloseMensual = await serviciosPresupuesto.obtenerDesgloseMensual(presupuesto)
            res.status(200).json(desgloseMensual)
         } catch (error) {
            console.log(error)
            res.status(400).json({message: 'hubo un error al obtener le desgloce.'})
         }
     })

     app.post('/nuevopresupuesto', async (req,res) => {
         presupuesto = req.body
         try {
            await serviciosPresupuesto.crearIdPresupuesto(presupuesto)
            const idPresupuesto = await serviciosPresupuesto.obtenerIdPresupuesto(presupuesto)
            presupuesto.id = idPresupuesto[0].dataValues.id_presupuesto
            await serviciosPresupuesto.crearPresupuesto(presupuesto)
            res.status(200).json({message : 'Presupuesto creado con exito'})
         } catch (error) {
            console.log(error)
            res.status(400).json({message: 'hubo un error al crear nuevo presupuesto.'})
         }
     })

     app.post('/crearitem', async (req,res) => {
         item = req.body
         try {
             await serviciosPresupuesto.subirItem(item)
             res.status(200).json({message : 'Item creado.'})
         } catch (error) {
            console.log(error)
            res.status(400).json({mesagge : 'No fu eposible crear el item.' })
         }
     })

     app.put('/actualizaritem', async (req,res) => {
        item = req.body
        try {
            await serviciosPresupuesto.actualizarItem(item)
            res.status(200).json({message : 'Item actualizado.'})
        } catch (error) {
           console.log(error)
           res.status(400).json({mesagge : 'No fu eposible actualizar el item.' })
        }
     })
}
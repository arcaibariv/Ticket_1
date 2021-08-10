const serviciosUsuario = require('../services/usuarios.services')
const serviciosToken = require('../services/jwt.services')
const middJWT = require('../middlewares/jwt.middlewares')


module.exports = (app) => {
    app.get('/login', async (req, res) => {
        usuario = req.body
        try {
            const usuarioDB = await serviciosUsuario.obtenerUsuario(usuario)
            const token = await serviciosToken.generarToken(usuarioDB)
            res.send(token)
        } catch (error) {
            res.status(400).json({message : 'No es posible hacer login'})
        }
    })

    app.put('/cambiarcontrasena',async (req,res) => {
        usuarioActualizado = req.body
        try {
            const usuarioDB = await serviciosUsuario.obtenerUsuario(usuarioActualizado)
            await serviciosUsuario.actualizarContrasena(usuarioActualizado)
            res.status(200).json({message : 'contrasena actualizada.'})
        } catch (error) {
            console.log(error)
            res.status(400).json({mesagge : 'No fu eposible actualizar la contraseña.' })
        }
    }) 
}
const { descubrirToken } = require('../services/jwt.services')

const validarToken = (req, res ,next) => {
    try {
        if(req.headers.authorization != undefined) {
            const token = req.headers.authorization.split(' ')[1]
            const validacion = descubrirToken(token)
            return next()
        } else {
            throw new Error ('Este sistema es seguro y requiere autorizacion')
        }
    } catch (error) {
        throw new Error ('Este sistema es seguro y requere autorizacion')
    }
} 

module.exports = {
    validarToken
}
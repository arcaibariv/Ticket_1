const { sequelize , Usuario } = require('../db/conexion')

const obtenerUsuario = async (user) => {
    try {
        const usuarioDB = await Usuario.findOne({
            attributes : ['id_usuario','usuario','contrasena','correo'],
            where : {
                usuario : user.usuario
            }
        })
        if (!usuarioDB) {
            throw new Error ({ message : 'Usuario o contraseña invalidos.' })
        }
        //console.log(usuarioDB.dataValues)
        return usuarioDB
    } catch (error) {
        throw new Error ({mesagge : 'Error al conectar la base de datos'})
    }
}

const actualizarContrasena = async (user) => {
    try {
        console.log(user)
        await sequelize.query(`UPDATE usuarios SET contrasena = '${user.nuevacontrasena}' WHERE usuario = '${user.usuario}'`,
        {type :sequelize.QueryTypes.UPDATE })


        console.log(user.contrasenanueva)
    } catch (error) {
        throw new Error('No fue posible actualizar la contraseña: ', error)
    }
}

const obtenerIdUsuario = async (user) => {
    try {
        const usuarioDB = await Usuario.findOne({
            attributes : ['id_usuario'],
            where : {
                usuario : user.usuario
            }
        })
        return usuarioDB
    } catch (error) {
        throw new Error('No es podible obtener el id del usuario: ', error)
    }
}

module.exports = {
    obtenerUsuario,
    actualizarContrasena,
    obtenerIdUsuario
}
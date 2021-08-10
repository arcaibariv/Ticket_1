module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        id_usuario:{
            type: type.INTEGER
        },
        usuario: type.STRING,
        contrasena: type.STRING,
        correo: type.STRING
    })
}
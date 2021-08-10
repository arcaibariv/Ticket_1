module.exports = (sequelize, type) => {
    return sequelize.define('presupuesto', {
        id_preuspuesto:{
            type: type.INTEGER
        },
        id_usuario: type.INTEGER,
        nombre_presupuesto: type.STRING,
        numero_version: type.INTEGER,
        ingresos: type.DOUBLE,
        egresos: type.DOUBLE
    })
}
module.exports = (sequelize, type) => {
    return sequelize.define('presupuesto_ext', {
        id_preuspuesto:{
            type: type.INTEGER
        },
        tipo_mov: type.ENUM(['ing','egr']),
        concepto: type.STRING,
        cantidad: type.DOUBLE,
        mes: type.INTEGER
    })
}
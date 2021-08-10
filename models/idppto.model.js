module.exports = (sequelize, type) => {
    return sequelize.define('id_ppto', {
        id_presupuesto:{
            type: type.INTEGER
        },
        num_presupuesto: type.STRING
    })
}
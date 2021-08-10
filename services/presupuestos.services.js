const { sequelize , Usuario , Presupuesto , PresupuestoExt, idPpto } = require('../db/conexion')

const misPresupuestos = async (user) => {
    const listaPresupuesto = Presupuesto.findAll({
        attributes : ['id_presupuesto', 'nombre_presupuesto', 'numero_version', 'ingresos', 'egresos','actualizacion'],
        where : {
            id_usuario : user.id_usuario
        }
    })
    
    return listaPresupuesto
} 

const obtenerDesgloseTotal= async (presupuesto) => {
    const listaItems = PresupuestoExt.findAll({
        attributes : [ 'concepto' , 'tipo_mov' , 'cantidad' , 'mes' ],
        where : {
            id_presupuesto : presupuesto.id_presupuesto
        }
    })

    return listaItems
}

const obtenerIdPresupuesto = async (presupuesto) =>{
    const idPresupuesto = idPpto.findAll({
        attributes : ['id_presupuesto'],
        where : {
            num_presupuesto : presupuesto.num_presupuesto
        }
    })
    return idPresupuesto
}

const obtenerDesgloseMensual = async (presupuesto) => {
    const listaItems = PresupuestoExt.findAll({
        attributes : [ 'concepto' , 'tipo_mov' , 'cantidad' , 'mes' ],
        where : {
            id_presupuesto : presupuesto.id,
            mes : presupuesto.mes
        }
    })

    return listaItems
}

const crearIdPresupuesto = async (presupuesto) => {
    await sequelize.query(`INSERT INTO id_pptos (num_presupuesto) VALUES ('${presupuesto.num_presupuesto}')`,
    {type :sequelize.QueryTypes.INSERT})
}

const crearPresupuesto = async (presupuesto) => {
    await sequelize.query(`INSERT INTO presupuestos (id_presupuesto,id_usuario,nombre_presupuesto,numero_version,ingresos,egresos) VALUES (${presupuesto.id},'${presupuesto.id_usuario}','${presupuesto.nombre}',1,0,0)`,
    {type :sequelize.QueryTypes.INSERT})
}

const subirItem = async (item) => {
    await sequelize.query(`INSERT INTO presupuesto_exts (id_presupuesto,tipo_mov,concepto,cantidad,mes) VALUES (${item.idpresupuesto}, '${item.tipomov}' , '${item.concepto}' , ${item.cantidad}, ${item.mes} )`,
    {type: sequelize.QueryTypes.INSERT})
    if (item.tipomov == 'ing') {
        await sequelize.query(`UPDATE presupuestos SET ingresos = ingresos + ${item.cantidad} WHERE id_presupuesto = ${item.idpresupuesto}`,
        {type: sequelize.QueryTypes.UPDATE})
    } else {
        await sequelize.query(`UPDATE presupuestos SET egresos = egresos + ${item.cantidad} WHERE id_presupuesto = ${item.idpresupuesto}`,
        {type: sequelize.QueryTypes.UPDATE})
    }
}

const actualizarItem = async (item) => {
    if (item.tipomov == 'ing') {
        await sequelize.query(`UPDATE presupuestos SET ingresos = SUM(SELECT cantidad FROM presupuesto_exts AS pp WHERE pp.id_presupuesto = ${item.idpresupuesto} AND pp.tipo_mov = 'ing') WHERE id_presupuesto = ${item.idpresupuesto}`,
        {type: sequelize.QueryTypes.UPDATE})
    } else {
        await sequelize.query(`UPDATE presupuestos SET egresos = SUM(SELECT cantidad FROM presupuesto_exts AS pp WHERE pp.id_presupuesto = ${item.idpresupuesto} AND pp.tipo_mov = 'egr') WHERE id_presupuesto = ${item.idpresupuesto}`,
        {type: sequelize.QueryTypes.UPDATE})
    }
    
    if (item.concepto != undefined){
        await sequelize.query(`UPDATE presupuesto_exts SET concepto = ${item.concepto}  WHERE id_presupuesto = ${item.idpresupuesto}`,
        {type: sequelize.QueryTypes.UPDATE})
    }

    if (item.cantidad != undefined){
        await sequelize.query(`UPDATE presupuesto_exts SET cantidad = ${item.cantidad}  WHERE id_presupuesto = ${item.idpresupuesto}`,
        {type: sequelize.QueryTypes.UPDATE})
    }
}

module.exports = {
    misPresupuestos,
    obtenerDesgloseTotal,
    obtenerIdPresupuesto,
    obtenerDesgloseMensual,
    crearIdPresupuesto,
    crearPresupuesto,
    subirItem,
    actualizarItem
}
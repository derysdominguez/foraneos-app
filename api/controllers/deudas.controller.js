const Deuda = require("../models/Deuda.js");

module.exports.getDeudas = async (req, res) => {
    try {
        const deudas = await Deuda.findAll({
            attributes : ['id', 'acreedor', 'cuota', 'monto_total', 'tasa', 'fecha_adquirida', 'fecha_finalizacion']
        });
        res.json(deudas);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
};

module.exports.createDeuda = async (req, res) => {
    try {
        const {acreedor, cuota, monto_total, fecha_adquirida, fecha_finalizacion, tasa} = req.body;
        const deuda = await Deuda.create({
            acreedor,
            cuota,
            monto_total,
            fecha_adquirida,
            fecha_finalizacion,
            tasa
        });
        res.status(201).json(deuda);
    } catch (error)  {
        return res.status(500).json({message : error.stack});
    }
};

module.exports.updateDeuda = async (req, res) => {
    try {
        const {id} = req.params;
        const {acreedor, cuota, monto_total, fecha_adquirida, fecha_finalizacion, tasa} = req.body;
        const deuda = await Deuda.findByPk(id);
        deuda.acreedor = acreedor;
        deuda.cuota = cuota;
        deuda.monto_total = monto_total;
        deuda.fecha_adquirida = fecha_adquirida;
        deuda.fecha_finalizacion = fecha_finalizacion;
        deuda.tasa = tasa;
        await deuda.save();
        res.json(deuda);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
};

module.exports.deleteDeuda = async (req, res) => {
    try {
        const {id} = req.params;
        await Deuda.destroy({
            where : {
                id : id
            }
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
};
const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje: "Se registro nuevo pedido"})
    }catch (e) {
        console.log(e);
        next();
    }
};

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({})
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            });
        res.json(pedidos);
    }catch (e) {
        console.log(e);
        next();
    }
};

exports.mostrarPedido = async (req, res, next) => {
    try {
        const pedidoDB = await Pedidos.findById(req.params.idPedido)
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            });
        if(!pedidoDB){
            res.json({mensaje: 'Pedido no existe'});
            next();
        }
        res.json(pedidoDB);
    }catch (e) {
        console.log(e);
        next();
    }
};

exports.actualizarPedido = async (req, res, next) => {
    try {
        const pedidoDB = await Pedidos.findById(req.params.idPedido);
        if(!pedidoDB){
            res.json({mensaje: 'Pedido no existe'});
            next();
        }
        const pedidoUpdate = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido}, req.body, {new: true})
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            });

        res.json(pedidoUpdate);
    }catch (e) {
        console.log(e);
        next();
    }
};

exports.eliminarPedido= async (req, res, next) => {
    try {
        const productoDB = await Pedidos.findById(req.params.idPedido);
        if(!productoDB){
            res.json({mensaje: 'Pedido no existe'});
            next();
        }
        await Pedidos.findOneAndDelete({_id: req.params.idPedido});
        res.json({mensaje: 'El Pedido se ha eliminado'});
    }catch (e) {
        console.log(e);
        next();
    }
};

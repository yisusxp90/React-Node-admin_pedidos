const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);
  try {
      await cliente.save();
      res.json({mensaje: "Se registro nuevo cliente"})
  }catch (e) {
      res.send(e);
      next();
  }
};

exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    }catch (e) {
        res.send(e);
        next();
    }
};

exports.mostrarCliente = async (req, res, next) => {
    try {
        const clienteDB = await Clientes.findById(req.params.idCliente);
        if(!clienteDB){
          res.json({mensaje: 'Cliente no existe'});
          next();
        }
        res.json(clienteDB);
    }catch (e) {
        res.send(e);
        next();
    }
};

exports.actualizarCliente = async (req, res, next) => {
    try {
        const clienteDB = await Clientes.findById(req.params.idCliente);
        if(!clienteDB){
            res.json({mensaje: 'Cliente no existe'});
            next();
        }
        const clienteUpdate = await Clientes.findOneAndUpdate({ _id: req.params.idCliente}, req.body, {new: true});

        res.json(clienteUpdate);
    }catch (e) {
        res.send(e);
        next();
    }
};

exports.eliminarCliente = async (req, res, next) => {
    try {
        const clienteDB = await Clientes.findById(req.params.idCliente);
        if(!clienteDB){
            res.json({mensaje: 'Cliente no existe'});
            next();
        }
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'El Cliente se ha eliminado'});
    }catch (e) {
        res.send(e);
        next();
    }
};

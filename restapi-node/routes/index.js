const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidosController');
const usuarioController = require('../controllers/usuarioController');

const auth = require('../middleware/auth');

module.exports = function () {

    // clientes
    router.post('/clientes', clienteController.nuevoCliente);

    router.get('/clientes',
        auth,
        clienteController.mostrarClientes
    );

    router.get('/clientes/:idCliente',
        auth,
        clienteController.mostrarCliente);

    router.put('/clientes/:idCliente',
        auth,
        clienteController.actualizarCliente);

    router.delete('/clientes/:idCliente',
        auth,
        clienteController.eliminarCliente);

    // productos
    router.post('/productos',
        auth,
        productoController.subirArchivo,
        productoController.nuevoProducto);

    router.get('/productos',
        auth,
        productoController.mostrarProductos);

    router.get('/productos/:idProducto',
        auth,
        productoController.mostrarProducto);

    router.put('/productos/:idProducto',
        auth,
        productoController.actualizarProducto);

    router.delete('/productos/:idProducto',
        auth,
        productoController.eliminarProducto);

    router.post('/productos/busqueda/:filtro',
        auth,
        productoController.buscarProducto);

    // pedidos
    router.post('/pedidos/nuevo/:idUsuario',
        auth,
        pedidoController.nuevoPedido);

    router.get('/pedidos',
        auth,
        pedidoController.mostrarPedidos);

    router.get('/pedidos/:idPedido',
        auth,
        pedidoController.mostrarPedido);

    router.put('/pedidos/:idPedido',
        auth,
        pedidoController.actualizarPedido);

    router.delete('/pedidos/:idPedido', pedidoController.eliminarPedido);

    // usuarios

    router.post('/crear-cuenta',
        auth,
        usuarioController.registrarUsuario);

    router.post('/iniciar-sesion', usuarioController.autenticarUsuario);

    return router;
};
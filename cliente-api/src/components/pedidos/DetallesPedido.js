import React from 'react';

const DetallesPedido = ({pedido}) => {

    const {cliente} = pedido;

    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {pedido._id}</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {pedido.pedido.map(productos => (
                            <li key={pedido._id+productos.producto._id}>
                                <p>Nombre Producto: {productos.producto.nombre}</p>
                                <p>Precio Producto: {productos.producto.precio}</p>
                                <p>Cantidad: {productos.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="total">Total: {pedido.total}</p>
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    );
};

export default DetallesPedido;

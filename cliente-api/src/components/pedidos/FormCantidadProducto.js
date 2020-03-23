import React from "react";
const FormCantidadPRoducto = (props) => {

    const {producto, restarProducto, aumentarProducto, index, eliminarProducto} = props;
    const {_id, nombre, precio, cantidad} = producto;
    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus"
                       onClick={() => restarProducto(index)}
                    ></i>
                    <p>{cantidad}</p>
                    <i className="fas fa-plus"
                       onClick={() => aumentarProducto(index)}
                    ></i>
                </div>
                <button onClick={() => eliminarProducto(_id)} type="button" className="btn btn-rojo">
                    <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
};

export default FormCantidadPRoducto;

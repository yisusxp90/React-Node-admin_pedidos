import React from 'react';
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {Link} from "react-router-dom";

const Producto = ({producto}) => {

    // extraer valores
    const {_id, nombre, precio, imagen} = producto;

    const eliminarProducto = (id) => {
        Swal.fire({
            title: `esta seguro?`,
            text: "El Producto eleminado no se podra recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/productos/${id}`).then(resp => {
                    Swal.fire(
                        'Deleted!',
                        resp.data.mensaje,
                        'success'
                    )
                });
            }
        })
    };

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
                {
                    imagen
                    ? (<img src={`http://localhost:5000/${imagen}`} alt="imagen" />)
                    : null
                }
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button type="button"
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarProducto(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
};

export default Producto;
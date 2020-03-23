import React from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const Cliente = ({cliente}) => {

    // extraer valores
    const {_id, nombre, apellido, empresa, email, telefono} = cliente;

    const eliminarCliente = (id) => {
        Swal.fire({
            title: `esta seguro?`,
            text: "Cliente eleminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/clientes/${id}`).then(resp => {
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
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>

                <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-plus"></i>
                    Nuevo Pedido
                </Link>

                <button type="button"
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarCliente(_id)}> {/* se coloca como arrowfunction para que se ejecute solamente si se le hace click */}
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
}

export default Cliente;
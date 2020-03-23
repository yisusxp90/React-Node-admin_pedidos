import React, {Fragment, useContext, useState} from 'react';
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';
import {CRMContext} from "../context/CRMContext";

const NuevoCliente = (props) => {

    // utilizar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // const [error, guardarError] = useState('');

    // leer datos del formulario
    const handleChange = e => {
        guardarCliente({
            ...cliente,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await clienteAxios.post('clientes', cliente).then( resp => {
            if(resp.data.code === 11000){
                Swal.fire('Error al registrar cliente', `Hubo un error`, 'error');
            }else{
                Swal.fire(`${resp.data.mensaje}`, `cliente: ${cliente.nombre} a sido creado exitosamente.`, 'success');
                // redireccionar, se usa el withRouter
                props.history.push('/');
            }
        });

    };

    const validarCliente = () => {
        const {nombre, apellido, empresa, email, telefono} = cliente;

        return nombre.trim() === '' || apellido.trim() === '' || empresa.trim() === '' || email.trim() === '' || telefono.trim() === '';
    };

    // verificar si el usuario esta autenticado
    if(!auth.auth) {
        props.history.push('/iniciar-sesion');
    }

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form onSubmit={handleSubmit}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                           placeholder="Nombre Cliente"
                           name="nombre"
                           onChange={handleChange}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                           placeholder="Apellido Cliente"
                           name="apellido"
                           onChange={handleChange}/>
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                           placeholder="Empresa Cliente"
                           name="empresa"
                           onChange={handleChange}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                           placeholder="Email Cliente"
                           name="email"
                           onChange={handleChange}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text"
                           placeholder="Teléfono Cliente"
                           name="telefono"
                           onChange={handleChange}/>
                </div>

                <div className="enviar">
                    <input type="submit"
                           className="btn btn-azul"
                           value="Agregar Cliente"
                           disabled={validarCliente()}/>
                    {/*el () es para q se ejecute apenas el componente carga*/}
                </div>

            </form>

        </Fragment>
    );
};

// HDC es una funcion q toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);
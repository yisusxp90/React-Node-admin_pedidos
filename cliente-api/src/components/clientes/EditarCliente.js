import React, {Fragment, useEffect, useState} from 'react';
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';


const EditarCliente = (props) => {

    // obtener id del cliente
    const { id } = props.match.params;

    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const consultarAPI = async () => {
        const clienteConsulta = await  clienteAxios.get(`/clientes/${id}`);
        datosCliente(clienteConsulta.data);
    };

    //useEffect
    useEffect( () => {
        consultarAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const [error, guardarError] = useState('');

    // leer datos del formulario
    const handleChange = e => {
        datosCliente({
            ...cliente,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await clienteAxios.put(`clientes/${id}`, cliente).then( resp => {
            if(resp.data.code === 11000){
                Swal.fire('Error al Editar cliente', `Hubo un error`, 'error');
            }else{
                Swal.fire(`Cliente actualizado`, `cliente: ${cliente.nombre} a sido actualizado exitosamente.`, 'success');
                // redireccionar, se usa el withRouter
                props.history.push('/');
            }
        });

    };

    const validarCliente = () => {
        const {nombre, apellido, empresa, email, telefono} = cliente;

        return nombre.trim() === '' || apellido.trim() === '' || empresa.trim() === '' || email.trim() === '' || telefono.trim() === '';
    };

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                           placeholder="Nombre Cliente"
                           name="nombre"
                           onChange={handleChange}
                           value={cliente.nombre}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                           placeholder="Apellido Cliente"
                           name="apellido"
                           onChange={handleChange}
                           value={cliente.apellido}/>
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                           placeholder="Empresa Cliente"
                           name="empresa"
                           onChange={handleChange}
                           value={cliente.empresa}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                           placeholder="Email Cliente"
                           name="email"
                           onChange={handleChange}
                           value={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text"
                           placeholder="Teléfono Cliente"
                           name="telefono"
                           onChange={handleChange}
                           value={cliente.telefono}/>
                </div>

                <div className="enviar">
                    <input type="submit"
                           className="btn btn-azul"
                           value="Guardar cambios"
                           disabled={validarCliente()}/>
                    {/*el () es para q se ejecute apenas el componente carga*/}
                </div>

            </form>

        </Fragment>
    );
};

// HDC es una funcion q toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);
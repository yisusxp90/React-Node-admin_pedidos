import React, {Fragment, useState} from 'react';
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import {withRouter} from "react-router-dom";

const NuevoProducto = (props) => {

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });

    const [archivo, guardarArchivo] = useState('');

    // leer datos del formulario
    const handleChange = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    };

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        try {
            await clienteAxios.post('/productos', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then( resp => {
                console.log(resp);
                Swal.fire(`${resp.data.mensaje}`, `producto: ${producto.nombre} a sido creado exitosamente.`, 'success');
                props.history.push('/productos');
            });
        }catch (e) {
            console.log(e);
            Swal.fire('Error al registrar Producto', `Hubo un error`, 'error');
        }

    };

    const validarProducto = () => {
        const {nombre, precio} = producto;

        return nombre.trim() === '' || precio.trim() === '' || archivo === '';
    };

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                           placeholder="Nombre Producto"
                           name="nombre"
                           onChange={handleChange}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number"
                           name="precio"
                           min="0.00"
                           step="0.01"
                           placeholder="Precio"
                           onChange={handleChange}/>
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"
                           name="imagen"
                           onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                    <input type="submit"
                           className="btn btn-azul"
                           value="Agregar Producto"
                           disabled={validarProducto()}/>
                </div>
            </form>
        </Fragment>
    );
};

export default withRouter(NuevoProducto);
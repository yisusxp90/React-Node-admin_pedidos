import React, {Fragment, useEffect, useState} from 'react';
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';

const EditarProducto = (props) => {

    // obtener id del cliente
    const { id } = props.match.params;

    const [producto, datosProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    const [archivo, guardarArchivo] = useState('');

    useEffect( () => {

        const consultarAPI = async () => {
            const productoConsulta = await  clienteAxios.get(`/productos/${id}`);
            datosProducto(productoConsulta.data);
            console.log(productoConsulta.data);
        };

        consultarAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // leer datos del formulario
    const handleChange = e => {
        datosProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    };

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    };

    const {nombre, precio, imagen} = producto;

    const validarProducto = () => {
        return !nombre || !precio;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        try {
            await clienteAxios.put(`/productos/${id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then( resp => {
                console.log(resp);
                Swal.fire(`Producto Actualizado`, `producto: ${producto.nombre} a sido actualizado exitosamente.`, 'success');
                props.history.push('/productos');
            });
        }catch (e) {
            console.log(e);
            Swal.fire('Error al actualizar Producto', `Hubo un error`, 'error');
        }

    };

    return (
        <Fragment>
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                           placeholder="Nombre Producto"
                           name="nombre"
                           onChange={handleChange}
                           defaultValue={nombre}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number"
                           name="precio"
                           min="0.00"
                           step="0.01"
                           placeholder="Precio"
                           onChange={handleChange}
                           defaultValue={precio}/>
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {
                        imagen ? (
                                    <img src={`http://localhost:5000/${imagen}`}
                                         alt="imagen" /> )
                                : null
                    }
                    <input type="file"
                           name="imagen"
                           onChange={leerArchivo}
                           />
                </div>

                <div className="enviar">
                    <input type="submit"
                           className="btn btn-azul"
                           value="Editar Producto"
                           disabled={validarProducto()}/>
                </div>
            </form>
        </Fragment>
    );
};

export default withRouter(EditarProducto);
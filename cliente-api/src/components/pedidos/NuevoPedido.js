import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import Swal from "sweetalert2";
import FormCantidadPRoducto from "./FormCantidadProducto";
import { withRouter } from 'react-router-dom';

const NuevoPedido = (props) => {

    // obtener id del cliente
    const { id } = props.match.params;

    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const [busqueda, guardarBusqueda] = useState('');

    const [productos, guardarProductos] = useState([]);

    const [total, guardarTotal] = useState(0);

    useEffect(() => {
        consultarAPI();

        actualizarTotal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productos]);

    const consultarAPI = async () => {
        const clienteConsulta = await  clienteAxios.get(`/clientes/${id}`);
        datosCliente(clienteConsulta.data);
    };

    const {nombre, apellido, empresa, telefono} = cliente;

    const buscarProducto = async (e) => {
        e.preventDefault();

        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
        // si no hay resultados
        if(resultadoBusqueda.data[0]){
            let productoResultado = resultadoBusqueda.data[0];
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;
            guardarProductos([...productos, productoResultado]);
        }else {
            Swal.fire('Sin resultados', `No hay resultados para esta busqueda`, 'error');
        }
    };

    const leerDatosBusqueda = (e) => {
        guardarBusqueda(e.target.value);
    };

    const restarProducto = (index) => {
        const todosProductos = [...productos];
        if(todosProductos[index].cantidad === 0) return;
        todosProductos[index].cantidad--;
        // almacenar en el state
        guardarProductos(todosProductos);
    };
    const aumentarProducto = (index) => {
        const todosProductos = [...productos];
        todosProductos[index].cantidad++;
        // almacenar en el state
        guardarProductos(todosProductos);
    };

    const actualizarTotal = () => {
        if(productos.length === 0) {
            guardarTotal(0);
            return;
        }

        let nuevoTotal = 0;
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));
        guardarTotal(nuevoTotal);
    };

    const eliminarProducto = (idProducto) => {
        console.log('entro')
        const todosProductos = productos.filter(producto => {
            console.log(producto);
            return producto._id !== idProducto
        });
        guardarProductos(todosProductos);
    };

    const realizarPedido = async (e) => {

        e.preventDefault();
        // construir el objeto
        /*{
            "cliente": "5e68f64f0ba27470a03bc2dd",
            "pedido": [
                { "producto": "5e68e691bf9b3f1cec606af5", "cantidad": 1 },
                { "producto": "5e68e679bf9b3f1cec606af4", "cantidad": 1 }
            ],
            "total": "7000"
          }*/
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        };
        console.log(pedido);

        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        if(resultado.status === 200){
            Swal.fire('Pedido realizado.', `${resultado.data.mensaje}`, 'success');
            props.history.push('/pedidos');
        } else {
            Swal.fire('Error', `Hubo un Error, intentelo de nuevo`, 'error');
        }
    };

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {nombre} {apellido}</p>
                <p>Empresa: {empresa}</p>
                <p>Telefono: {telefono}</p>
            </div>

            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadPRoducto
                        key={producto.producto}
                        producto={producto}
                        index={index}
                        restarProducto={restarProducto}
                        aumentarProducto={aumentarProducto}
                        eliminarProducto={eliminarProducto}
                    />
                ))}
            </ul>

            <p className="total">Total a pagar: <span>$ {total}</span></p>

            {
                total > 0
                ? (
                        <form onSubmit={realizarPedido}>
                            <input type="submit"
                                   className="btn btn-verde btn-block"
                                   value="Realizar Pedido"/>
                        </form>
                 ) : null
            }
        </Fragment>
    );
};

export default withRouter(NuevoPedido);
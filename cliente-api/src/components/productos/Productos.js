import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from "./Producto";
import Spinner from "../layout/Spinner";
import {CRMContext} from "../context/CRMContext";
import { withRouter } from 'react-router-dom';

const Productos = (props) => {

    // utilizar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const [productos, guardarProductos] = useState([]);

    const consultarAPI = async () => {

        try {
            const productosConsulta = await  clienteAxios.get('/productos', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarProductos(productosConsulta.data);
        }catch (e) {
            // error con autorizcion
            if(e.response.status === 500){
                props.history.push('/iniciar-sesion');
            }
        }
    };

    //useEffect
    useEffect( () => {
        if(auth.token !== ''){
            consultarAPI();
        }else {
            props.history.push('/iniciar-sesion');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productos]);
    // si los productos cambia ejecutar el useEffect, ejemplo: eliminar productos elimina de la lista de productos

    if(!productos.length) return <Spinner/>;

    return (
        <Fragment>
            <h2>Productos</h2>

            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fa fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map( producto => (
                    <Producto
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default withRouter(Productos);
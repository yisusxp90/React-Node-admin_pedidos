import React, {Fragment, useState, useEffect, useContext} from 'react';
import clienteAxios from "../../config/axios";
import DetallesPedido from "./DetallesPedido";
import {CRMContext} from "../context/CRMContext";
import { withRouter } from 'react-router-dom';

const Pedidos = (props) => {

    // utilizar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const [pedidos, guardarPedidos] = useState([]);

    useEffect(() => {
        if(auth.token !== ''){
            consultarAPI();
        }else {
            props.history.push('/iniciar-sesion');
        }
    }, []);

    const consultarAPI = async () => {
        try {
            const pedidosConsulta = await  clienteAxios.get('/pedidos', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarPedidos(pedidosConsulta.data);
        }catch (e) {
            // error con autorizcion
            if(e.response.status === 500){
                props.history.push('/iniciar-sesion');
            }
        }
    };
    return (
        <Fragment>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {pedidos.map((pedido) => (
                    <DetallesPedido
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default withRouter(Pedidos);
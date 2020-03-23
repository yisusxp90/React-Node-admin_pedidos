import React, {Fragment, useEffect, useState, useContext} from 'react';
import clienteAxios from '../../config/axios';
import Cliente from "./Cliente";
import { Link } from 'react-router-dom';
import Spinner from "../layout/Spinner";
import {CRMContext} from "../context/CRMContext";
import { withRouter } from 'react-router-dom';

const Clientes = (props) => {

    const [clientes, guardarClientes] = useState([]);

    // utilizar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const consultarAPI = async () => {

        try {
            const clientesConsulta = await  clienteAxios.get('/clientes', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarClientes(clientesConsulta.data);
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
    }, [clientes]);
    // si el cliente cambia ejecutar el useEffect, ejemplo: eliminar clientes elimina de la lista de clientes

    // si el state esta como false
    if (!auth.auth) props.history.push('/iniciar-sesion');

    if(!clientes.length) return <Spinner/>;

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fa fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map( cliente => (
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default withRouter(Clientes);
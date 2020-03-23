import React, {useState, useContext} from 'react';
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { withRouter } from 'react-router-dom';
import {CRMContext} from "../context/CRMContext";

const Login = (props) => {

    const [auth, guardarAuth] = useContext(CRMContext);

    const [datosLogin, guardarDatosLogin] = useState({});
    const leerDatos = (e) => {
        guardarDatosLogin({
            ...datosLogin,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', datosLogin);
            // gt token y coocar en localStorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // guardar en el context de la aplicacion
            guardarAuth({
                token: token,
                auth: true
            });
            Swal.fire('Login Correcto', `Ha ingresado correctamente`, 'success');
            props.history.push('/');
        }catch (e) {
            console.log(e);
            Swal.fire('Error Login', `${e.response.data.mensaje}`, 'error');
        }
    };

    return (
        <div className="login">
            <h2>Iniciar sesion</h2>

            <div className="contenedor-formulario">
                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>Email</label>
                        <input type="text"
                               name="email"
                               placeholder="Ingrese email"
                               required
                               onChange={leerDatos}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input type="password"
                               name="password"
                               placeholder="Ingrese password"
                               required
                               onChange={leerDatos}
                        />
                    </div>

                    <input type="submit"
                           value="Iniciar Sesion"
                           className="btn btn-verde btn-block"
                    />
                </form>
            </div>
        </div>
    );
};

export default withRouter(Login);
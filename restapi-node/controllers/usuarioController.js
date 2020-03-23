const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
    const usuario = new Usuarios(req.body);
    console.log(usuario);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje: 'Usuario creado exitosamente'});
    }catch (e) {
        console.log(e);
        res.json({mensaje: 'Hubo un error'});
    }
};

exports.autenticarUsuario = async (req, res, next) => {
    const {email, password} = req.body;
    const usuario = await Usuarios.findOne({email});
    if(!usuario){
        await res.status(401).json({mensaje: 'Usuario no existe'});
    }else{
        // verificar si password es correcto
        if(!bcrypt.compareSync(password, usuario.password)){
            await res.status(401).json({mensaje: 'Credenciales invalidas'});
            next();
        }else{
            // correcto, firmar el token
            const token = jwt.sign({email: usuario.email, nombre: usuario.nombre, id: usuario._id}, 'YISUSXP_SECRET', {expiresIn: '1h'});
            res.json({token: token});
        }
    }
};
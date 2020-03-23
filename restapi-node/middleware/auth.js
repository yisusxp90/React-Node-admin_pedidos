const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let error;
    const authHeader = req.get('Authorization');
    if(!authHeader){
        error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }
    // obtener token
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'YISUSXP_SECRET');
    }catch (e) {
        error.statusCode = 500;
        throw error;
    }

    // revisar si es valido el token y si hay algun error
    if(!revisarToken){
        error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();

};
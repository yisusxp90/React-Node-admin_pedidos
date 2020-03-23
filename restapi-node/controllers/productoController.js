const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension =  file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('formato no valido'))
        }
    }
};

const upload = multer(configuracionMulter).single('imagen');

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if(error){
            res.json({mensaje: error});
        }
        return next();
    })
};

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({mensaje: "Se registro nuevo producto"})
    }catch (e) {
        console.log(e);
        next();
    }
};

exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    }catch (e) {
        console.log(e);
        next();
    }
};

exports.mostrarProducto = async (req, res, next) => {
    try {
        const productoDB = await Productos.findById(req.params.idProducto);
        if(!productoDB){
            res.json({mensaje: 'Producto no existe'});
            next();
        }
        res.json(productoDB);
    }catch (e) {
        console.log(e);
        next();
    }
};

exports.actualizarProducto = async (req, res, next) => {
    try {
        const productoDB = await Productos.findById(req.params.idProducto);
        if(!productoDB){
            res.json({mensaje: 'Producto no existe'});
            next();
        }
        let nuevoProducto = req.body;
        // verificar si hay imagen nueva
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            nuevoProducto.imagen = productoDB.imagen;
        }
        const productoUpdate = await Productos.findOneAndUpdate({ _id: req.params.idProducto}, req.body, {new: true});

        res.json(productoUpdate);
    }catch (e) {
        console.log(e);
        next();
    }
};

exports.eliminarProducto = async (req, res, next) => {
    try {
        const productoDB = await Productos.findById(req.params.idProducto);
        if(!productoDB){
            res.json({mensaje: 'Producto no existe'});
            next();
        }
        await Productos.findOneAndDelete({_id: req.params.idProducto});
        res.json({mensaje: 'El Producto se ha eliminado'});
    }catch (e) {
        console.log(e);
        next();
    }
};


exports.buscarProducto = async (req, res, next) => {
    const filtro = req.params.filtro;
    try {
        const productoDB = await Productos.find({nombre: new RegExp(filtro, 'i')});
        res.json(productoDB);
    }catch (e) {
        console.log(e);
        next();
    }
};

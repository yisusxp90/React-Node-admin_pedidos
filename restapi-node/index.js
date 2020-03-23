const express = require('express');
const routes = require('./routes');
const conectarDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

conectarDB();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.json({extended: true}));

app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

app.listen(5000);
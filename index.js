// Importar módulos
const express = require('express')
const app = express()
const path = require('path')
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;


var corsOptions = { 
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Importar rutas
const monumentosAPI =require('./rutas/monumentos');
const eventosAPI = require('./rutas/eventos');
const favoritosAPI = require('./rutas/favoritos');
monumentosAPI(app)
eventosAPI(app)
favoritosAPI(app)

//app.use(express.static('public'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


// Iniciar servidor
var server = app.listen(PORT, () => {
    console.log(`escuchando en ${server.address().port}`)
})
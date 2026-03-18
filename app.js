const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');

const app = express();

app.use(session({secret:'mySecret', resave:false, saveUninitialized:false}));

app.use(flash());

app.use('/public', express.static(__dirname + "/public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

const port = process.env.PORT | 3000;

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));


//==============RENDERIZADO DE VISTAS EL FRONTEN

app.get('/', (req, res)=>{
    let message = req.flash('message');
    res.render('index', {
        data:message
    });
});

app.get('/altas', (req, res)=>{
    res.render('altas');
});
app.get('/cambios', (req, res) => {
    res.render('cambios');
});
app.get('/consulta', (req, res) => {
    res.render('consulta');
});

const alumno_rutas = require('./routes/alumnos_routes');

app.use('/alumnos', alumno_rutas);

app.listen(port, function(){
    console.log('ola espres ', port);
});
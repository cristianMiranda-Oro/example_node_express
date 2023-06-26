const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
//Conexion base de datos
const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/myapp';
const options = {useNewUrlParser: true,  autoIndex: true};

// Or using promises
mongoose.connect(uri, options).then(
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    () => { console.log('Conectado a DB') },
    /** handle initial connection error */
    err => { console.log(err) }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

//aplication/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname+"/views")


//rutas
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/example', function(req, res) {
  res.render("index", {titulo: "inicio EJS"});
});

app.use('/api', require('./routes/nota'));
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


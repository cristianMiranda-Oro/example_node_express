const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
//Conexion base de datos
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/myapp';
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



//rutas
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use('/api', require('./routes/nota'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


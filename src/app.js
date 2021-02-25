const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// import routes
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express');

// settings
app.set('port', process.env.PORT || 3000);  // to change when we move to REE server
// set ejs as html template
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/customers')
]);

// middlewares
app.use(morgan('dev'));  // (executes before user requests)
app.use(myConnection(mysql, {
    host: 'rewkcmdppelmo3',
    user: 'nodeuser',
    password: 'Plan.2020',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));
// manage data from form input using express.urlencoded and req.body
app.use(express.urlencoded({extended: false}));
// routes
// app.use('/', res.send('home'));
app.use('/customers', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// server listening
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
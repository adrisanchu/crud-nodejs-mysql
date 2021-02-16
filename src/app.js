const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// import routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);  // to change when we move to REE server
// set ejs as html template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));  // (executes before user requests)
app.use(myConnection(mysql, {
    host: 'rewkcmdppelmo3',
    user: 'nodeuser',
    password: 'Plan.2020',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));


// routes
app.use('/', customerRoutes);


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
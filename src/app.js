const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');

// settings
// to change when we move to REE server
app.set('port', process.env.PORT || 3000);
// set ejs as html template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
// (executes before user requests)
app.use(morgan('dev'));

// routes

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
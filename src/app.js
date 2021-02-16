const path = require('path');
const express = require('express');
const app = express();


// settings
// to change when we move to REE server
app.set('port', process.env.PORT || 3000);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
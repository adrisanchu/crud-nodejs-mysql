const mysql = require('mysql')
const { host, port, user, password, database } = require('./dbConfig.json');

// database not specified, we will be pass it later on the controllers !
const pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    port: port,
    user: user,
    password: password
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        if (err.code === 'ENOTFOUND') {
            console.error('Database not found.')
        }
    }

    if (connection) connection.release()

    return
});


module.exports = pool;
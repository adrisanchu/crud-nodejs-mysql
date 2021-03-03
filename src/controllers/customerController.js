const controller = {};
const pool = require('../database');
const schema = "crudnodejsmysql";

// add methods to the controller object
controller.list = (req, res) => {
    // get connection to server first
    pool.getConnection((err, conn) => {
        if(err) {
            // db unavailable, we send an err page !
            console.error(err);
            res.render('customers_err', {
                data: err
            });
        } else {
            // success !! set default db to use...
            conn.changeUser({database: schema}, (err) => {
                if(err) {
                    console.error('DB NOT FOUND!');
                    res.render('customers_err', {
                        data: err
                    });
                }
            });
            // Passing db params to view
            let { host, port, user } = pool.config.connectionConfig;
            // query our db
            conn.query('SELECT * FROM customer', (err, customers) => {
                if (err) {
                    res.json(err);
                    res.render('customers');
                }
                // console.log(customers);
                res.render('customers', {
                    data: customers,
                    host: host,
                    port: port,
                    user: user,
                    database: schema
                });
            });
            // release connection!
            conn.release();
        }
    });
};

controller.save = (req, res) => {
    const data = req.body;
    pool.getConnection((err, conn) => {
        if(err) {
            // db unavailable, we send an err page !
            console.error(err);
            res.render('customers_err', {
                data: err
            });
        } else {
            // success !! set default db to use...
            conn.changeUser({database: schema}, (err) => {
                if(err) {
                    console.error('DB NOT FOUND!');
                    res.render('customers_err', {
                        data: err
                    });
                }
            });
            conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
                if(err){
                    console.log('/customers: INSERT failed');
                    console.err(err);
                }
                res.redirect('/customers');
            });
            // release connection!
            conn.release();
        }
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, conn) => {
        if(err) {
            // db unavailable, we send an err page !
            console.error(err);
            res.render('customers_err', {
                data: err
            });
        } else {
            // success !! set default db to use...
            conn.changeUser({database: schema}, (err) => {
                if(err) {
                    console.error('DB NOT FOUND!');
                    res.render('customers_err', {
                        data: err
                    });
                }
            });
            conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
                if(err){
                    console.log('/customers: SELECT failed');
                    console.err(err);
                }
                res.render('customer_edit', {
                    data: customer[0]
                });
            });
            // release connection!
            conn.release();
        }
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    pool.getConnection((err, conn) => {
        if(err) {
            // db unavailable, we send an err page !
            console.error(err);
            res.render('customers_err', {
                data: err
            });
        } else {
            // success !! set default db to use...
            conn.changeUser({database: schema}, (err) => {
                if(err) {
                    console.error('DB NOT FOUND!');
                    res.render('customers_err', {
                        data: err
                    });
                }
            });
            conn.query('UPDATE customer set ? WHERE id = ?', [data, id], (err, rows) => {
                if(err){
                    console.log('/customers: UPDATE failed');
                    console.err(err);
                }
                res.redirect('/customers');
            });
            // release connection!
            conn.release();
        }
    });
};

controller.delete = (req, res) => {
    // get id from router through params
    const { id } = req.params;  // query destructuring: same as 'req.params.id'
    pool.getConnection((err, conn) => {
        if(err) {
            // db unavailable, we send an err page !
            console.error(err);
            res.render('customers_err', {
                data: err
            });
        } else {
            // success !! set default db to use...
            conn.changeUser({database: schema}, (err) => {
                if(err) {
                    console.error('DB NOT FOUND!');
                    res.render('customers_err', {
                        data: err
                    });
                }
            });
            conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
                if(err){
                    console.log('/customers: DELETE failed');
                    console.err(err);
                }
                res.redirect('/customers');
            });
            // release connection!
            conn.release();
        }
    });
};

module.exports = controller;
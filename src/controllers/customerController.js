const controller = {};
const pool = require('../database');

// add methods to the controller object
controller.list = (req, res) => {
    // console.log(res);
    pool.getConnection((err, conn) => {
        if(err) {
            // db unavailable, we send an err page !
            console.error(err);
            res.render('customers_err', {
                data: err
            });
        } else {
            // success !! Passing db params to view
            let db = pool.config.connectionConfig;
            conn.query('SELECT * FROM customer', (err, customers) => {
                if (err) {
                    res.json(err);
                    res.render('customers');
                }
                // console.log(customers);
                res.render('customers', {
                    data: customers,
                    db: db
                });
            });
        }
    });
};


/*
// add methods to the controller object
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            // console.log(customers);
            res.render('customers', {
                data: customers
            });
        });
    });
};
*/
controller.save = (req, res) => {
    const data = req.body;
    pool.getConnection((err, conn) => {
        conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
            if(err){
                console.log('/customers: INSERT failed');
                console.err(err);
            }
            res.redirect('/customers');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            if(err){
                console.log('/customers: SELECT failed');
                console.err(err);
            }
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    pool.getConnection((err, conn) => {
        if(err){
            console.log('/customers: UPDATE failed');
            console.err(err);
        }
        conn.query('UPDATE customer set ? WHERE id = ?', [data, id], (err, rows) => {
            res.redirect('/customers');
        });
    });
};

controller.delete = (req, res) => {
    // get id from router through params
    const { id } = req.params;  // query destructuring: same as 'req.params.id'
    pool.getConnection((err, conn) => {
        if(err){
            console.log('/customers: DELETE failed');
            console.err(err);
        }
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/customers');
        });
    });
};

module.exports = controller;
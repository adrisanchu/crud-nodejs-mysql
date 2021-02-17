const controller = {};

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

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    // get id from router through params
    const { id } = req.params;  // query destructuring: same as 'req.params.id'
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;
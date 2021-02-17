const controller = {};

// add methods to the controller object
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            console.log('customers');
            console.log(customers);
            res.render('customers', {
                data: customers
            });
        });
    });
};

// controller.save
// controller.delete

module.exports = controller;
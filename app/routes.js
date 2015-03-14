/**
 * Created by suzanne on 3/12/15.
 */

// ROUTES FOR OUR API
// =============================================================================
            // get an instance of the express Router
var express    = require('express');        // call express
var app        = express();
var router     = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});



// more routes for our API will happen here

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



// routes for todos happen here
router.route('/todos')

    // get all todos in the database
    .get(function(req,res) {

        //use mongoose to get all the todos
        Todo.find(function(err,todos){
            if (err)
                res.send(err)
            res.json(todos); // return all todos in JSON format
        });
    })
    // create a todo (accessed at POST http://localhost:8080/api/todos)
    .post(function(req, res) {

        Todo.create({
            text: req.body.text,
            done: false

        }, function(err,todo){
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err,todos){
                if (err)
                    res.send(err)
                res.json(todos);

            });
        });

    });

// on routes that end in /todos/:todo_id
// ----------------------------------------------------
router.route('/todos/:todo_id')
    //delete a todo (accessed at /api/todos/:todo_id
    .delete (function(req,res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err,todo){
        if (err)
            res.send(err);

        //get and return all the todos after you create another
        Todo.find(function(err,todos){
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

//=========Catalog============

router.route('/products')

    // create a product (accessed at POST http://localhost:8080/api/products)
    .post(function(req, res) {

        var product = new Product();      // create a new instance of the Product model
        product.name = req.body.name;  // set the product name (comes from the request)

        // save the product and check for errors
        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product created!' });
        });

    })

    // get all the products (accessed at GET http://localhost:8080/api/products)
    .get(function(req, res) {
        Product.find(function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });






// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/products/:product_id')

    // get the product with that id (accessed at GET http://localhost:8080/api/products/:product_id)
    .get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    })

// update the product with this id (accessed at PUT http://localhost:8080/api/products/:product_id)
    .put(function(req, res) {

        // use our product model to find the product we want
        Product.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);

            product.name = req.body.name;  // update the product info

            // save the product
            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Product updated!' });
            });

        });
    })

    // delete the product with this id (accessed at DELETE http://localhost:8080/api/products/:product_id)
    .delete(function(req, res) {
        Product.remove({
            _id: req.params.product_id
        }, function(err, product) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

//application

app.get('*', function(req,res){
    res.sendfile('./public/index.html'); //load the single view file (angular will handle the page charges on the front -end
});
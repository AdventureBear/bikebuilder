/**
 * Created by suzanne on 3/12/15.
 */
//=========Catalog============

router.route('/products')

    // create a product (accessed at POST http://localhost:8080/api/products)
    .post(function(req, res) {

        var product = new product();      // create a new instance of the Product model
        product.name = req.body.name;  // set the product name (comes from the request)

        // save the product and check for errors
        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product created!' });
        });

    })

    // get all the product (accessed at GET http://localhost:8080/api/products)
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


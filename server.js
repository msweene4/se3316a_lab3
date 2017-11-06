// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8081;        // set our port

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/user_class', { useMongoClient: true });
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

var Comms     = require('./app/models/myclass');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/SE3316')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var comm = new Comms();      // create a new instance of the Bear model
        comm.message = req.body.message;  // set the bears name (comes from the request)
        comm.timeStamp = Date.now();
        comm.CourseCode = "SE3316";

        // save the bear and check for errors
        comm.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Sent' });
        });

    })
    
    // get all the bears (accessed at GET http://localhost:8080/api/user_class)
    .get(function(req, res) {
        Comms.find(function(err, user_class) {
            if (err){
                res.send(err);
            }
            res.json(user_class);
        });
    });
    
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/SE3316/:comm_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Comms.findById(req.params.comm_id, function(err, comm) {
            if (err){
                res.send(err);
            }
            res.json(comm);
        });
    })
    
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Comms.findById(req.params.comm_id, function(err, comm) {

            if (err){
                res.send(err);
            }

            comm.message = req.body.name;  // update the bears info

            // save the bear
            comm.save(function(err) {
                if (err){
                    res.send(err);
                }

                res.json({ message: 'Updated!' });
            });

        });
    })
    
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Comms.remove({
            _id: req.params.comm_id
        }, function(err, comm) {
            if (err){
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });
    
// on routes that end in /bears
// ----------------------------------------------------
router.route('/SE3309')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var comm = new Comms();      // create a new instance of the Bear model
        comm.message = req.body.message;  // set the bears name (comes from the request)
        comm.timeStamp = Date.now();
        comm.CourseCode = "SE3309";

        // save the bear and check for errors
        comm.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Sent' });
        });

    })
    
    // get all the bears (accessed at GET http://localhost:8080/api/user_class)
    .get(function(req, res) {
        Comms.find(function(err, user_class) {
            if (err){
                res.send(err);
            }
            res.json(user_class);
        });
    });
    
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/SE3309/:comm_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Comms.findById(req.params.comm_id, function(err, comm) {
            if (err){
                res.send(err);
            }
            res.json(comm);
        });
    })
    
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Comms.findById(req.params.comm_id, function(err, comm) {

            if (err){
                res.send(err);
            }

            comm.message = req.body.name;  // update the bears info

            // save the bear
            comm.save(function(err) {
                if (err){
                    res.send(err);
                }

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Comms.remove({
            _id: req.params.comm_id
        }, function(err, comm) {
            if (err){
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
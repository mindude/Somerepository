/**
 * This handles the signing up of users
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

// The POST /signup route
router.post('/', function (req, res) {

    // The posted information from the front-end
    var body = req.body;
    // Current time this occurred
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    // Check to see if the user already exists
    // using their username
    Users.findOne({

        'username': body.username

    }, function (err, user) {

        // If there's an error, log it and return to user
        if (err) {

            // Nice log message on your end, so that you can see what happened
            console.log('Couldn\'t create new user at ' + color.red(time) + ' by ' + color.red(body.username) + ' because of: ' + err);

            // send the error
            res.status(500).json({
                'message': 'Internal server error from signing up new user. Please contact support@yourproject.com.'
            });
        }

        // If the user doesn't exist, create one
        if (!user) {
            console.log('Creating a new user at ' + color.green(time) + ' with the username: ' + color.green(body.username));

            // setup the new user
            var newUser = new Users({
                username: body.username,
                password: body.password1
            });

            // save the user to the database
            newUser.save(function (err, savedUser, numberAffected) {

                if (err) {
                    console.log('Problem saving the user ' + color.yellow(body.username) + ' due to ' + err);
                    res.status(500).json({
                        'message': 'Database error trying to sign up.  Please contact support@yourproject.com.'
                    });
                }

                // Log success and send the filtered user back
                console.log('Successfully created new user: ' + color.green(body.username));

                res.status(201).json({
                    'message': 'Successfully created new user',
                    'client': _.omit(savedUser, 'password')
                });

            });
        }

        // If the user already exists...
        if (user) {
            res.status(409).json({
                'message': body.username + ' already exists!'
            });
        }

    });

});

// export the router for usage in our server/router/index.js
module.exports = router;

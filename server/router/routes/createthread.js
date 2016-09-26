/**
 * This handles the signing up of users
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Threads = db.threads;


router.post('/', function (req, res) {

    // The posted information from the front-end
    var body = req.body;
    // Current time this occurred
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    console.log('Creating a new thread at ' + color.green(time) + ' with the title: ' + color.green(body.title));

    // setup the new user
    var newThread = new Threads({
        username: body.username,
        title: body.title,
        content: body.content
    });

    // save the user to the database
    newThread.save(function (err, savedThread, numberAffected) {

        if (err) {
            console.log('Problem posting the thread ' + color.yellow(body.title) + ' due to ' + err);
            res.status(500).json({
                'message': 'Database error trying to sign up.  Please contact support@yourproject.com.'
            });
        }

        // Log success and send the filtered user back
        console.log('Successfully created new thread: ' + color.green(body.title));

        res.status(201).json({
            'message': 'Successfully created new thread',
            'client': _.omit(savedThread)
        });

    });

});

// export the router for usage in our server/router/index.js
module.exports = router;
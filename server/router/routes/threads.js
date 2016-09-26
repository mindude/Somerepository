var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Threads = db.threads;

/* GET users listing. */
router.get('/', function(req, res, next) {
    Threads.find(function (err, data) {
        console.log(data);
        res.send(data);
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

/* GET users listing. */
router.post('/', function(req, res) {

  var body = req.body;
  console.log(body.username);

  Users.findOne({username: body.username},function (err, user) {

    console.log(user);

    if(err){res.status(500).json({
      'message': 'Database error trying to log in.  Please contact support@yourproject.com.'
    });
    }

    else if(user){
      console.log(user);
      console.log(body);
      user.comparePassword(body.password), function(err, isMatch){
        if(err) res.status(500).json({
          'message': 'Database error trying to log in.  Please contact support@yourproject.com.'
        });
          console.log(isMatch);
      }
    }
    else{
      res.send(false);
    }
  });
});

module.exports = router;

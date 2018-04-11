var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');

var driverController = require('./users/drivercontroller');
var userController = require('./users/usercontroller');
var adminController = require('./users/admincontroller');
var googleController = require('./googleController');

app.use('/drivers', driverController);
app.use('/users', userController);
app.use('/admin', adminController);
app.use(bodyParser.json()); // for parsing application/json
app.use('/google', googleController);

module.exports = app;

//require('./GoogleHandler/google');
var express = require('express');
var app = express();
var db = require('./db');

var driverController = require('./users/drivercontroller');
var userController = require('./users/usercontroller');
var adminController = require('./users/admincontroller');
app.use('/drivers', driverController);
app.use('/users', userController);
app.use('/admin', adminController);

module.exports = app;

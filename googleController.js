var express = require('express');
var router = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCUzmUT7tJTRJtZ5KpL4Y4Mr6DmaPhSt6A',
    Promise: Promise
});
var geolib = require('geolib');

var Drivers = require('./users/driver');
var Users = require('./users/user');

router.get('/distance', function(req, res) {

    var usersID = req.query.userID;
    var driversID = req.query.driverID;


    var thatLocation;
    var thisLocation;
    var origin = (function (callback) {
        Users.findById(usersID, function (err, user) {
            thisLocation = {
                "lat": (JSON.stringify(user.latitude)),
                "lng": (JSON.stringify(user.longitude))
            };
            callback(null, thisLocation);
        });
    })

    var destination = (function (callback) {
        Drivers.findById(driversID, function (err, driver) {
            thatLocation = {
                "lat": (JSON.stringify(driver.latitude)),
                "lng": (JSON.stringify(driver.longitude))
            };
            callback(null, thatLocation);
        });
    })
    origin(function (err, data) {
        thisLocation = data;
        destination(function (err, data) {
            thatLocation = data;
            googleMapsClient.distanceMatrix({
                origins: [thisLocation],
                destinations: [ thatLocation ]

            })
                .asPromise()
                .then(response => {
                    var duration = response.json.rows[0].elements[0].duration.text;
                    res.send(duration);
                })
                .catch(err => {
                    res.send('There was a problem with your function');
                    console.log(err);
                });

        });
    })
});

router.get('/proximity', function(req, res) {
    var usersID = req.query.userID;
    var proximity = req.query.proximity;
    var thisLocation;
    var thatLocation;

    var origin = (function (callback) {
        Users.findById(usersID, function (err, user) {
            thisLocation = {
                latitude: (JSON.stringify(user.latitude)),
                longitude: (JSON.stringify(user.longitude))
            };
            callback(null, thisLocation);
        });
    })


    origin(function (err, data) {
        thisLocation = data;

        Drivers.find({}, function (err, drivers) {
            if (err) {
                return res.status(500).send("There was a problem finding the driver.");
            }
            var acceptedDriver = drivers.filter(function (drivers){

            thatLocation = {
                latitude: JSON.stringify(drivers.latitude),
                longitude: JSON.stringify(drivers.longitude)
            };
            var hello = geolib.isPointInCircle(
                thisLocation,
                thatLocation,
                proximity*1000
            )
            return hello;
            });
            res.send(acceptedDriver);
        });
    });
});

module.exports = router;

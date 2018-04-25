var express = require('express');
var router = express.Router();
const http = require('http');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCUzmUT7tJTRJtZ5KpL4Y4Mr6DmaPhSt6A',
    Promise: Promise
});

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
                "lat": (JSON.stringify(user.latitude)),
                "lng": (JSON.stringify(user.longitude))
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

            let acceptedDriver =   drivers.filter(async function (driver) {
                var isAvailable =  await new Promise(function(resolve, reject){
                    thatLocation = {
                        "lat": JSON.stringify(driver.latitude),
                        "lng": JSON.stringify(driver.longitude)
                    };

                    googleMapsClient.distanceMatrix({
                        origins: [thisLocation],
                        destinations: [thatLocation]

                    }, function (err, result) {
                        let distance = result.json.rows[0].elements[0].distance.value / 1000;
                        console.log(distance);
                        let available = JSON.stringify(driver.available);
                        if (distance < proximity && available) {
                            resolve(isAvailable = true);
                        }
                        else
                           resolve(isAvailable = false);
                    });
                });
                console.log(isAvailable);
                return isAvailable;
            });
            console.log(acceptedDriver);
            res.send(acceptedDriver)
        });
    });
});

module.exports = router;

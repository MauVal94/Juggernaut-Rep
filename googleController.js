var express = require('express');
var router = express.Router();
const http = require('http');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCUzmUT7tJTRJtZ5KpL4Y4Mr6DmaPhSt6A',
    Promise: Promise
});

var Drivers = require('./users/driver');

router.get('/distance', function(req, res) {

    var users = req.query.userID;
    var drivers = req.query.driverID;
    var userRequest = ("http://localhost:3000/users/"+users);
    var driverRequest = ("http://localhost:3000/drivers/"+drivers);


    var thatLocation;
    var thisLocation;
    var origin = (function (callback){
        http.get(userRequest, (res) =>{
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                thisLocation = {
                    "lat": (JSON.parse(data).latitude),
                    "lng": (JSON.parse(data).longitude)
                };
                callback(null, thisLocation);
            })
        });
    });

    var destination = (function (callback) {
        http.get(driverRequest, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                thatLocation = {
                    "lat": (JSON.parse(data).latitude),
                    "lng": (JSON.parse(data).longitude)
                };
                callback(null, thatLocation);
            })
        });
    });
    origin(function (err, data) {
        thisLocation = data;
        destination(function (err, data) {
            thatLocation = data;
            googleMapsClient.distanceMatrix({
                    origins: [thisLocation],
                    destinations: [thatLocation]
                },
                function (response) {
                    var duration = response.json.rows[0].elements[0].duration.text;
                    var distance = response.json.rows[0].elements[0].distance.text;
                    res.send(duration + " " + distance);
                });
        });
    })
});

router.get('/proximity', function(req, res) {
    var users = req.query.userID;
    var proximity = req.query.proximity;
    var thisLocation;
    var thatLocation;
    var userRequest = ("http://localhost:3000/users/"+users);
    var driverCount;

    var origin = (function (callback) {
        http.get(userRequest, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                thisLocation = {
                    "lat": (JSON.parse(data).latitude),
                    "lng": (JSON.parse(data).longitude)
                };
                callback(null, thisLocation);
            })
        });
    });

    Drivers.count(function (err, count) {
        if (err) return res.status(500).send("There was a problem finding the driver.");
        driverCount = count;

        origin(function (err, data) {
            thisLocation = data;

            Drivers.find({}, function (err, drivers) {
                if (err) {
                    return res.status(500).send("There was a problem finding the driver.");
                }

                let acceptedDrivers = drivers.filter(function(driver){
                    thatLocation = {
                        "lat": JSON.stringify(driver.latitude),
                        "lng": JSON.stringify(driver.longitude)
                    };

                    googleMapsClient.distanceMatrix({
                        origins: [thisLocation],
                        destinations: [thatLocation]

                    }, function(response) {
                            let distance = response.json.rows[0].elements[0].distance.value / 1000;
                            console.log(distance);
                            if (distance < proximity) {
                                return driver;
                            }
                        })
                        .catch(err => {
                            res.send('There was a problem with your function');
                            console.log(err);
                        })
                });
                res.send(acceptedDrivers);
            });
        });
    });
});

module.exports = router;

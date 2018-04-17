var express = require('express');
var router = express.Router();
const http = require('http');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCUzmUT7tJTRJtZ5KpL4Y4Mr6DmaPhSt6A',
    Promise: Promise
});


router.get('/distance', function(req, res) {

    var users = req.query.id;
    var drivers = req.query.id2;
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
                destinations: [ thatLocation ]

            })
                .asPromise()
                .then(response => {
                    var duration = response.json.rows[0].elements[0].duration.text;
                    var distance = response.json.rows[0].elements[0].distance.text;
                    res.send(duration+" "+distance);
                })
                .catch(err => {
                    res.send('There was a problem with your function');
                    console.log(err);
                });

        });
        })
    });

module.exports = router;

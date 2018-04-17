var express = require('express');
var router = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCUzmUT7tJTRJtZ5KpL4Y4Mr6DmaPhSt6A',
    Promise: Promise
});

var User = require('./users/user');
var Driver = require('./users/driver');

router.get('/distance', function(req, res) {
    var startLat = 30.0;
    var startLng = -97.941394;
    var endLat = 29.883275;
    var endLng = -97.941394;

    var start = User.findById(req.query.id, function start(err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        console.log(user.name);
    })

    var end = Driver.findById(req.query.id, function end(err, driver) {
        if (err) return res.status(500).send("There was a problem finding the driver.");
        if (!driver) return res.status(404).send("No user found.");
        Driver = driver;
        console.log(Driver.name+" sdf");
    })
    console.log(endLng);
    console.log(start.name);
    console.log(end.name);

    var thisLocation = {
        "lat": startLat,
        "lng": startLng
    }
    var thatLocation = {
        "lat": endLat,
        "lng": endLng
    }
    googleMapsClient.distanceMatrix({
        origins: [ thisLocation ],
        destinations: [ thatLocation ]
    })
        .asPromise()
        .then(response => {
            // console.log('response', response.json);
            var duration = response.json.rows[0].elements[0].duration.text;
            var distance = response.json.rows[0].elements[0].distance.text;
            res.send(duration+" "+distance);
            })
        .catch(err => {
            res.send('There was a problem with your function');
            console.log(err);
            });

});

module.exports = router;

var mongoose = require('mongoose');
var DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rating: {
        type: Number,
        required: [true, 'rating field is required']
    },
    longitude: {
        type: Number,
        required: [true, 'longitude field is required']
    },
    latitude: {
        type: Number,
        required: [true, 'latitude field is required']
    },
    available: {
        type: Boolean,
        required: [true, 'rating field is required']
    }
});
mongoose.model('driver', DriverSchema);
module.exports = mongoose.model('driver');

var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    }
});
mongoose.model('admin', AdminSchema);
module.exports = mongoose.model('admin');

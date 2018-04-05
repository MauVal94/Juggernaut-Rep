var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    name: String
});
mongoose.model('admin', AdminSchema);
module.exports = mongoose.model('admin');
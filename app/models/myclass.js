var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ASchema   = new Schema({
    message: String,
    timeStamp: Date,
    CourseCode: String
});

module.exports = mongoose.model('myclass', ASchema);
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://med:med@ds155130.mlab.com:55130/andrew-todo');

module.exports = {mongoose}
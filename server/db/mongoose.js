var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://med:med@ds157740.mlab.com:57740/andrewtodo');
mongoose.connect('mongodb://localhost:27017/TodoAndrew');

module.exports = {mongoose}
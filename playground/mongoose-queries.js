
var { ObjectID } = require('mongodb');
var { mongoose } = require('./../server/db/mongoose');

var { User } = require('../server/models/user.model');


var id = "58e5271057f75252af647fc2";

if(ObjectID.isValid(id)){
    console.log(' your id is valid');
}

User.findById(id).then(
    (todo) => {
        if(!todo) return console.log('todo with the given id is not found')
        console.log('todo ',todo)
    }
).catch((err) => { console.log('error ocured, the given id is wrong')})


const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAndrew', (err, db) => {

    if (err) return console.log('error while establishing connection to the mongodb server');

    console.log('connection to the mongodb established')

    db.collection('Todo').find({text:'i have something to do'}).toArray().then((res) => {

        console.log("data is "+JSON.stringify(res,undefined,2))
    },(err) => { console.log('error occured',err)})

    //db.close();
})
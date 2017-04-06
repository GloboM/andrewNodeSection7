
//var MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectId } = require('mongodb');

// var obj = new ObjectId();
//
// console.log(obj.getTimestamp());

MongoClient.connect('mongodb://localhost:27017/TodoAndrew',(err, db) => {

    if(err){
        return console.log('unable to connect to the mongodb server',err)
    }

    console.log('connection to the mongodb succeeded');
    // db.collection('Todo').insertOne(
    //     {
    //         text:'2 i have something to do 2',
    //         completed: false
    //     },(err, result) => {
    //
    //         if(err) return console.log('error occured while trying to insert an item',err);
    //         console.log('one todo was inserted successfully: ', result.ops);
    //
    // })

    // db.collection('User').insertOne({
    //     name:'mohamed',
    //     age:'33',
    //     location:'Bruxelles'
    // }, (err,result) => {
    //     if(err) return console.log('error occured while trying to insert a user',err);
    //     console.log('user was added successfully '+JSON.stringify(result.ops))
    //
    // })



    db.close();

})
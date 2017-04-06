 var express = require('express');
 var bodyParser = require('body-parser');
 const { mongoose } = require('./db/mongoose');
 var { ObjectID } = require('mongodb');
 var {Todo} = require('./models/todo.model');
 var {User} = require('./models/user.model');

 var port = process.env.PORT || 3000

 var app = express();

 app.use(bodyParser.json());

 app.post('/todos',(req,res) => {
  var text = req.body.text;

  var newTodo = new Todo({
   text
  });

  newTodo.save().then((doc) =>{res.send(doc)},(err) => {res.status(400).send(err)})

 })


 app.get('/todos',(req,res) => {

  Todo.find().then(
      (todos) => res.send({todos}),
      (err) => res.status(400).send(err)
  )

 })


 app.get('/todo/:id', (req,res) => {

     var id= req.params.id;
     //console.log('id is ',id)

     if(ObjectID.isValid(id)){
         Todo.findById(id).then(
             (user) => {
                 if(!user) return res.send({err:'user nou found'});
                 res.send({user})
             },(err) => { res.status(400).send(); console.log('error occured when fetching user')}
         )
     }
     else {
         res.status(404).send('passed id is not valid')
     }

 })


 app.listen(port,() =>{
  console.log('app is listening on port '+port);
 })
// var newTodo = new Todo({
//     text:"i have something to do"
// })
//
// newTodo.save().then(
//     (res) =>{ console.log('todo inserted successfully',res)},
//     (err) =>{console.log('erro occured while creating the todo',err)}
//     );



// var newUser = new  User({email:'miladimed@hotmail.com'})
//
// newUser.save().then(
//     (user) => { console.log('user added success',user)},
//     (err) => { console.log('error while adding user',err)}
// )


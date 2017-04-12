 var express = require('express');
 var bodyParser = require('body-parser');
 var _ = require('lodash');
 const { mongoose } = require('./db/mongoose');
 var { ObjectID } = require('mongodb');
 var {Todo} = require('./models/todo.model');
 var {User} = require('./models/user.model');

 var { authentication } = require('./../middleware/authentication.middleware');

 var port = process.env.PORT || 3000

 var app = express();

 app.use(bodyParser.json());



 app.post('/todos',authentication,(req,res) => {
  var text = req.body.text;

  var newTodo = new Todo({
      owner:req.user._id,
      text
  });

  newTodo.save().then((doc) =>{res.send(doc)},(err) => {res.status(400).send(err)})

 })


 app.get('/todos',authentication,(req,res) => {

  Todo.find({owner:req.user._id}).then(
      (todos) => res.send({todos}),
      (err) => res.status(400).send(err)
  )

 })


 app.get('/todo/:id',authentication, (req,res) => {

     var id= req.params.id;
     //console.log('id is ',id)

     if(ObjectID.isValid(id)){
         Todo.findOne({_id:id, owner:req.user._id}).then(
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


 app.delete('/todo/:id',authentication,(req,res) => {

     var id = req.params.id;

     if(!ObjectID.isValid(id)){
         return res.status(404).send();
     }

     Todo.findOneAndRemove({_id:id,owner:req.user._id}).then(
         (todo) => {
             if(!todo){
                 return res.status(404).send()
             }
             res.status(200).send({todo})
         },(err) => { res.status(400).send()}
     )
 })


 app.patch('/todo/:id',authentication, (req,res) => {
     var id = req.params.id;
     var body = _.pick(req.body,['text','completed']);
     console.log(body)

     if(!ObjectID.isValid(id)){
        return  res.status(404).send();
     }

     if(_.isBoolean(body.completed) && body.completed){

         body.completedAt = new Date().getTime();

     }else{
         body.completed = false;
         body.completedAt = null
     }

     Todo.findOneAndUpdate({_id:id,owner:req.user._id},{$set:body},{new:true}).then(
         (todo) => {
             if(!todo) return res.status(404).send();
             res.send(todo);
         }
     ).catch((err) => res.status(400).send())
 })




 // managing users

 app.post('/users', (req,res) => {

     var body = _.pick(req.body, ['email','password']);
     var user = new User(body);

     user.save().then(
         (user) => {

             if(!user) {
                 return user.status(404).send();
             }
             //res.send(user);
             return user.generateAuthToken();
         }
     ).then((token) => {
         res.header('x-auth',token).send(user);
     } )
         .catch((err) => res.status(400).send(err))

 })

 app.post('/users/login',(req,res) => {
     var body = _.pick(req.body,['email','password']);

     User.loginUser(body).then(
         (user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth',token).send(user);
            });
         }
     )
         .catch((err) => { res.status(400).send(err)});

 })

 app.delete('/users/me/token',authentication,(req,res) => {

     var token = req.token;
     req.user.removeToken(token).then(
         () => res.status(200).send(),
         (err) => res.status(400).send()
     )
 })

 app.get('/users/me',authentication,(req,res) => {

     res.send(req.user);

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


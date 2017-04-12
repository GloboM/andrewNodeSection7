var mongoose = require('mongoose');
var validator = require('validator');
var _ = require('lodash');
var bcryptjs =  require('bcryptjs');
var jwt = require('jsonwebtoken');


var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        },
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    tokens: [{
        access : {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]


});

UserSchema.methods.toJSON = function () {

    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email'])

}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = "auth";
    var token = jwt.sign({_id: user._id.toHexString(), access},'123abc').toString();

    user.tokens.push({access,token});

    return user.save().then(() =>{
        return token;
    })

}

UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull:{
            tokens:{
                token:token
            }
        }
    })

}

UserSchema.statics.getUserByToken = function (token) {

    var decodedToken;

    try{
        var decodedToken = jwt.verify(token,'123abc');
    }
    catch (e){
        return Promise.reject()
    }


    var User = this;
    return User.findOne({
        '_id': decodedToken._id,
        'tokens.access':'auth',
        'tokens.token':token
    });

}

UserSchema.statics.loginUser = function (body) {
    var User = this;

    return User.findOne({email:body.email}).then(
        (user) => {
            if(!user)
                return Promise.reject();
                return new Promise((resolve,reject) => {
                   bcryptjs.compare(body.password,user.password,(err,res) => {
                    if(res)
                        return resolve(user)
                       return reject();
                })
            })

        }
    )



}

UserSchema.pre('save',function (next) {

    var user = this;

    if(user.isModified('password')){
        bcryptjs.genSalt(10,(err,salt) => {
            bcryptjs.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();

            })
        })
    }else{
        next();
    }

})


var User = mongoose.model('User',UserSchema)

module.exports = { User };
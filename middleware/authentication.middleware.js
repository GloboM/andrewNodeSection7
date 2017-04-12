
const { User } = require('./../server/models/user.model')

var authentication = (req,res,next) =>{

    var token = req.header('x-auth');
    User.getUserByToken(token).then(
        (user) => {
            if(!user){
                return Promise.reject()

            }
            //res.send(user);
            req.user=user;
            req.token = token;
            next();
        }
    ).catch((err) => res.status(401).send());


}

module.exports = { authentication }
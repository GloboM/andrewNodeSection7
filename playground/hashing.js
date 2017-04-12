
const {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');


var data = {
    id:4
}

var toSendData = {
    data,
    token: SHA256(JSON.stringify(data)+'miladi').toString()
};

var hashedData = SHA256(JSON.stringify(toSendData.data)+'miladi').toString();

if(hashedData === toSendData.token){
    console.log('data was not manipulated')
}else {
    console.log('data manipulated')
}




// jwt

var jwtMessage = "mohamed";

var jwtHashed = jwt.sign(jwtMessage,'hashing');
var decoded = jwt.verify(jwtHashed,'hashingx')

console.log('jwt hashed is '+jwtHashed);
console.log('decoded: '+decoded)


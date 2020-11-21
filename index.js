const express = require('express');
//const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');


// var checkAuth = (req, res, next) => {
    

// }


var credentials = []

var createUser = (user, pw) => {
    const salt = bcrypt.genSaltSync(10)
    return { 
        user, 
        salt,
        pwHash: bcrypt.hashSync(pw, salt) 
    }
}

var PORT = 3000;
var appServer = express();
appServer.use(bodyParser.urlencoded({ extended: true }));
appServer.use(cookieParser());

appServer.post('/register', (req, res) => {
    const { user, password } = req.body;
    if(credentials.find(credential => credential.user === user)){
        res.send(`ooops looks like ${user} is already registered`)
    }
    credentials.push(createUser(user, password));
    res.send(`you have now been registered`)
})

appServer.post('/login', (req, res) => {
    const { user, password } = req.body;
    const userLogin = credentials.find(credential => credential.user === user);
    if(userLogin){
        const valid = bcrypt.compareSync(password, userLogin.pwHash);
        debugger;
    }
    res.send("that doesn't look correct")


})

appServer.get('/', (_, res) => {
    return res.send('protected resource');
})

appServer.listen(PORT, () => {
    console.dir(`app is listening on PORT: ${PORT}`)
})
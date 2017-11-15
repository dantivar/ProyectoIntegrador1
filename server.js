/*jshint esversion:6 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = require('./models/user');
const { Client } = require('pg');

let connectionString = 'postgres://oguppupaxdocwf:a12c2e57a32c4092a7566d1ebb0019b4b261b690e6a04cb1f500e49c3344ba72@ec2-23-21-101-174.compute-1.amazonaws.com:5432/d29lcktjstbg67';

const client = new Client({
  connectionString: connectionString,
  ssl: true,
});

client.connect();

var app = express();

app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};
var logged = false;
//set port
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/', sessionChecker, (req, res) =>{
  res.redirect("/login");
});

app.route('/login')
  .get(sessionChecker, (req, res) =>{
    res.sendFile(__dirname + '/public/index.html');
  })
  .post((req, res) => {
    let usr = req.body.usr;
    let pwd = req.body.pwd;

    User.findOne({attributes: ['usr'], where:{usr:usr, pwd:pwd}}).then((user) =>{
      if (!user) {
        res.redirect('/login');
      } else {
        req.session.user = user.dataValues;
        res.redirect('/home');
      }
    });
  });

app.get('/home', (req, res) =>{
  res.sendFile(__dirname + '/public/pp-app.html');
});

app.listen(port, function(){
  console.log("app running");
});

function findUsr(usr,pwd) {
  client.query('SELECT usr FROM usuario;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      if (row.usr===usr) {
        validarPwd(usr,pwd);
      }
    }
  });
  return usr;
}

function validarPwd(usr,pwd) {
  let qtext = 'SELECT pwd FROM usuario WHERE usr=$1';
  client.query(qtext, [usr],(err, res) => {
    if(err) throw err;
    if (pwd===res.rows[0].pwd) {
      logged = true;
    }
  });
}

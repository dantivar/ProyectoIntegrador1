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

    User.findOne({attributes: ['usr','id_usr']}).then((user) =>{
      if (!user) {
        res.redirect('/login');
      } else {
        req.session.user = user.dataValues;
        res.redirect('/reserva');
      }
    });
  });

app.route('/reserva')
  .get((req, res) =>{
    res.sendFile(__dirname + '/public/reserva.html');
  })
  .post((req, res) =>{
    let qtext = 'INSERT INTO reserva VALUES($1,$2::timestamp + interval \'1 hour\',$3,$4);';
    client.query(qtext, [req.body.rdt, req.body.rdt, req.body.sel1, req.session.user.id_usr], (err, resp) =>{
      if(err) throw err;
      res.redirect('/vreserva');
    });
  });

app.route('/prestamo')
  .get((req, res) =>{
  res.sendFile(__dirname + '/public/prestamo.html');
  })
  .post((req, res) =>{
    let qtext = 'INSERT INTO prestamo VALUES($1,$2::time + interval \'1 hour\',$3,$4);';
    client.query(qtext, [req.body.pdt, req.body.pdt, req.body.sel2, req.session.user.id_usr], (err, resp) =>{
      if(err) throw err;
      res.redirect('/vprestamo');
    });
  });

app.get('/vreserva', (req, res) =>{
  res.sendFile(__dirname + '/public/vreserva.html');
});

app.get('/vprestamo', (req, res) =>{
  res.sendFile(__dirname + '/public/vprestamo.html');
});

app.listen(port, function(){
  console.log("app running");
});

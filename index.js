var path = require('path')
var express = require('express')
var app = express()


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send("Hola")
})

app.listen(3000)

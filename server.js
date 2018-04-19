var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render('index.ejs');
});
app.post('/login', function(req, res) {
    res.render('login.ejs', {nom: req.params.firstname});
    console.log('firstname = ' + req.body.firstname + ' ; lastname = ' + req.body.lastname);
});

app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(666);

var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.render('index.ejs');
});
app.post('/login', function(req, res) {
    res.render('login.ejs', {nom: req.params.firstname});
    console.log(req.body)
});

app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(666);

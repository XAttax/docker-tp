var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var sha1 = require('sha1');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render('index.ejs');
});
app.post('/login', function(req, res) {

    let login = req.body.login;
    let password = req.body.password;

    if(login.trim() == '' && password.trim() == '') {
        res.status(403).send('<h1>403</h1><h2>Login ou password vide !</h2>');
        return;
    }

    MongoClient.connect('mongodb://192.168.99.100:32768/dockertp', function(err, client) {
        if (err) throw err;

        console.log('Connected successfully to server');

        const db = client.db('dockertp');

        /*
        db.createCollection('users', function(err, collection) {
        });
        db.collection('users').insert([{ login: 'admin', password: sha1('test') }], function(err, result) {
            console.log(result);
        });*/

        db.collection('users').findOne({ login: login, password: sha1(password) }, function(err, result) {
            if (err) throw err;
            
            if(result == null) {
                console.log('NON');
                res.status(403).send('<h1>403</h1><h2>Login ou password incorrect !</h2>');
            }
            else {
                console.log(result);
            }
        });

       //db.close();
    });
});

app.use(function(req, res, next){
	//res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('<h1>404</h1><h2>Page introuvable !</h2>');
});

app.listen(666);

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var elasticsearch = require('elasticsearch');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.set('view engine', 'pug');

const routes = require('./routes');

app.use(routes);
//For the app to see your style sheets
app.use(express.static(__dirname + '/public'));

var apm = require('elastic-apm-node').start({
    // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    serviceName: 'draft',
    // Use if APM Server requires a token
    // secretToken: '',
    // Set custom APM Server URL (default: http://localhost:8200)
    // serverUrl: ''
})

app.use((req, res, next) => {
    console.log('one');
    next();
},
(req, res, next) => {
    console.log('Hello');
    const err = new Error('Oh no! Custom error object');
    err.status = 500;
    next(); 
});

app.use((req, res, next) => {
    console.log('two');
    next();
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

app.listen(3000, () => {
    console.log('The application is running on port 3000');
});
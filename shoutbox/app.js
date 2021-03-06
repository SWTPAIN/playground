var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var methodOverride = require('method-override');

var routes = require('./routes/index');
// var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var entries = require('./routes/entries');
var messages = require('./lib/messages');
var user = require('./lib/middleware/user');
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({secret: 'vegan'}));
app.use(user);
app.use(messages);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', page(Entry.count, 5), entries.list);
// app.use('/users', users);
app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/post', entries.form);
app.post('/post', validate.required('entry[title]'),
         validate.lengthAbove('entry[title]', 4),
         entries.submit);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
})
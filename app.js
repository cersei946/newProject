var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var staticFilePath = require('./config/config').StaticFilePath;
var Fun = require('./util/utils');
var app = express();
var version = Date.parse(new Date());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 区域变量
app.locals.staticFilePath = staticFilePath;
app.locals.version = '?' + version;
app.locals.Fun = Fun;

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('yunmendian'));
app.use(express.static(path.join(__dirname, 'public')));

// routers
var _fileName;
fs.readdirSync(path.join(__dirname, 'controllers')).forEach(function (fileName) {
    _fileName = fileName.substring(0, fileName.length - 3);
    var index = require('./controllers/indexController');


    if (_fileName === 'indexController') {
        app.use('/', index);
    }  else {
        app.use('/' + _fileName.replace(/Controller$/, ''), require('./controllers/' + _fileName));
    }
});
_fileName = null;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var http = require("http");

const config = require('./config');

var app = express();

var rtLogin = require('./routes/login');
var rtMaster = require('./routes/master');
var uiTest = require('./routes/ui_test');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', rtLogin);
app.use('/master', rtMaster);
app.use('/ui_test', uiTest);

// 以下、未整理

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {

  // Set locals, only providing error
  // in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env')
    === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
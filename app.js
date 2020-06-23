var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var channelRouter = require('./routes/channel');
var usersRouter = require('./routes/users');
var sessionRouter = require('./routes/session');
var app = express();

var session = require(`express-session`);
app.use(express.json());
app.use(session({ 
  secret: `3 days ? really ?`, 
  resave: false, 
  saveUninitialized: true
 })
)
app.use(logger('dev'));
app.use(bodyParser());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/channel', channelRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRouter);

module.exports = app;

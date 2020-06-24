const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const channelRouter = require('./routes/channel');
const toppicRouter = require('./routes/topic');
const app = express();

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
app.use('/topic', toppicRouter);



module.exports = app;

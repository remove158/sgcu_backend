const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const channelRouter = require('./routes/channel');
const toppicRouter = require('./routes/topic');
const ideateRouter = require('./routes/ideate');
const groupingRouter = require('./routes/grouping');
const editgroupRouter = require('./routes/edit_idea');
const voteRouter = require('./routes/vote');
const io = require('socket.io')
const app = express();

var session = require(`express-session`);
app.use(cors());
app.options('*', cors());
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

app.use('/channel', toppicRouter);
app.use('/topic', ideateRouter);
app.use('/topic', groupingRouter);
app.use('/topic', voteRouter);
app.use('/idea', editgroupRouter);


module.exports = app;

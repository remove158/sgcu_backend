const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const getChannel = require('../methods/channel').getChannel;


const checkPermission= db.checkPermission;

module.exports = {checkPermission}
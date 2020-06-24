const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const channel = sequelize.define('channel', {
    // attributes
  
    channel_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    channel_key: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
      // allowNull defaults to true
    }
  }, {
    // options
  });
  
  const addChannel = async (channel_key,title)=>{
  
    const res = await channel.create({channel_key,title})
  
    return res.dataValues;
    
  }
  
  
  const getChannel = async()=>{
    let results = await channel.findAll()
    return results;
  }
  

  module.exports = {addChannel,getChannel}
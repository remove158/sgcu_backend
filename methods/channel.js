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
    timestamps: false,

  });
  
const addChannel = async (channel_key,title)=>{

  const res = await channel.create({channel_key,title})
  
  const table = sequelize.define(`table_${res.dataValues.channel_id}`, {
    // attributes
  
    topic_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    topic: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true
      // allowNull defaults to true
    },win_group_id: {
      type: Sequelize.INTEGER,
      allowNull: true
      // allowNull defaults to true
    },
    createdAt:{
      type:Sequelize.DATE
    },
    updatedAt:{
      type:Sequelize.DATE
    },

  }, {
    define: {
      timestamps: true,
      freezeTableName: true
    }
  });
  table.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return  ;
    //table.destroy({where:{}})
   
  });
  

  return res.dataValues;
  
  }
  
  
  const getChannel = async()=>{
    let results = await channel.findAll()
    return results;
  }
  

  module.exports = {addChannel,getChannel}
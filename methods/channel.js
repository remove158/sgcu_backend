const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const channel = db.channel;

const addChannel = async (channel_key,title)=>{

  const res = await channel.create({channel_key,title})
  return res.dataValues;
  
}
  
  
const getChannel = async()=>{
  let results = await channel.findAll()
  let output=[]
  results.forEach(item => {
    output.push(item.dataValues)
  });
  
  return output;
}

const getChannelByKey = async channel_key => {
  return await channel.findOne({ where: { channel_key} })
}

module.exports = {
  addChannel,
  getChannel,
  getChannelByKey,
}

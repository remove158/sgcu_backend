const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const getChannel = require('../methods/channel').getChannel;

const topic = db.topic;


const checkPermission= async (channel_key,topic_id)=>{
    let status = false;
    const channel = await getChannel();
    channel.forEach(async(item) => {
        console.log(item.channel_key , channel_key);
        
        if( item.channel_key===channel_key){
            
            const result = await topic.findAll({where:{topic_id:topic_id}});
            console.log(result[0].dataValues.channel_id,item.channel_id);
            console.log(result[0].dataValues.channel_id==item.channel_id);
       
            status= result[0].dataValues.channel_id==item.channel_id;
    
            
            return status;
        } 
    });
   
    
    return status;
    
}

module.exports = {checkPermission}
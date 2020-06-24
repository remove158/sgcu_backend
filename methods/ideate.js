const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;


const getModel = function(channel_id,topic_id){
    const channelModel = sequelize.define(`topic_${channel_id}_${topic_id}`, {

        idea_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primarykey: true

        },
        idea: {
            type: Sequelize.STRING,
            allownull: false
        },
        idea_group_id: {
            type: Sequelize.STRING,
            allownull: true
            // allownull defaults to true
        },
    }, {
       
    });
    return channelModel;
}


const addIdea = function(channel_id,topic_id,idea){

}

const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const getChannel = require('../methods/channel').getChannel;


const checkPermission= db.checkPermission;
const editTopicStatus = async (status, topic_id) => {
    await db.topic.update(
        { status: status },
        { where: { topic_id: topic_id } })
    const res = await  db.topic.findOne({ where: { topic_id: topic_id } })
    return res

}

module.exports = {checkPermission,editTopicStatus}
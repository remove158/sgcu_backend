const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Topic = db.topic;

const getTopic = async () => {
    const res = await Topic.findAll()
    return res
}

const addTopic = async (topic, channel_id) => {
    const res = await Topic.create({ topic: topic, status: 'Live', channel_id: channel_id })
    const result = await Topic.findOne({ where: { topic_id: res.topic_id } })
    return result
}

const editTopicStatus = async (status, topic_id) => {
    await Topic.update(
        { status: status },
        { where: { topic_id: topic_id } })
    const res = await Topic.findOne({ where: { topic_id: topic_id } })
    return res
}

module.exports = { addTopic, editTopicStatus, getTopic };
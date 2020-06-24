const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Topic = sequelize.define('topic', {
        // attributes

        topic_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        topic: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        win_group_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        createAt: {
            //type: Sequelize.DATE
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updateAt: {
           // type: Sequelize.DATE
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        channel_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        define: {
            timestamps: true,
            freezeTableName: true
        }
    });

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
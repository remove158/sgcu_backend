const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Vote = db.vote;

const getVote = async () => {
    const res = await Vote.findAll()
    return res
}

const submitVote = async (topic_id, group_id, username) => {
    //const res = Vote.create({ group_id: group_id, username: username, topic_id, topic_id })
    const check = await Vote.findAll({ where: { topic_id: topic_id } })

    let checkAlready = false
    for (let i = 0; i < check.length; i++) {
        if (check[i].dataValues.username === username) {
            checkAlready = true
        }
    }
    if (checkAlready === true) {
        console.log(1)
        return 'Already'
    }
    const res = await Vote.create({ topic_id: topic_id, group_id: group_id, username: username })
    return res
}

module.exports = { getVote, submitVote };

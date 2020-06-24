const db = require('../config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;


const Vote = db.vote
const getVote = async (topic_id) => {
    const res = await Vote.findAll({ where: { topic_id: topic_id } })
  return res
}

const submitVote = async (topic_id, group_id, user_name) => {
    const check = await Vote.findAll({ where: { topic_id: topic_id } })

    let checkAlready = false
    for (let i = 0; i < check.length; i++) {
        if (check[i].dataValues.user_name === user_name) {
            checkAlready = true
        }
    }
    if (checkAlready === true) {
        return 'Already'
    }
    const res = await Vote.create({ topic_id: topic_id, group_id: group_id, user_name: user_name })
    return res
}

module.exports = { getVote, submitVote };

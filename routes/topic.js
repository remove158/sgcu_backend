var express = require('express')
var router = express.Router({ mergeParams: true })

/* methods */

const addTopic = require('../methods/topic').addTopic;
const editTopicStatus = require('../methods/topic').editTopicStatus;
const getTopic = require('../methods/topic').getTopic;

/* GET home page. */

router.post('/:channel_id/topic', async (req, res) => {
    const result = await addTopic(req.body.topic, req.params.channel_id)
    res.json(result);
    res.end();
})

router.get('/:channel_id/topic', async (req, res) => {
    const result = await getTopic()
    results = []
    result.forEach(item => {
        if (item.dataValues.channel_id === parseInt(req.params.channel_id)) {
            results.push(item.dataValues)
       }
    })
    res.json(results)
    res.status(404);
    res.end();
})


router.put('/:topic_id', async (req, res) => {
    const result = await editTopicStatus(req.body.status, req.params.topic_id)
    res.json(result);
    res.end();
})

module.exports = router

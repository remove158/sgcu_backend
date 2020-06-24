var express = require('express')
var router = express.Router({ mergeParams: true })

/* methods */

const getVote = require('../methods/vote').getVote;
const submitVote = require('../methods/vote').submitVote;

/* GET home page. */

router.get('/:topic_id/vote', async (req, res) => {
    
    const result = await getVote()
    
    results = []
    result.forEach(item => {
        if (parseInt(item.dataValues.topic_id) === parseInt(req.params.topic_id)) {
            results.push(item.dataValues)
        }
    })
    res.json(results)
    res.status(404);
    res.end();
})

router.post('/:topic_id/vote', async (req, res) => {
    const result = await submitVote(req.params.topic_id, req.body.group_id, req.body.username)
    if (result === 'Already') {
        res.json('Already');
        res.end();
    }
    else {
        res.json(result);
        res.end();
    }
    
})

module.exports = router

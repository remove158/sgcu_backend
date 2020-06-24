
var express = require('express');
const db = require('../config/db');
var router = express.Router({ mergeParams: true })

/* methods */

const addTopic = require('../methods/topic').addTopic;
const getTopic = require('../methods/topic').getTopic;

/* GET home page. */

router.post('/:channel_id/topic', async (req, res) => {
    const channel_key = req.headers['channel-key'] || "dont have";
    
    const status = await db.channel.findAll({where:{channel_id:req.params.channel_id,channel_key}})
    
    
    
    if(status.length != 0){
        const result = await addTopic(req.body.topic, req.params.channel_id)
        res.json(result);
        res.end();
        res.status(200);
    }else{
        res.status(404);
        res.end();
    }
    
})

router.get('/:channel_id/topic', async (req, res) => {

    const channel_key = req.headers['channel-key'] || "dont have";
    
    const status = await db.channel.findAll({where:{channel_id:req.params.channel_id,channel_key}})
    

    
    if(status.length != 0){
        const result = await getTopic()
        results = []
        result.forEach(item => {
        if (item.dataValues.channel_id === parseInt(req.params.channel_id)) {
            results.push(item.dataValues)
        }
        })
        res.json(results)
        res.status(200);
        res.end();
        
    }else{
        res.status(404);
        res.end();
    }
    
})



module.exports = router;

var express = require('express');
const db = require('../config/db');
var router = express.Router({ mergeParams: true })
const ideate = require('../methods/ideate');
/* methods */
const io = require('../bin/www')


/* GET home page. */


router.put('/:idea_id', async (req, res) => {

    const data = await db.idea.findOne({where:{idea_id:req.params.idea_id}})
    const topic_id = data.topic_id;

    const channel_key = req.headers['channel-key'];
    const status = await ideate.checkPermission(channel_key,topic_id);
    if(status){
        io.io.to(`/rooms/topic/${topic_id}`).emit('change',{collection:"idea"})
        const result = await db.idea.update({idea_group_id:req.body.idea_group_id},{where:{idea_id:req.params.idea_id}})
        res.json(result);
        res.status(200);
        res.end();
    }else{
        res.status(404);
        res.end();
    }    
})

module.exports = router;
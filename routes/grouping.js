
var express = require('express');
const db = require('../config/db');
var router = express.Router({ mergeParams: true })
const ideate = require('../methods/ideate');
/* methods */
const io = require('../bin/www')


/* GET home page. */

router.get('/:topic_id/group', async (req, res) => {
    const channel_key = req.headers['channel-key'];
    const status = await ideate.checkPermission(channel_key,req.params.topic_id);

    if(status){
        const result = await db.group.findAll({where:{topic_id:req.params.topic_id}});
        res.json(result);
        res.end();
        res.status(200);
    }else{
        res.status(404);
        res.end();
    }
    

})


router.post('/:topic_id/group', async (req, res) => {
    const channel_key = req.headers['channel-key'];
    const status = await ideate.checkPermission(channel_key,req.params.topic_id);

    if(status){   
        const result = await db.group.create({group:req.body.group,topic_id:req.params.topic_id})
        io.io.to(`/rooms/topic/${req.params.topic_id}`).emit('change',{collection:"group"})
        res.json(result);
        res.end();
        res.status(200);
    }else{
        res.status(404);
        res.end();
    }

    
})

module.exports = router;
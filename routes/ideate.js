
const express = require('express');
const router = express.Router({mergeParams: true});

const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('../config/db')
const idea  = require('../config/db').idea;
const ideate = require('../methods/ideate');
const io = require('../bin/www')

router.get("/:topic_id/idea",async (req,res)=>{



    const channel_key = req.headers['channel-key'];
    const status = await ideate.checkPermission(channel_key,req.params.topic_id);

    if(status){
        const result = await idea.findAll({where:{topic_id:req.params.topic_id}});
        io.io.emit('5555',{})
        res.json(result)        
        res.status(200);
    }else{
        res.status(404);
        res.json({success:false})
    }

})


router.post("/:topic_id/idea",async (req,res)=>{
    
    const channel_key = req.headers['channel-key'];
    const status = await ideate.checkPermission(channel_key,req.params.topic_id);
    
    if(status){
        idea.create({idea:req.body.idea,topic_id:req.params.topic_id});
        io.io.to(`/rooms/topic/${req.params.topic_id}`).emit('change',{collection:"idea"})
        res.status(200);
        res.end();
        
    }else{
        res.status(404);
        res.end();
    }
})

router.put('/:topic_id', async (req, res) => {


    const channel_key = req.headers['channel-key'];
    const status = await ideate.checkPermission(channel_key,req.params.topic_id);
    
    
    if(status){
        var data = await db.topic.findOne({where:{topic_id:req.params.topic_id}});
        const channel_id = data.dataValues.channel_id
        const result = await ideate.editTopicStatus(req.body.status, req.params.topic_id)
        console.log(`/rooms/channel/${channel_id}`);
        
        io.io.to(`/rooms/channel/${channel_id}`).emit('change',{collection:"topic"})
         res.json(result);
        res.status(200);
        res.end();
    }else{
        res.status(404);
        res.end();
    }
    
    
})

    
module.exports = router;
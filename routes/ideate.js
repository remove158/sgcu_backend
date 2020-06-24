const express = require('express');
const router = express.Router({mergeParams: true});
const ideate = require('../methods/ideate');
const bcrypt = require('bcrypt');
const session = require('express-session');

router.get("/:topic_id/idea",(req,res)=>{

    if(ideate.addIdea(req.params.idea,req.headers.channel_key,res)){
        res.status(200);
    }else{
        res.status(404);
    }
    res.end();
})

router.post("/:topic_id/idea",async (req,res)=>{

    const channel_key = req.headers.channel_key;
    const status = await ideate.checkPermission(channel_key,req.params.topic_id);


    if(status){
        res.status(200);

    }else{
        res.status(404);
    }
    res.end();


})




module.exports = router; 

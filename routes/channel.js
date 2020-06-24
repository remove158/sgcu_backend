const express = require('express');
const router = express.Router({mergeParams: true});

const db = require('../methods/channel');

const bcrypt = require('bcrypt');
const session = require('express-session');

/* GET home page. */



router.post('/create/',(req,res)=>{
  const pwd = req.body.title
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(pwd, salt, async function(err, hash) {
      if(err) {
        console.log("password cannot undefine.");
        res.status(404);
      }else{
        const data = req.body;   
        let hashed = "";
        for(let i=0; i<hash.length ; i++){
            if(hash.charAt(i) == "." | hash.charAt(i) == "$"| hash.charAt(i) == "/"){
            }else{
              hashed= hashed+hash.charAt(i);
            }
        }
        
        const result = await db.addChannel(hashed,data.title);
        res.status(200)
        res.send(result);
      }
  })
})
})

router.get('/bykey/:channel_key', async (req, res)=>{
  const result = await db.getChannelByKey(req.params.channel_key);
  if (result !== null) {
    res.json(result.dataValues);
  } else {
    res.status(404);
  }
  res.end();
})

module.exports = router;

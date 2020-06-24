const express = require('express');
const router = express.Router({mergeParams: true});

const db = require('../config/db');
/*
methods 
*/

const mysql = db.con;
const addChannel = db.addChannel;

////
const bcrypt = require('bcrypt');
const session = require('express-session');

/* GET home page. */


const createTable = function(name){
  console.log('createing tabl' ,name+"...");
  
  const sql = `CREATE TABLE ${name} (
    topic_id INT(11)  AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    win_group_id int(11) NOT NULL
)`

  mysql.query(sql,(err,res)=>{
      if(err)console.log("cannot create table");
      
  })
}

router.get('/',(req,res)=>{
  const data = req.cookies.channel || [];
  res.send( data )

})


router.post('/create/',(req,res)=>{
  const pwd = req.body.title

  
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(pwd, salt, function(err, hash) {
      
      if(err) {
        console.log("password cannot undefine.");
      }else{

        const data = req.body;
        
        let hashed = "";
        for(let i=0; i<hash.length ; i++){
            if(hash.charAt(i) == "." | hash.charAt(i) == "$"| hash.charAt(i) == "/"){

            }else{
              hashed= hashed+hash.charAt(i);
            }
        }
        
        res.json({msg:addChannel(hashed,data.title)});
        
      }
  })
})
    

 
})


router.get('/clearCookie/',(req,res)=>{
  res.clearCookie("channel");
  res.json({msg:"success"})
})





router.get('/join',(req,res)=>{
 
  
  // mysql.connect((err)=>{

  //     if(err){console.log("db connect fail.");
      
  //     }
  //     const sql = `select * from channel where channel_key='${req.query.key}'`
  //     mysql.query(sql,(err,result)=>{
  //       if(result.length ===1){
  //         res.json(result[0]);
  //         // req.session.channel = req.session.channel || []
  //         // req.session.channel.push(result[0]);
          
  //         // const data = req.cookies.channel  || [];
  //         // if(data.find(e => e.channel_id === result[0].channel_id)  ){
  //         //   res.json({msg:"you already in this channel"})
  //         // }else{
  //         //   data.push(result[0]);
  //         //   req.session.cookie.expires = false;
  //         //   res.cookie('channel',data,{ path: '/', maxAge: 31536000 });
  //         //   res.json({msg:"join success"})
  //         // }
  //       }else{
  //         res.json({msg:"key invalid !"})
  //       }
  //     })
    
  // })

})






module.exports = router;

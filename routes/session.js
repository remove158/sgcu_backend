var express = require('express');
var router = express.Router();
const session = require('express-session');
const mysql = require('../config/db')
const bcrypt = require('bcrypt');
/* GET home page. */
router.post('/login', function(req, res, next) {
  const data = req.body;
  const sess = req.session;
  mysql.query(`select * from user where username='${data.username}'`,(err,result)=>{
    if(result.legth==0){
      res.json({success:false})
    }else{
      const pwd = result[0].password 
      bcrypt.compare(data.password,pwd,(err,result1)=>{
        if(result1){
          req.session.loggedin = true;
          req.session.username = data.username;
          res.json({success:true,data:req.session})
        }else{
          res.json({success:false})
        }
      })
    }
  })
  
  

});


router.post('/logout', function(req, res, next) {
  req.session.destroy();
  res.json({success:true})
});



module.exports = router;

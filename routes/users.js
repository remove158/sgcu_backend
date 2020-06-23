var express = require('express');

var router = express.Router();
const mysql = require("../config/db");
const bcrypt = require('bcrypt');
/* GET users listing. */

router.post('/register', function(req, res, next) {

  mysql.connect(err=>{
    var sql= `select * from user where username='${req.body.username}'`;
    mysql.query(sql,(err,result)=>{
      
      if(result.length >0 ) { res.send({success:false});}
      else{
        var pwd =req.body.password;
        bcrypt.genSalt(1, function(err, salt) {
          bcrypt.hash(pwd, salt, function(err, hash) {
              // Store hash in your password DB.
                sql=`INSERT into user (username , password) values('${req.body.username}','${hash}')`
                mysql.query(sql,(err,result)=>{
                if(err){
                  console.log("cannot insert");
                  
                }else{
                  res.json({success:true ,username:req.body.username })
            }
          })
          });
        });
          
        
        }
      }
   )
  })
});





module.exports = router;

var express = require('express');
var router = express.Router();
const mysql = require('../config/db')

/* GET home page. */

router.get('/create/',(req,res)=>{
  req.session.loggedin = true;
  
  res.json({success:true});
  
})


router.get('/:channel_key',(req,res)=>{
  console.log(req.params.channel_key);

  res.json({success:false});

})


router.get('/', function(req, res, next) {
 
});

module.exports = router;

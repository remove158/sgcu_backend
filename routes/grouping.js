
var express = require('express');
const db = require('../config/db');
var router = express.Router({ mergeParams: true })

/* methods */

const addTopic = require('../methods/topic').addTopic;
const editTopicStatus = require('../methods/topic').editTopicStatus;
const getTopic = require('../methods/topic').getTopic;

/* GET home page. */

router.post('/:topic_id/group', async (req, res) => {


})


router.get('/:topic_id/group', async (req, res) => {


    
})

module.exports = router;
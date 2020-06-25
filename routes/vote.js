
var express = require('express')
var router = express.Router({ mergeParams: true })
const ideate = require('../methods/ideate');
const db = require('../config/db')
const  io = require('../bin/www');
const session = require('express-session');
/* methods */

const getVote = require('../methods/vote').getVote;
const submitVote = require('../methods/vote').submitVote;

/* GET home page. */

router.get('/:topic_id/vote', async (req, res) => {
    
    const channel_key = req.headers['channel-key']

    const status = await ideate.checkPermission(channel_key, req.params.topic_id);

    if (status) {
        const result = await await getVote(req.params.topic_id)
        res.json(result);
        res.status(200);
        res.end();

    } else {
        res.status(404);
        res.end();
    }
})

router.post('/:topic_id/vote', async (req, res) => {
    const channel_key = req.headers['channel-key'];
    const status = await ideate.checkPermission(channel_key, req.params.topic_id);

    if (status) {
        const result = await submitVote(req.params.topic_id, req.body.group_id, req.body.username)
        if (result === 'Already') {
            res.json('Already');
            res.end();
        }
        else {
            res.json(result);
            res.end();
        }
        io.io.to(`/rooms/topic/${req.params.topic_id}`).emit('change',{collection:"vote"})
        res.status(200);
        res.end();

    } else {
        res.status(404);
        res.end();
    }
    
    
})

router.post('/:topic_id/finish', async (req, res) => {
    const channel_key = req.headers['channel-key'];
    const status = await ideate.checkPermission(channel_key, req.params.topic_id);

    if (status) {
        let votes={}
        let data = await db.vote.findAll({where:{topic_id:req.params.topic_id}})
        data.forEach(element => {
            let  vote = element.dataValues;
            if(Object.keys(votes).some(i => i==vote.group_id)){
                votes[vote.group_id]+=1
            }else{
                votes[vote.group_id]=1
            }
            
        });
        let ls = Object.keys(votes);
        let group_id_max =ls[0];
        let sum = 0;
        ls.forEach(i => {
            if(votes[i] > votes[group_id_max]){
                group_id_max=i;  
            }
            sum+=votes[i];
        });
        console.log((votes[group_id_max] / sum*100),'(' + (votes[group_id_max] / sum).toString().split('.')[0] + '%' +')');
        
        let percents = '(' + ( (votes[group_id_max]) / sum*100).toString().split('.')[0] + '%' +')'
        console.log(votes,"winner is :",group_id_max,percents);

        db.group.findOne({where:{group_id:group_id_max}}).then(async(winner_detail)=>{
                console.log(winner_detail.dataValues,winner_detail.dataValues.group);
                
            await db.topic.update({win_group_title:(winner_detail.dataValues.group + ' ' + percents),status:"done"},{where:{topic_id:req.params.topic_id}})
        })
        console.log(`/rooms/topic/${req.params.topic_id}`);
        
        io.io.to(`/rooms/topic/${req.params.topic_id}`).emit('change',{collection:"exit"})
        res.status(200);
        res.end();

    } else {

        res.status(404);
        res.end();

    }
    
    
})

module.exports = router

const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const utils = require('utility');
const _filter = {'password':0, '__v':0};

Router.get('/info', function (req, res) {
    const {userid} = req.cookies;
    console.log(userid);
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id: userid},function (err, doc) {
        if(err){
            return res.json({code:1, msg:'后端出错'})
        }
        if(doc){
            console.log(doc);
            return res.json({code:0, data:{user: doc.username, _id: doc._id}})
        }
    })
});

Router.get('/list', function (req, res) {
   User.find({}, function (err, doc) {
       return res.json(doc);
   })
});

Router.post('/register' , function (req ,res) {
    console.log(req.body);
    const {user , pass} = req.body;
    User.findOne({username: user},function (err, doc) {
        if(doc){
            return res.json({code:1, msg:'用户名重复'})
        }
        const userModel = new User({
            username: user,
            password : md5pass(pass)
        });

        userModel.save(function (e, d) {
            if(e){
                return res.json({code:1, msg:'后端出错'})
            }
            const {username, _id} = d;
            res.cookie('userid', _id);
            return res.json({code:0, data:{user:username ,_id}})
        })
    })
});

Router.post('/login',function (req, res) {
    console.log(req.body);
    const {user , pass} = req.body;
    User.findOne({username: user, password: md5pass(pass)},function (err, doc) {
        if(!doc){
            return res.json({code:1, msg:'用户名或密码错误'})
        }
        res.cookie('userid',doc._id);
        return res.json({code:0, data:{user,_id:doc._id}})
    })
});


function md5pass(pwd) {
    const salt = 'zz_is_so_good_lol!!=!?@';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router;

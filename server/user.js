const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

Router.get('/info', function (req, res) {
    return res.json({code:1});
});

Router.get('/list', function (req, res) {
   User.find({}, function (err, doc) {
       return res.json(doc);
   })
});

Router.post('/register' , function (req ,res) {
    console.log(req.body);
    const {user , pass} = req.body;
    User.findOne({username: user}, function (err, doc) {
        if(doc){
            return res.json({code:1, msg:'用户名重复'})
        }
        User.create({
            username: user,
            password : pass
        }, function (e, d) {
            if(e){
                return res.json({code:1, msg:'后端出错'})
            }
            return res.json({code:0})
        })
    })
});

module.exports = Router;

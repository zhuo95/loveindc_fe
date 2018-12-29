const mongoose = require('mongoose');

const DB_url = 'mongodb://localhost:27017/loveindc';
mongoose.connect(DB_url);

const models = {
  user:{
      'username':{type:String, require:true},
      'password':{type:String, require:true}
  }
};

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
};
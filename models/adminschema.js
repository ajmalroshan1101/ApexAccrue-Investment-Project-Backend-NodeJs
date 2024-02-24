const mongoose = require("mongoose");

const admin = new mongoose.Schema({
  username:{ 
    type:String,
    required :true
} ,
  password:{ 
    type:String ,
    required:true
},
  User: { 
    type: String, 
    default: 'admin' 
  },
});

const adminModel = mongoose.model('admins', admin);

module.exports = adminModel ;
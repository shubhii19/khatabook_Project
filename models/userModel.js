const mongoose = require('mongoose');

const  userSchema = mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:{
        type:String,
        required:true,
        select:false
    },
    hisaabs:[{type:mongoose.Schema.Types.ObjectId, ref:'hisaab'}]
})

module.exports = mongoose.model('user',userSchema)
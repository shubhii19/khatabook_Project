const mongoose = require('mongoose');

const  hisaabSchema = mongoose.Schema({
    title:String,
    description:String,
    user:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}],
    encrypted:{
        type:Boolean,
        default:false,
    },
    shareable:{
        type:Boolean,
        default:false,
    },
    passcode:{
        type:String,
        default:"",
    },
    editpermissions:{
        type:String,
        default:false,
    }
},{timestamps:true}
)

module.exports = mongoose.model('hisaab',hisaabSchema)
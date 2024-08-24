const { isLoggedIn } = require("../middlewares/middleware");
const hisaabModel = require("../models/hisaabModel");
const userModel = require("../models/userModel");

module.exports.hisaabPageController = function(req,res){
    res.render('create')
}

module.exports.createHisaabController = async function(req,res){
    let {title, description, encrypted, shareable,passcode,editpermissions} = req.body;

    encrypted = encrypted === 'on'? true:false;
    shareable = shareable === 'on'? true:false;
    editpermissions = editpermissions === 'on' ? true:false;
     

    let hisaabcreated = await hisaabModel.create({
        title,
        description,
        encrypted,
        shareable,
        passcode,
        editpermissions,
        user:req.user._id
    })
    let user = await userModel.findOne({email:req.user.email})
    user.hisaabs.push(hisaabcreated._id);
    await user.save();

    res.redirect('/profile')

}

module.exports.readHisaabController = async function(req,res){
    const id = req.params.id;

    const hisaab = await hisaabModel.findOne({_id:id});

    if(!hisaab){
        return res.redirect('/profile')
    }

    if(hisaab.encrypted ){
        return res.render('passcode',{loggedIn : true, id})
    }

    res.render('hisaab', {loggedIn:true , hisaab})
}

module.exports.deleteController = async function(req,res){
    const id = req.params.id;
    const hisaab = await hisaabModel.findOne({
        _id:id,
    })

    if(!hisaab){
        return res.redirect('/profile')
    }
    await hisaabModel.deleteOne({_id:id})
    res.redirect('/profile')
}

module.exports.editHisaabController = async function(req, res){
   const id = req.params.id;

   const hisaab = await hisaabModel.findById(id);

   if(!hisaab){
    return res.redirect('/profile')
   }
   return res.render('edit', {loggedIn : true, hisaab})
}

module.exports.editPostHisaabController = async function(req,res){
    const id = req.params.id;

   const hisaab = await hisaabModel.findById(id);

   if(!hisaab){
    return res.redirect('/profile')
   }

   hisaab.title = req.body.title;
   hisaab.description = req.body.description;
   hisaab.encrypted = req.body.encrypted === 'on'? true:false;
   hisaab.shareable = req.body.shareable === 'on'?true:false;
   hisaab.passcode = req.body.passcode;
   hisaab.editpermissions = req.body.editpermissions=== 'on'?true:false;

   await hisaab.save();
   res.redirect('/profile')
}

module.exports.readVerifiedHisaabController = async function(req,res){

    const id = req.params.id;

    const hisaab = await hisaabModel.findOne({_id :id});

    if(!hisaab){
        return res.redirect('/profile')
    }
    if(hisaab.passcode !== req.body.passcode){
        return res.redirect('/profile')
    }

    return res.render('hisaab', {loggedIn:true, hisaab})
}
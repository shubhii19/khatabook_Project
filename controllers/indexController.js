const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel');
const hisaabModel = require('../models/hisaabModel')
const bcrypt = require('bcrypt');
const { options } = require('../routes/indexRouter');

module.exports.landingPageController = function(req,res){
    res.render('index', {loggedin:false});
}

module.exports.registerPageControlller = function(req,res){
    res.render('register');
}

module.exports.registerController = async function(req,res){
    let{username, name, email, password} = req.body;

    try{
        let user = await userModel.findOne({email});
    if(user) return res.send('u already have an  account, please login');
    
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password,salt);

    user = await userModel.create({
        username,
        name,
        email,
        password:hash
    })

    let token = jwt.sign({id:user._id, email:user.email}, process.env.SECRET_KEY);


    res.cookie('token', token);
    res.redirect('/profile');

    }catch(err){
        res.send(err.message);
    }
}

module.exports.loginController = async function(req,res){
    let{email,password}= req.body;

    let user = await userModel.findOne({email}).select('+password');
    if(!user) return res.send('u do not have an account , please create one...');

    let result = await bcrypt.compare(password, user.password);
    if(result){    
    let token = jwt.sign({id:user._id, email:user.email}, process.env.SECRET_KEY);

    res.cookie('token', token);
    res.redirect('/profile')
    }else{
        res.send('your details are incorrect');
    }
}

module.exports.logoutController = function(req,res){
    res.cookie('token','');
    return res.redirect('/')
}

module.exports.profilePageController = async function(req,res){
    let byDate = Number(req.query.byDate);
    let {startDate, endDate} = req.query; 

    byDate = byDate ? byDate :-1;
    startDate = startDate ? startDate : new Date('1980-01-01');
    endDate = endDate ? endDate : new Date(); 


    let user = await userModel.findOne({email:req.user.email}).populate({
        path:'hisaabs',
        match :{createdAt: {$gte: startDate, $lte :endDate}},
        options:{sort:{createdAt : byDate}},
    });
    res.render('profile', {user})
}
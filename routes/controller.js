const jwt = require('jsonwebtoken')
const { loginModel } = require('../model/model')
const cookie = require('cookie-parser')

module.exports.Homepage = (req, res) => {
    res.render('home')
}

module.exports.loginGet = (req, res) => {
    res.render('login')
}

module.exports.loginPost = async (req, res) => {
    const { email , password } = req.body
    // const user = await loginmodel.find({ email });
    // res.render('home')
    const user = await loginModel.login(email,password)
    const tokenAge = 24 * 60 * 60;
    console.log(user);
    const id = user._id;
    console.log(id);
    const token = jwt.sign({ id }, 'ThisisOurProject' ,{ expiresIn: tokenAge });
    res.cookie('jwt', token,{ httpOnly: true,maxAge: tokenAge * 1000 });
    res.redirect("/")

}

module.exports.logoutGet = (req, res) => {
    res.cookie('jwt','',{ maxage:0 })
    res.redirect("/")
}

module.exports.registerGet = (req, res) => {
    res.render('register')
}

module.exports.registerPost = (req, res) => {
    res.redirect('/login')
}


module.exports.domainGet = (req, res) => {
    res.render('domain')
}

module.exports.queriesGet = (req, res) => {
    res.render('queries')
}

module.exports.questionGet = (req, res) => {
    res.render('question')
}

module.exports.questionPost = (req, res) => {
   res.send("heeS");
}


module.exports.questionaddGet = (req, res) => {
    res.render('questionadd')
}

module.exports.questionaddPost = (req, res) => {
    
    res.redirect('/questionadd');
}


module.exports.mentorGet = (req, res) => {
    res.render('mentor')
}
const User = require("../models/user");
const {v4:uuid}= require('uuid')
const {setUser,getUser} = require("../services/auth");


const handleUserSignUp = async (req,res) => {
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
    // return res.render("home");

}
const handleUserLogin = async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)
    return res.redirect('/login');

    // const sessionId = uuid();
    const token = setUser(user);
    return res.json({token});
    // res.cookie("uuid",token);
    // return res.redirect("/");
}

module.exports = {handleUserSignUp,handleUserLogin}
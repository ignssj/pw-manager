const userModels = require("../models/userModels");

const createUser = async (req, res) => {
    const emailExists = await userModels.checkUser(req.body);
    if (emailExists) {
        return res.status(422).json({ msg: "Email in use" });
    } 
    else {
        const createdUser = await userModels.addUser(req.body);
        if (!createdUser) {
            return res.status(500).json({ msg: "Internal error, try again" });
        } else {
            return res.status(201).json({ user: createdUser });
        }
    }
};

const signInUser = async (req,res) => {
    const {email,password} = req.body;
    const token = await userModels.signInUser({email,password});
    if(token){
        return res.status(200).json({msg: "User logged in",token});
    }else{
        return res.status(404).json({msg: "Invalid login"}) 
    }
};

const getUser = async (req, res) => {
    const bdUser = await userModels.getUser(req);
    if(bdUser){
        return res.status(200).json({user: bdUser});
    }else{
        return res.status(404).json({msg: "Invalid id"});
    }
}

module.exports = { createUser,signInUser,getUser};
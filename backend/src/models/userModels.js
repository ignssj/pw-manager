const mongoose = require('mongoose');
const connection = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
});

const checkUser = async (userReq) => {
    const {email} = userReq;
    const emailExists = await User.findOne({ email });
    return emailExists;
}

const addUser = async (userReq) => {
    const { name, password, email } = userReq;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
        const addedUser = await User.create({
            name,
            email,
            password: passwordHash
        });
        return addedUser;
    } catch (error) {
        console.log(error);
    }
};

const signInUser = async (userReq) => {
    const bdUser = await User.findOne({ email: userReq.email });
    const checkPassword = await bcrypt.compare(userReq.password, bdUser.password);
    if (checkPassword) {
        try {
            const secret = process.env.SECRET;
            const token = jwt.sign({
                id: bdUser._id,
            },
                secret,
            );
            return token;
        } catch (error) {
            console.log(error);
        }
    }
}

const getUser = async (userReq) => {
    const id = userReq.params.id;
    const bdUser = await User.findById(id,'-password');
    return bdUser;
}


module.exports = {
    User,
    checkUser,
    addUser,
    signInUser,
    getUser
};
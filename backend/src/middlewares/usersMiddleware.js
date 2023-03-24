const jwt = require('jsonwebtoken');

const validateName = (request, response, next) => {
    const {body} = request;
    if (body.name === undefined){
        return response.status(422).json({msg: "Name is required"});
    }

    if (body.name === ""){
        return response.status(422).json({msg: "Name is required"});
    }
    next();
};

const validatePassword = (request, response, next) => {
    const {body} = request;
    if (body.password === undefined){
        return response.status(422).json({msg: "Password is required"});
    }

    if (body.password === ""){
        return response.status(422).json({msg: "Password is required"});
    }

    next();
};


const validateEmail = (request, response, next) => {
    const {body} = request;
    if (body.email === undefined){
        return response.status(422).json({msg: "Email is required"});
    }

    if (body.email === ""){
        return response.status(422).json({msg: "Email is required"});
    }
    next();
};

const validateConfirmpw = (request, response, next) => {
    const {body} = request;
    if (body.confirmpw === undefined){
        return response.status(422).json({msg: "Confirmpw is required"});
    }

    if (body.confirmpw === ""){
        return response.status(422).json({msg: "Confirmpw is required"});
    }

    if (body.password !== body.confirmpw){
        return response.status(422).json({msg: "Password and Confirmpw do not match"});
    }
    
    next();
};

const validateToken = (request, response , next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        try{
            const secret = process.env.SECRET;
            jwt.verify(token,secret);
            next();
        }catch(error){
            console.log(error);
            return response.status(400).json({msg: "Invalid token"});
        }
    }else{
        return response.status(401).json({msg: "Access denied"});
    }
}

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmpw,
    validateToken
};
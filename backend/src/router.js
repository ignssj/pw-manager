const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).json({msg: "hello world"})
});

router.post('/auth/register/', async (req,res) => {
   const {user, email, password, confirmpw} = req.body;

   if(!user){
    return res.status(422).json({msg: "User is required"});
   }
   if(!password){
    return res.status(422).json({msg: "Password is required"});
   }
   if(!email){
    return res.status(422).json({msg: "Email is required"});
   }
   if(!confirmpw){
    return res.status(422).json({msg: "Confirmpw is required"});
   }
   return res.status(200).json({msg: "Valid request"});
})

module.exports = router;
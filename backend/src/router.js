const express = require('express');
const router = express.Router();
const userMiddleware = require('./middlewares/usersMiddleware');
const userController = require('./controllers/userController');

router.get('/', (req,res) => {
    res.status(200).json({msg: "hello world"})
});

router.get('/user/:id',userMiddleware.validateToken,userController.getUser);
router.post('/auth/register/', userMiddleware.validateEmail,userMiddleware.validateName,userMiddleware.validatePassword,userMiddleware.validateConfirmpw,userController.createUser);
router.post('/auth/login/',userMiddleware.validateEmail,userMiddleware.validatePassword,userController.signInUser);

module.exports = router;
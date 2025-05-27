const express = require('express');
const router = express.Router();
const {register,login} = require("../controllers/authController");
const authMiddleware = require('../middleware/authMiddleware');

//registration route
router.post('/register', register);

//login route
router.post('/login', login);

//protected route test
router.get('/protected', authMiddleware, (req,res) => {
    res.json({msg: "Accessed protected route", userId: req.user});
})

module.exports = router;
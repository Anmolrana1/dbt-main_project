const express = require('express');
const router = express.Router();
const { signup,login,ForgotPassword,sendResetMail} = require('../controllers/authController');



router.post('/signup', signup);
router.post('/userData',login)
router.post('/Reset',ForgotPassword)
router.post('/SendResetMail',sendResetMail)

module.exports = router;

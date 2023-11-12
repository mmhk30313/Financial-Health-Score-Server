const express = require("express");
const router = express.Router();
const { login_user, sign_up_user, logout_user, reset_password } = require("../../../api/controllers/signup-login");
const User = require("../../../api/models/User/User");
// User login 
router.post('/user/login', login_user);

// User sign_up
router.post('/user/signup', sign_up_user);





module.exports = router;
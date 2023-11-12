const express = require("express");
const router = express.Router();
const { find_all_users, find_user_by_email, find_user_details, update_user } = require("../../../api/controllers/user");

// User update only for user
router.patch('/user/update', update_user);

// Get all users
router.get('/users', find_all_users);

// find a user details by user email
router.get('/user/:email', find_user_by_email);

// User details by accessToken
router.get('/user/account-details', find_user_details);


module.exports = router;
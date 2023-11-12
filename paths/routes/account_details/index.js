const express = require("express");
const { create_account, get_all_accounts, update_account } = require("../../../api/controllers/account_details/account_details");
const router = express.Router();

// business Endpoints
router.post('/account/:month', create_account);
router.get('/accounts', get_all_accounts);
router.patch('/account/:account_id', update_account);



module.exports = router;


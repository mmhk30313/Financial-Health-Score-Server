const express = require("express");
const { create_business, get_all_businesses, update_business, delete_business } = require("../../../api/controllers/business");
const router = express.Router();

// business Endpoints
router.post('/business', create_business);
router.get('/businesses', get_all_businesses);
router.put('/business/update', update_business);
router.delete('/business/:business_id', delete_business);



module.exports = router;


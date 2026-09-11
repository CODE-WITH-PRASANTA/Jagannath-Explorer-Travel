const express = require('express');
const router = express.Router();
const {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon
} = require('../controllers/couponController');

router.route('/')
  .get(getCoupons)
  .post(createCoupon);

router.route('/:id')
  .put(updateCoupon)
  .delete(deleteCoupon);

module.exports = router;
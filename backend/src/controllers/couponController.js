const Coupon = require('../models/Coupon');

// Get all coupons
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const {
      couponCode,
      couponName,
      discountType,
      discountValue,
      minBooking,
      maxDiscount,
      validFrom,
      validTo,
      usageLimit,
      applicableFor,
      applicableTours,
      status,
      description
    } = req.body;

    const existingCoupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }

    const newCoupon = new Coupon({
      code: couponCode.toUpperCase(),
      name: couponName,
      discountType,
      discountValue: Number(discountValue),
      minBooking: Number(minBooking) || 0,
      maxDiscount: Number(maxDiscount) || 0,
      validFrom,
      validTo,
      usageLimit: Number(usageLimit) || 100,
      applicableFor: applicableFor || 'All Users',
      applicableTours: applicableTours || 'All Tours',
      status: status || 'Active',
      description: description || ''
    });

    const savedCoupon = await newCoupon.save();
    res.status(201).json({ success: true, data: savedCoupon });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update coupon
exports.updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      couponCode,
      couponName,
      discountType,
      discountValue,
      minBooking,
      maxDiscount,
      validFrom,
      validTo,
      usageLimit,
      applicableFor,
      applicableTours,
      status,
      description
    } = req.body;

    const updatedData = {
      code: couponCode.toUpperCase(),
      name: couponName,
      discountType,
      discountValue: Number(discountValue),
      minBooking: Number(minBooking) || 0,
      maxDiscount: Number(maxDiscount) || 0,
      validFrom,
      validTo,
      usageLimit: Number(usageLimit) || 100,
      applicableFor: applicableFor || 'All Users',
      applicableTours: applicableTours || 'All Tours',
      status,
      description
    };

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedCoupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    res.status(200).json({ success: true, data: updatedCoupon });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
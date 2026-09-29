const NeedHelp = require("../models/NeedHelp");

// 1. GET ALL WITH PAGINATION (8 items per page)
// Endpoint: GET /api/need-help?page=1&limit=8
exports.getAllNeedHelp = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const totalEntries = await NeedHelp.countDocuments();
    const records = await NeedHelp.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const formattedData = records.map((item) => {
      const dt = new Date(item.createdAt);
      return {
        id: item._id,
        name: item.name,
        phone: item.phone,
        message: item.message,
        status: item.status,
        color: item.avatarColor,
        date: dt.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: dt.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    });

    res.status(200).json({
      success: true,
      data: formattedData,
      pagination: {
        totalEntries,
        totalPages: Math.ceil(totalEntries / limit) || 1,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 2. CREATE A NEW ENTRY (when a customer submits a need help form)
// Endpoint: POST /api/need-help
exports.createNeedHelp = async (req, res, next) => {
  try {
    const { name, phone, message, avatarColor } = req.body;
    const colors = ["blue", "purple", "pink", "green", "orange"];
    const chosenColor =
      avatarColor || colors[Math.floor(Math.random() * colors.length)];

    const newRecord = await NeedHelp.create({
      name,
      phone,
      message,
      avatarColor: chosenColor,
    });

    res.status(201).json({
      success: true,
      message: "Help request submitted successfully",
      data: newRecord,
    });
  } catch (error) {
    next(error);
  }
};

// 3. UPDATE STATUS (New / Replied / Closed)
// Endpoint: PATCH /api/need-help/:id/status
exports.updateNeedHelpStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["New", "Replied", "Closed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Must be 'New', 'Replied', or 'Closed'",
      });
    }

    const updated = await NeedHelp.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "NeedHelp record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// 4. DELETE A RECORD
// Endpoint: DELETE /api/need-help/:id
exports.deleteNeedHelp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await NeedHelp.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "NeedHelp record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "NeedHelp record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const User = require('../models/User'); // Check this matches src/models/User.js
const fs = require('fs');
const path = require('path');

// Safe file deletion helper
const removeUploadedFile = (fileUrl) => {
  if (fileUrl && fileUrl.startsWith('/uploads/')) {
    const relativePath = fileUrl.replace(/^\//, '');
    const fullPath = path.join(__dirname, '..', relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlink(fullPath, (err) => {
        if (err) console.error('Error removing file:', err);
      });
    }
  }
};

// GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({ 
      success: true, 
      users: users || [] 
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// POST /api/users
exports.createUser = async (req, res) => {
  try {
    const { name, title, email, password, role, status } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required fields.'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered'
      });
    }

    const avatar = req.file ? req.file.url : '';

    const newUser = await User.create({
      name,
      title: title || 'Team Member',
      email,
      password,
      role: role || 'Staff',
      status: status === 'true' || status === true ? 'Active' : 'Inactive',
      avatar
    });

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error in createUser:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, email, password, role, status } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let updatedAvatar = existingUser.avatar;
    if (req.file && req.file.url) {
      removeUploadedFile(existingUser.avatar);
      updatedAvatar = req.file.url;
    }

    const updateFields = {
      name,
      title: title || existingUser.title,
      email,
      role,
      status: status === 'true' || status === true ? 'Active' : 'Inactive',
      avatar: updatedAvatar
    };

    if (password && password.trim() !== '' && password !== '******') {
      updateFields.password = password;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true
    });

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error in updateUser:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    removeUploadedFile(user.avatar);
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
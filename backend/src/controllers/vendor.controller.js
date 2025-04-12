const Vendor = require('../models/vendor.model');
const AuditLog = require('../models/auditLog.model');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../services/email.service');

// Create new vendor (admin only)
exports.createVendor = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'primaryPhone', 'city', 'companyRegistrationCertificate', 'vatNumber'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Generate a random password
    const tempPassword = Math.random().toString(36).slice(-8);
    
    const vendor = await Vendor.create({
      ...req.body,
      password: tempPassword,
      createdBy: req.user.id
    });

    // Send credentials email
    await sendEmail({
      to: vendor.email,
      subject: 'Your Medical Bazzar Nepal Vendor Account',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #f97316;">Welcome to Medical Bazzar Nepal!</h1>
          </div>
          <div style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Your Vendor Account Details</h2>
            <p style="color: #666; line-height: 1.6;">
              Your vendor account has been created successfully. Please use these credentials to login:
            </p>
            <div style="text-align: center; margin: 30px 0; background: #f8f8f8; padding: 20px; border-radius: 8px;">
              <p style="margin: 10px 0;"><strong>Email:</strong> ${vendor.email}</p>
              <p style="margin: 10px 0;"><strong>Temporary Password:</strong> ${tempPassword}</p>
            </div>
            <p style="color: #666; line-height: 1.6; font-weight: bold;">
              Please change your password after your first login for security purposes.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Medical Bazzar Nepal. All rights reserved.</p>
          </div>
        </div>
      `
    });

    res.status(201).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    // Check for duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        error: `This ${field} is already registered`
      });
    }

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Vendor login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Check if vendor exists
    const vendor = await Vendor.findOne({ email }).select('+password');
    if (!vendor) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await vendor.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if vendor login is allowed (only for regular vendor login, not admin login)
    if (!req.user?.role === 'admin' && !vendor.isLoginAllowed) {
      return res.status(401).json({
        success: false,
        error: 'Your login access has been disabled. Please contact support.'
      });
    }

    // Create token
    const token = vendor.getSignedJwtToken();

    // Return response with isLoginAllowed status
    res.status(200).json({
      success: true,
      token,
      data: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        primaryPhone: vendor.primaryPhone,
        status: vendor.status,
        isLoginAllowed: vendor.isLoginAllowed
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get vendor profile
exports.getProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update vendor profile
exports.updateProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const vendor = await Vendor.findById(req.user.id).select('+password');
    
    // Check current password
    const isMatch = await vendor.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    vendor.password = newPassword;
    await vendor.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all vendors (admin only)
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({
      success: true,
      data: vendors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get vendor by ID (admin only)
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    
    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update vendor by ID (admin only)
exports.updateVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    // Create audit log for this admin action
    await AuditLog.create({
      action: 'UPDATE_VENDOR',
      performedBy: req.user._id,
      targetUser: vendor._id,
      targetModel: 'Vendor',
      details: `Admin updated vendor: ${vendor.name}`,
      ip: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    // Check for duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        error: `This ${field} is already registered`
      });
    }

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Admin login as vendor
exports.adminLoginAsVendor = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate request
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide vendor email'
      });
    }
    
    // Find the vendor with provided email
    const vendor = await Vendor.findOne({ email }).select('+password');
    
    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }
    
    // Generate token for vendor
    const token = vendor.getSignedJwtToken();
    
    // Log this action for audit purposes
    await AuditLog.create({
      action: 'ADMIN_LOGIN_AS_VENDOR',
      performedBy: req.user._id,
      targetUser: vendor._id,
      targetModel: 'Vendor',
      details: `Admin accessed vendor account: ${vendor.name}`,
      ip: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    });
    
    // Return token with vendor data (exclude password)
    const vendorData = {
      id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      primaryPhone: vendor.primaryPhone,
      status: vendor.status,
      isLoginAllowed: vendor.isLoginAllowed,
      adminAccess: true // Flag to indicate this is admin login
    };
    
    res.status(200).json({
      success: true,
      token,
      data: vendorData
    });
  } catch (error) {
    console.error('Admin login as vendor error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
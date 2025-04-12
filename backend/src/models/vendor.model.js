const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vendor name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  primaryPhone: {
    type: String,
    required: [true, 'Primary phone number is required'],
  },
  secondaryPhone: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  companyRegistrationCertificate: {
    type: String,
    required: [true, 'Company registration certificate is required'],
  },
  vatNumber: {
    type: String,
    required: [true, 'VAT number is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'pending',
  },
  isLoginAllowed: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

// Hash password before saving
vendorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
vendorSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Get signed JWT token
vendorSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, type: 'vendor' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;
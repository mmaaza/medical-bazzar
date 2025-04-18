const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  ancestors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  level: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  productsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
categorySchema.index({ parentId: 1 });
categorySchema.index({ ancestors: 1 });
categorySchema.index({ slug: 1 });
categorySchema.index({ status: 1 });

// Generate slug before saving
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true
    });
  }
  next();
});

// Update ancestors and level before saving
categorySchema.pre('save', async function(next) {
  if (this.isModified('parentId')) {
    if (!this.parentId) {
      this.ancestors = [];
      this.level = 0;
    } else {
      const parent = await this.constructor.findById(this.parentId);
      if (!parent) {
        throw new Error('Parent category not found');
      }
      this.ancestors = [...parent.ancestors, parent._id];
      this.level = parent.level + 1;
    }
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
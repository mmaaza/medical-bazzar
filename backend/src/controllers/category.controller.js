const Category = require('../models/category.model');

// @desc    Get all categories with hierarchical structure
// @route   GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }

    // First get all categories
    const categories = await Category.find(filter)
      .sort({ level: 1, name: 1 })
      .lean();

    // Build the tree structure
    const categoryMap = {};
    const rootCategories = [];

    // Create a map of all categories
    categories.forEach(category => {
      categoryMap[category._id] = {
        ...category,
        children: []
      };
    });

    // Build the tree structure
    categories.forEach(category => {
      if (category.parentId) {
        const parent = categoryMap[category.parentId];
        if (parent) {
          parent.children.push(categoryMap[category._id]);
        }
      } else {
        rootCategories.push(categoryMap[category._id]);
      }
    });

    res.status(200).json({
      success: true,
      data: rootCategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete category and its subcategories
// @route   DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    // Find all subcategories
    const subcategories = await Category.find({
      $or: [
        { _id: categoryId },
        { ancestors: categoryId }
      ]
    });

    // Delete all subcategories
    await Category.deleteMany({
      _id: { $in: subcategories.map(cat => cat._id) }
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
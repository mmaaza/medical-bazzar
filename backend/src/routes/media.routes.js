const express = require('express');
const { upload, uploadMedia, getMedia, deleteMedia } = require('../controllers/media.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
  .get(getMedia);

router.route('/upload')
  .post(upload.array('files'), uploadMedia);

router.route('/:id')
  .delete(deleteMedia);

module.exports = router;
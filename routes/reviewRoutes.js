const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, reviewController.createReview);
router.get('/villa/:villaId', reviewController.getVillaReviews);
router.put('/:id', authenticateToken, reviewController.updateReview);
router.delete('/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;
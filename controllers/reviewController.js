const Review = require('../models/Review');
const Booking = require('../models/Booking');

exports.createReview = async (req, res) => {
  try {
    const { villaId, rating, comment } = req.body;
    
    // Check if the user has booked and stayed at the villa
    const booking = await Booking.findOne({
      user: req.user.id,
      villa: villaId,
      endDate: { $lt: new Date() },
      status: 'confirmed'
    });

    if (!booking) {
      return res.status(400).json({ message: 'You can only review villas you have stayed at' });
    }

    const review = new Review({
      user: req.user.id,
      villa: villaId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error: error.message });
  }
};

exports.getVillaReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ villa: req.params.villaId }).populate('user', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
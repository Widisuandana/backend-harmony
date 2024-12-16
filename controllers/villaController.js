const Villa = require('../models/Villa');

exports.createVilla = async (req, res) => {
  try {
    const villa = new Villa(req.body);
    await villa.save();
    res.status(201).json(villa);
  } catch (error) {
    res.status(400).json({ message: 'Error creating villa', error: error.message });
  }
};

exports.getAllVillas = async (req, res) => {
  try {
    const villas = await Villa.find();
    res.json(villas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching villas', error: error.message });
  }
};

exports.getVillaById = async (req, res) => {
  try {
    const villa = await Villa.findById(req.params.id);
    if (!villa) return res.status(404).json({ message: 'Villa not found' });
    res.json(villa);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching villa', error: error.message });
  }
};

exports.updateVilla = async (req, res) => {
  try {
    const villa = await Villa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!villa) return res.status(404).json({ message: 'Villa not found' });
    res.json(villa);
  } catch (error) {
    res.status(400).json({ message: 'Error updating villa', error: error.message });
  }
};

exports.deleteVilla = async (req, res) => {
  try {
    const villa = await Villa.findByIdAndDelete(req.params.id);
    if (!villa) return res.status(404).json({ message: 'Villa not found' });
    res.json({ message: 'Villa deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting villa', error: error.message });
  }
};

exports.searchVillas = async (req, res) => {
  try {
    const { location, capacity, startDate, endDate } = req.query;
    let query = {};
    
    if (location) query.location = new RegExp(location, 'i');
    if (capacity) query.capacity = { $gte: parseInt(capacity) };

    const villas = await Villa.find(query);

    // Filter out unavailable villas based on booking dates
    if (startDate && endDate) {
      const availableVillas = await Promise.all(villas.map(async (villa) => {
        const bookings = await Booking.find({
          villa: villa._id,
          $or: [
            { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
            { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
            {
              $and: [
                { startDate: { $lte: new Date(startDate) } },
                { endDate: { $gte: new Date(endDate) } }
              ]
            }
          ]
        });
        return bookings.length === 0 ? villa : null;
      }));
      res.json(availableVillas.filter(Boolean));
    } else {
      res.json(villas);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching villas', error: error.message });
  }
};
const express = require('express');
const router = express.Router();
const villaController = require('../controllers/villaController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

router.get('/', villaController.getAllVillas);
router.get('/search', villaController.searchVillas);
router.get('/:id', villaController.getVillaById);
router.post('/', authenticateToken, authorizeAdmin, villaController.createVilla);
router.put('/:id', authenticateToken, authorizeAdmin, villaController.updateVilla);
router.delete('/:id', authenticateToken, authorizeAdmin, villaController.deleteVilla);

module.exports = router;
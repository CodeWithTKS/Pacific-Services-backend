const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');

// Define routes for portals
router.post('/', portalController.addPortal);           // Add a new portal
router.put('/:id', portalController.updatePortal);      // Update a portal by ID
router.delete('/:id', portalController.deletePortal);   // Delete a portal by ID
router.get('/:id', portalController.getPortalById);     // Get a portal by ID
router.get('/', portalController.getAllPortals);        // Get all portals

module.exports = router;

const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');

// Define routes for portals
router.post('/', portalController.addPortal);           // Add a new portal
router.post('/create/logs', portalController.addPortalLog); // Add a new portal logs
router.put('/:id', portalController.updatePortal);      // Update a portal by ID
router.put('/updateBalancePortal/:id', portalController.updateBalancePortal);      // Update a portal by ID
router.delete('/:id', portalController.deletePortal);   // Delete a portal by ID
router.get('/:id', portalController.getPortalById);     // Get a portal by ID
router.get('/', portalController.getAllPortals);        // Get all portals
router.get('/total/stats', portalController.getPortalStats);
router.get('/:id/logs', portalController.getPortalLogsById); //view portal balance logs by id
router.get('/highlightEntry/all', portalController.getHighlightEntry);

module.exports = router;

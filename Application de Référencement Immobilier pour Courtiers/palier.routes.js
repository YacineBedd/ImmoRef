const express = require('express');
const router = express.Router();
const palierController = require('../controllers/palier.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Appliquer les middlewares d'authentification et d'administration à toutes les routes
router.use(authMiddleware.verifyToken, adminMiddleware.isAdmin);

// Routes pour la gestion des paliers de bonus
router.get('/', palierController.getAllPaliers);
router.get('/:id', palierController.getPalierById);
router.post('/', palierController.createPalier);
router.put('/:id', palierController.updatePalier);
router.delete('/:id', palierController.deletePalier);

module.exports = router;

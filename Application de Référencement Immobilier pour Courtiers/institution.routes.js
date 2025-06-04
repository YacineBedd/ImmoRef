const express = require('express');
const router = express.Router();
const institutionController = require('../controllers/institution.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Appliquer les middlewares d'authentification et d'administration à toutes les routes
router.use(authMiddleware.verifyToken, adminMiddleware.isAdmin);

// Routes pour la gestion des institutions
router.get('/', institutionController.getAllInstitutions);
router.get('/:id', institutionController.getInstitutionById);
router.post('/', institutionController.createInstitution);
router.put('/:id', institutionController.updateInstitution);
router.delete('/:id', institutionController.deleteInstitution);

module.exports = router;

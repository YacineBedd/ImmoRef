const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Obtenir tous les utilisateurs (admin uniquement)
router.get('/', adminMiddleware, userController.getAllUsers);

// Obtenir un utilisateur par ID
router.get('/:id', userController.getUserById);

// Mettre à jour un utilisateur
router.put(
  '/:id',
  [
    check('firstName', 'Le prénom est requis').optional(),
    check('lastName', 'Le nom est requis').optional(),
    check('phone', 'Le téléphone est requis').optional(),
    check('organization', 'L\'organisation est requise').optional()
  ],
  userController.updateUser
);

// Désactiver un utilisateur (admin uniquement)
router.put('/:id/deactivate', adminMiddleware, userController.deactivateUser);

// Réactiver un utilisateur (admin uniquement)
router.put('/:id/activate', adminMiddleware, userController.activateUser);

// Changer le mot de passe
router.put(
  '/:id/change-password',
  [
    check('currentPassword', 'Le mot de passe actuel est requis').not().isEmpty(),
    check('newPassword', 'Le nouveau mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 })
  ],
  userController.changePassword
);

// Ajouter un partenaire préféré
router.post(
  '/:id/preferred-partners',
  [
    check('partnerId', 'L\'ID du partenaire est requis').not().isEmpty()
  ],
  userController.addPreferredPartner
);

// Supprimer un partenaire préféré
router.delete('/:id/preferred-partners/:partnerId', userController.removePreferredPartner);

// Obtenir les partenaires préférés
router.get('/:id/preferred-partners', userController.getPreferredPartners);

// Obtenir les courtiers disponibles pour référencement
router.get('/available/brokers', userController.getAvailableBrokers);

module.exports = router;

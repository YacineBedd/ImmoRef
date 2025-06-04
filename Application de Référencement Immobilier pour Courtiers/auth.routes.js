const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Route d'inscription
router.post(
  '/register',
  [
    check('firstName', 'Le prénom est requis').not().isEmpty(),
    check('lastName', 'Le nom est requis').not().isEmpty(),
    check('email', 'Veuillez inclure un email valide').isEmail(),
    check('password', 'Veuillez entrer un mot de passe de 6 caractères ou plus').isLength({ min: 6 }),
    check('role', 'Le rôle est requis').isIn(['courtier_immobilier', 'courtier_hypothecaire', 'notaire', 'planificateur_financier'])
  ],
  authController.register
);

// Route de connexion
router.post(
  '/login',
  [
    check('email', 'Veuillez inclure un email valide').isEmail(),
    check('password', 'Le mot de passe est requis').exists()
  ],
  authController.login
);

// Route pour obtenir l'utilisateur actuel
router.get('/me', authMiddleware, authController.getCurrentUser);

// Route pour rafraîchir le token
router.post('/refresh-token', authController.refreshToken);

// Route de déconnexion
router.post('/logout', authMiddleware, authController.logout);

// Route pour demander la réinitialisation du mot de passe
router.post(
  '/forgot-password',
  [
    check('email', 'Veuillez inclure un email valide').isEmail()
  ],
  authController.forgotPassword
);

// Route pour réinitialiser le mot de passe
router.post(
  '/reset-password',
  [
    check('token', 'Le token est requis').not().isEmpty(),
    check('password', 'Veuillez entrer un mot de passe de 6 caractères ou plus').isLength({ min: 6 })
  ],
  authController.resetPassword
);

module.exports = router;

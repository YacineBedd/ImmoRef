const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const referenceController = require('../controllers/reference.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Obtenir toutes les références
router.get('/', referenceController.getAllReferences);

// Obtenir une référence par ID
router.get('/:id', referenceController.getReferenceById);

// Créer une nouvelle référence
router.post(
  '/',
  [
    check('client', 'L\'ID du client est requis').not().isEmpty(),
    check('property', 'L\'ID de la propriété est requis').not().isEmpty(),
    check('referee', 'L\'ID du courtier référé est requis').not().isEmpty(),
    check('consentObtained', 'Le consentement du client est requis').isBoolean().equals('true')
  ],
  referenceController.createReference
);

// Mettre à jour une référence
router.put(
  '/:id',
  [
    check('status', 'Le statut doit être valide').optional().isIn(['pending', 'accepted', 'rejected', 'completed'])
  ],
  referenceController.updateReference
);

// Supprimer une référence
router.delete('/:id', referenceController.deleteReference);

// Obtenir les références par courtier référent
router.get('/referrer/:userId', referenceController.getReferencesByReferrer);

// Obtenir les références par courtier référé
router.get('/referee/:userId', referenceController.getReferencesByReferee);

// Mettre à jour le statut d'une commission
router.put(
  '/:id/commission',
  [
    check('amount', 'Le montant de la commission est requis').isNumeric(),
    check('percentage', 'Le pourcentage de la commission est requis').isNumeric(),
    check('status', 'Le statut doit être valide').isIn(['pending', 'calculated', 'approved', 'paid'])
  ],
  referenceController.updateCommission
);

module.exports = router;

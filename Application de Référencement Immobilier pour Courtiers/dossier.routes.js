const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const dossierController = require('../controllers/dossier.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Obtenir tous les dossiers
router.get('/', dossierController.getAllDossiers);

// Obtenir un dossier par ID
router.get('/:id', dossierController.getDossierById);

// Créer un nouveau dossier
router.post(
  '/',
  [
    check('reference', 'L\'ID de la référence est requis').not().isEmpty(),
    check('client', 'L\'ID du client est requis').not().isEmpty(),
    check('property', 'L\'ID de la propriété est requis').not().isEmpty()
  ],
  dossierController.createDossier
);

// Mettre à jour un dossier
router.put(
  '/:id',
  [
    check('status', 'Le statut doit être valide').optional().isIn([
      'soumission_initiale',
      'reception_documentation',
      'evaluation_dossier',
      'envoi_preteur',
      'approbation_conditionnelle',
      'approbation_finale',
      'instructions_notaire',
      'complete'
    ])
  ],
  dossierController.updateDossier
);

// Supprimer un dossier
router.delete('/:id', dossierController.deleteDossier);

// Mettre à jour l'étape d'un dossier
router.put(
  '/:id/step',
  [
    check('step', 'Le numéro d\'étape est requis').isNumeric(),
    check('status', 'Le statut doit être valide').isIn(['pending', 'in_progress', 'completed'])
  ],
  dossierController.updateDossierStep
);

// Ajouter un document à un dossier
router.post(
  '/:id/documents',
  [
    check('document', 'L\'ID du document est requis').not().isEmpty()
  ],
  dossierController.addDocumentToDossier
);

// Obtenir les dossiers par courtier
router.get('/user/:userId', dossierController.getDossiersByUser);

module.exports = router;

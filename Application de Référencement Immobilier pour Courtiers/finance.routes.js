const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const financeController = require('../controllers/finance.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Obtenir toutes les commissions
router.get('/commissions', financeController.getAllCommissions);

// Obtenir une commission par ID
router.get('/commissions/:id', financeController.getCommissionById);

// Obtenir les commissions à recevoir
router.get('/commissions/receivable', financeController.getReceivableCommissions);

// Obtenir les commissions à payer
router.get('/commissions/payable', financeController.getPayableCommissions);

// Mettre à jour le statut d'une commission
router.put(
  '/commissions/:id/status',
  [
    check('status', 'Le statut doit être valide').isIn(['pending', 'approved', 'paid', 'cancelled']),
    check('paymentDate', 'La date de paiement est requise pour le statut "paid"').optional()
  ],
  financeController.updateCommissionStatus
);

// Calculer une commission
router.post(
  '/commissions/calculate',
  [
    check('referenceId', 'L\'ID de la référence est requis').not().isEmpty(),
    check('mortgageAmount', 'Le montant de l\'hypothèque est requis').isNumeric(),
    check('referenceType', 'Le type de référence est requis').isIn(['immobilier_vers_hypothecaire', 'hypothecaire_vers_immobilier'])
  ],
  financeController.calculateCommission
);

// Générer un rapport financier
router.get('/reports/commissions', financeController.generateCommissionReport);

// Obtenir les statistiques financières
router.get('/statistics', financeController.getFinancialStatistics);

module.exports = router;

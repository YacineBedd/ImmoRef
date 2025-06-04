const Reference = require('../models/reference.model');
const Property = require('../models/property.model');
const Client = require('../models/client.model');
const Commission = require('../models/commission.model');
const { validationResult } = require('express-validator');

// Contrôleur pour les références
const referenceController = {
  // Obtenir toutes les références
  getAllReferences: async (req, res) => {
    try {
      // Filtrer selon le rôle de l'utilisateur
      let references;
      
      if (req.user.role === 'admin') {
        // Les admins peuvent voir toutes les références
        references = await Reference.find()
          .populate('client', 'firstName lastName email')
          .populate('property', 'address price')
          .populate('referrer', 'firstName lastName email')
          .populate('referee', 'firstName lastName email');
      } else {
        // Les courtiers ne voient que leurs références
        references = await Reference.find({
          $or: [
            { referrer: req.user.id },
            { referee: req.user.id }
          ]
        })
          .populate('client', 'firstName lastName email')
          .populate('property', 'address price')
          .populate('referrer', 'firstName lastName email')
          .populate('referee', 'firstName lastName email');
      }
      
      res.json(references);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Obtenir une référence par ID
  getReferenceById: async (req, res) => {
    try {
      const reference = await Reference.findById(req.params.id)
        .populate('client', 'firstName lastName email phone')
        .populate('property')
        .populate('referrer', 'firstName lastName email organization')
        .populate('referee', 'firstName lastName email organization');

      if (!reference) {
        return res.status(404).json({ message: 'Référence non trouvée' });
      }

      // Vérifier que l'utilisateur a le droit d'accéder à cette référence
      if (
        req.user.role !== 'admin' && 
        reference.referrer.toString() !== req.user.id && 
        reference.referee.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: 'Accès non autorisé à cette référence' });
      }

      res.json(reference);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Créer une nouvelle référence
  createReference: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { client, property, referee, consentObtained, notes } = req.body;

    try {
      // Vérifier que le client existe
      const clientExists = await Client.findById(client);
      if (!clientExists) {
        return res.status(404).json({ message: 'Client non trouvé' });
      }

      // Vérifier que la propriété existe
      const propertyExists = await Property.findById(property);
      if (!propertyExists) {
        return res.status(404).json({ message: 'Propriété non trouvée' });
      }

      // Créer la nouvelle référence
      const newReference = new Reference({
        client,
        property,
        referrer: req.user.id, // L'utilisateur connecté est le référent
        referee,
        consentObtained,
        consentDate: consentObtained ? Date.now() : null,
        notes,
        status: 'pending'
      });

      const reference = await newReference.save();

      res.status(201).json(reference);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Mettre à jour une référence
  updateReference: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let reference = await Reference.findById(req.params.id);

      if (!reference) {
        return res.status(404).json({ message: 'Référence non trouvée' });
      }

      // Vérifier que l'utilisateur a le droit de modifier cette référence
      if (
        req.user.role !== 'admin' && 
        reference.referrer.toString() !== req.user.id && 
        reference.referee.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: 'Accès non autorisé à cette référence' });
      }

      // Mettre à jour les champs
      const { status, notes } = req.body;
      
      if (status) reference.status = status;
      if (notes) reference.notes = notes;
      
      reference.updatedAt = Date.now();

      const updatedReference = await reference.save();

      res.json(updatedReference);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Supprimer une référence
  deleteReference: async (req, res) => {
    try {
      const reference = await Reference.findById(req.params.id);

      if (!reference) {
        return res.status(404).json({ message: 'Référence non trouvée' });
      }

      // Seul l'admin ou le référent peut supprimer une référence
      if (req.user.role !== 'admin' && reference.referrer.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Accès non autorisé' });
      }

      await reference.remove();

      res.json({ message: 'Référence supprimée' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Obtenir les références par courtier référent
  getReferencesByReferrer: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Vérifier que l'utilisateur a le droit de voir ces références
      if (req.user.role !== 'admin' && req.user.id !== userId) {
        return res.status(403).json({ message: 'Accès non autorisé' });
      }

      const references = await Reference.find({ referrer: userId })
        .populate('client', 'firstName lastName email')
        .populate('property', 'address price')
        .populate('referee', 'firstName lastName email organization');

      res.json(references);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Obtenir les références par courtier référé
  getReferencesByReferee: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Vérifier que l'utilisateur a le droit de voir ces références
      if (req.user.role !== 'admin' && req.user.id !== userId) {
        return res.status(403).json({ message: 'Accès non autorisé' });
      }

      const references = await Reference.find({ referee: userId })
        .populate('client', 'firstName lastName email')
        .populate('property', 'address price')
        .populate('referrer', 'firstName lastName email organization');

      res.json(references);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Mettre à jour la commission d'une référence
  updateCommission: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let reference = await Reference.findById(req.params.id);

      if (!reference) {
        return res.status(404).json({ message: 'Référence non trouvée' });
      }

      // Vérifier que l'utilisateur a le droit de modifier cette commission
      if (
        req.user.role !== 'admin' && 
        reference.referee.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: 'Accès non autorisé à cette commission' });
      }

      // Mettre à jour les champs de commission
      const { amount, percentage, status, paymentDate } = req.body;
      
      reference.commission.amount = amount;
      reference.commission.percentage = percentage;
      reference.commission.status = status;
      
      if (status === 'paid' && paymentDate) {
        reference.commission.paymentDate = paymentDate;
      }
      
      reference.updatedAt = Date.now();

      const updatedReference = await reference.save();

      // Si la commission est approuvée ou payée, créer ou mettre à jour l'entrée dans la collection Commission
      if (status === 'approved' || status === 'paid') {
        let commission = await Commission.findOne({ reference: reference._id });
        
        if (!commission) {
          commission = new Commission({
            reference: reference._id,
            dossier: req.body.dossier,
            amount,
            percentage,
            payer: reference.referee,
            receiver: reference.referrer,
            status,
            paymentDate: status === 'paid' ? paymentDate : null
          });
        } else {
          commission.amount = amount;
          commission.percentage = percentage;
          commission.status = status;
          commission.paymentDate = status === 'paid' ? paymentDate : null;
        }
        
        await commission.save();
      }

      res.json(updatedReference);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};

module.exports = referenceController;

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const messageController = require('../controllers/message.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Obtenir tous les messages d'un dossier
router.get('/dossier/:dossierId', messageController.getMessagesByDossier);

// Obtenir un message par ID
router.get('/:id', messageController.getMessageById);

// Créer un nouveau message
router.post(
  '/',
  [
    check('dossier', 'L\'ID du dossier est requis').not().isEmpty(),
    check('content', 'Le contenu du message est requis').not().isEmpty(),
    check('recipients', 'La liste des destinataires est requise').isArray()
  ],
  messageController.createMessage
);

// Marquer un message comme lu
router.put('/:id/read', messageController.markMessageAsRead);

// Ajouter une pièce jointe à un message
router.post(
  '/:id/attachments',
  [
    check('document', 'L\'ID du document est requis').not().isEmpty()
  ],
  messageController.addAttachment
);

// Supprimer un message
router.delete('/:id', messageController.deleteMessage);

// Obtenir les messages non lus pour un utilisateur
router.get('/unread/user', messageController.getUnreadMessages);

module.exports = router;

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const documentController = require('../controllers/document.controller');
const authMiddleware = require('../middleware/auth.middleware');
const uploadMiddleware = require('../middleware/upload.middleware');

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Obtenir tous les documents
router.get('/', documentController.getAllDocuments);

// Obtenir un document par ID
router.get('/:id', documentController.getDocumentById);

// Télécharger un document
router.get('/:id/download', documentController.downloadDocument);

// Uploader un nouveau document
router.post(
  '/upload',
  uploadMiddleware.single('file'),
  [
    check('name', 'Le nom du document est requis').not().isEmpty(),
    check('description', 'La description est requise').optional()
  ],
  documentController.uploadDocument
);

// Mettre à jour les métadonnées d'un document
router.put(
  '/:id',
  [
    check('name', 'Le nom du document est requis').optional(),
    check('description', 'La description est requise').optional(),
    check('isPublic', 'Le statut public doit être un booléen').optional().isBoolean()
  ],
  documentController.updateDocument
);

// Supprimer un document
router.delete('/:id', documentController.deleteDocument);

// Obtenir les documents par dossier
router.get('/dossier/:dossierId', documentController.getDocumentsByDossier);

// Obtenir les documents par client
router.get('/client/:clientId', documentController.getDocumentsByClient);

// Partager un document avec d'autres utilisateurs
router.post(
  '/:id/share',
  [
    check('users', 'La liste des utilisateurs est requise').isArray()
  ],
  documentController.shareDocument
);

// Synchroniser avec Google Drive
router.post(
  '/:id/sync-drive',
  documentController.syncWithGoogleDrive
);

module.exports = router;

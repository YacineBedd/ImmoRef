const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware pour vérifier si l'utilisateur est un administrateur
exports.isAdmin = async (req, res, next) => {
  try {
    // L'utilisateur est déjà authentifié par le middleware auth.middleware
    // Vérifier si l'utilisateur a le rôle d'administrateur
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Vous devez être administrateur pour accéder à cette ressource.'
      });
    }
    
    // Si l'utilisateur est un administrateur, passer au middleware suivant
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification des droits d\'administrateur',
      error: error.message
    });
  }
};

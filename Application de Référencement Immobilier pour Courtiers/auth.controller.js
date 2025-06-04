const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète_jwt';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'votre_clé_secrète_refresh';
const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE || '7d';

// Contrôleur d'authentification
const authController = {
  // Inscription d'un nouvel utilisateur
  register: async (req, res) => {
    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, role, organization, phone } = req.body;

    try {
      // Vérifier si l'utilisateur existe déjà
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
      }

      // Créer un nouvel utilisateur
      user = new User({
        firstName,
        lastName,
        email,
        password,
        role,
        organization,
        phone
      });

      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Sauvegarder l'utilisateur
      await user.save();

      // Créer le payload JWT
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      // Générer le token JWT
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
      const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });

      res.status(201).json({
        token,
        refreshToken,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Connexion d'un utilisateur
  login: async (req, res) => {
    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Vérifier si l'utilisateur existe
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Identifiants invalides' });
      }

      // Vérifier si l'utilisateur est actif
      if (!user.isActive) {
        return res.status(403).json({ message: 'Compte désactivé. Veuillez contacter l\'administrateur.' });
      }

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Identifiants invalides' });
      }

      // Mettre à jour la date de dernière connexion
      user.lastLogin = Date.now();
      await user.save();

      // Créer le payload JWT
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      // Générer le token JWT
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
      const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });

      res.json({
        token,
        refreshToken,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Rafraîchir le token
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Aucun token de rafraîchissement fourni' });
    }

    try {
      // Vérifier le token de rafraîchissement
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      
      // Créer un nouveau payload
      const payload = {
        user: {
          id: decoded.user.id,
          role: decoded.user.role
        }
      };

      // Générer un nouveau token JWT
      const newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
      
      res.json({ token: newToken });
    } catch (err) {
      console.error(err.message);
      res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  },

  // Déconnexion
  logout: async (req, res) => {
    // Dans une implémentation réelle, on pourrait ajouter le token à une liste noire
    // ou utiliser une base de données Redis pour stocker les tokens invalidés
    res.json({ message: 'Déconnexion réussie' });
  },

  // Demande de réinitialisation de mot de passe
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet email' });
      }

      // Générer un token de réinitialisation (dans une implémentation réelle, on l'enverrait par email)
      const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

      // Dans une implémentation réelle, on enverrait un email avec un lien contenant le token
      // Pour cette démo, on renvoie simplement le token
      res.json({ 
        message: 'Instructions de réinitialisation envoyées par email',
        resetToken // À supprimer en production
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Réinitialisation du mot de passe
  resetPassword: async (req, res) => {
    const { token, password } = req.body;

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.userId;

      // Trouver l'utilisateur
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Hasher le nouveau mot de passe
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Sauvegarder l'utilisateur
      await user.save();

      res.json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (err) {
      console.error(err.message);
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token invalide' });
      }
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};

module.exports = authController;

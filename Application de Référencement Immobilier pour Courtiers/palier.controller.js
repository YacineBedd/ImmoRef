const Palier = require('../models/palier.model');

// Récupérer tous les paliers
exports.getAllPaliers = async (req, res) => {
  try {
    // Récupérer les paliers triés par seuil
    const paliers = await Palier.find().sort({ seuil: 1 });
    
    res.status(200).json({
      success: true,
      count: paliers.length,
      data: paliers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des paliers',
      error: error.message
    });
  }
};

// Récupérer un palier par son ID
exports.getPalierById = async (req, res) => {
  try {
    const palier = await Palier.findById(req.params.id);
    
    if (!palier) {
      return res.status(404).json({
        success: false,
        message: 'Palier non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      data: palier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du palier',
      error: error.message
    });
  }
};

// Créer un nouveau palier
exports.createPalier = async (req, res) => {
  try {
    // Vérifier si un palier avec le même seuil existe déjà
    const existingPalier = await Palier.findOne({ seuil: req.body.seuil });
    if (existingPalier) {
      return res.status(400).json({
        success: false,
        message: 'Un palier avec ce seuil existe déjà'
      });
    }
    
    const palier = await Palier.create(req.body);
    
    res.status(201).json({
      success: true,
      data: palier
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création du palier',
      error: error.message
    });
  }
};

// Mettre à jour un palier
exports.updatePalier = async (req, res) => {
  try {
    // Vérifier si le seuil est modifié et s'il existe déjà
    if (req.body.seuil) {
      const existingPalier = await Palier.findOne({ 
        seuil: req.body.seuil,
        _id: { $ne: req.params.id }
      });
      
      if (existingPalier) {
        return res.status(400).json({
          success: false,
          message: 'Un palier avec ce seuil existe déjà'
        });
      }
    }
    
    const palier = await Palier.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!palier) {
      return res.status(404).json({
        success: false,
        message: 'Palier non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      data: palier
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour du palier',
      error: error.message
    });
  }
};

// Supprimer un palier
exports.deletePalier = async (req, res) => {
  try {
    const palier = await Palier.findById(req.params.id);
    
    if (!palier) {
      return res.status(404).json({
        success: false,
        message: 'Palier non trouvé'
      });
    }
    
    await palier.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du palier',
      error: error.message
    });
  }
};

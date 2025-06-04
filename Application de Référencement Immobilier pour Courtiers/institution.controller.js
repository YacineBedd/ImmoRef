const Institution = require('../models/institution.model');

// Récupérer toutes les institutions
exports.getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.status(200).json({
      success: true,
      count: institutions.length,
      data: institutions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des institutions',
      error: error.message
    });
  }
};

// Récupérer une institution par son ID
exports.getInstitutionById = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    
    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Institution non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      data: institution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'institution',
      error: error.message
    });
  }
};

// Créer une nouvelle institution
exports.createInstitution = async (req, res) => {
  try {
    // Vérifier si une institution avec le même nom existe déjà
    const existingInstitution = await Institution.findOne({ nom: req.body.nom });
    if (existingInstitution) {
      return res.status(400).json({
        success: false,
        message: 'Une institution avec ce nom existe déjà'
      });
    }
    
    const institution = await Institution.create(req.body);
    
    res.status(201).json({
      success: true,
      data: institution
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création de l\'institution',
      error: error.message
    });
  }
};

// Mettre à jour une institution
exports.updateInstitution = async (req, res) => {
  try {
    // Vérifier si le nom est modifié et s'il existe déjà
    if (req.body.nom) {
      const existingInstitution = await Institution.findOne({ 
        nom: req.body.nom,
        _id: { $ne: req.params.id }
      });
      
      if (existingInstitution) {
        return res.status(400).json({
          success: false,
          message: 'Une institution avec ce nom existe déjà'
        });
      }
    }
    
    const institution = await Institution.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Institution non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      data: institution
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'institution',
      error: error.message
    });
  }
};

// Supprimer une institution
exports.deleteInstitution = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    
    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Institution non trouvée'
      });
    }
    
    await institution.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'institution',
      error: error.message
    });
  }
};

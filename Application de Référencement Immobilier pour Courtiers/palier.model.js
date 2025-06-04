const mongoose = require('mongoose');

const palierSchema = new mongoose.Schema({
  seuil: {
    type: Number,
    required: [true, 'Le seuil de volume est requis'],
    min: [0, 'Le seuil ne peut pas être négatif']
  },
  bonus: {
    type: Number,
    required: [true, 'Le pourcentage de bonus est requis'],
    min: [0, 'Le bonus ne peut pas être négatif'],
    max: [5, 'Le bonus ne peut pas dépasser 5%']
  },
  description: {
    type: String,
    trim: true
  },
  actif: {
    type: Boolean,
    default: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  derniereMaj: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware pour mettre à jour la date de dernière modification
palierSchema.pre('save', function(next) {
  this.derniereMaj = Date.now();
  next();
});

palierSchema.pre('findOneAndUpdate', function(next) {
  this.set({ derniereMaj: Date.now() });
  next();
});

// Méthode statique pour vérifier les chevauchements de paliers
palierSchema.statics.verifierChevauchement = async function(seuil, id = null) {
  const query = { seuil: seuil };
  
  // Si un ID est fourni, exclure ce palier de la vérification (pour les mises à jour)
  if (id) {
    query._id = { $ne: id };
  }
  
  const palierExistant = await this.findOne(query);
  return !!palierExistant;
};

const Palier = mongoose.model('Palier', palierSchema);

module.exports = Palier;

const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom de l\'institution est requis'],
    trim: true,
    unique: true
  },
  pourcentage: {
    type: Number,
    required: [true, 'Le pourcentage de commission est requis'],
    min: [0, 'Le pourcentage ne peut pas être négatif'],
    max: [10, 'Le pourcentage ne peut pas dépasser 10%']
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
institutionSchema.pre('save', function(next) {
  this.derniereMaj = Date.now();
  next();
});

institutionSchema.pre('findOneAndUpdate', function(next) {
  this.set({ derniereMaj: Date.now() });
  next();
});

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;

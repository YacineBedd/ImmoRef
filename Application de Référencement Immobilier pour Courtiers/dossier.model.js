const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DossierSchema = new Schema({
  reference: {
    type: Schema.Types.ObjectId,
    ref: 'Reference',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  status: {
    type: String,
    enum: [
      'soumission_initiale',
      'reception_documentation',
      'evaluation_dossier',
      'envoi_preteur',
      'approbation_conditionnelle',
      'approbation_finale',
      'instructions_notaire',
      'complete'
    ],
    default: 'soumission_initiale'
  },
  currentStep: {
    type: Number,
    default: 1,
    min: 1,
    max: 7
  },
  steps: [{
    step: Number,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
    completedDate: Date,
    notes: String
  }],
  documents: [{
    type: Schema.Types.ObjectId,
    ref: 'Document'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dossier', DossierSchema);

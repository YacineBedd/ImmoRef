const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  address: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    province: {
      type: String,
      required: true,
      trim: true
    },
    postalCode: {
      type: String,
      required: true,
      trim: true
    }
  },
  price: {
    type: Number,
    required: true
  },
  downPayment: {
    type: Number,
    required: true
  },
  mortgageAmount: {
    type: Number,
    required: true
  },
  propertyType: {
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'land'],
    default: 'residential'
  },
  description: {
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

module.exports = mongoose.model('Property', PropertySchema);

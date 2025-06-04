const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReferenceSchema = new Schema({
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
  referrer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  commission: {
    amount: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['pending', 'calculated', 'approved', 'paid'],
      default: 'pending'
    },
    paymentDate: {
      type: Date
    }
  },
  consentObtained: {
    type: Boolean,
    required: true,
    default: false
  },
  consentDate: {
    type: Date
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

module.exports = mongoose.model('Reference', ReferenceSchema);

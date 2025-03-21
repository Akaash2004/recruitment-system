const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'accepted'],
    default: 'pending'
  },
  resume: {
    type: String,
    required: true
  },
  coverLetter: String,
  interview: {
    scheduled: Boolean,
    dateTime: Date,
    location: String,
    type: {
      type: String,
      enum: ['onsite', 'virtual']
    },
    notes: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema); 
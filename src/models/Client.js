import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  clientId: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

export default Client;

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test-db';

mongoose.connect(uri);

const schema = new mongoose.Schema({
  term: String,
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('recent-queries', schema);
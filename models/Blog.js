const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    require: true,
  },
  footer: {
    type: String,
  },
  type: {
    type: String,
    default: 'private',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('blog', BlogSchema);

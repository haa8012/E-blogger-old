const config = require('config');

module.exports = {
  AWS_SECRET_ACCESS: config.get('AWS_SECRET_ACCESS'),
  AWS_ACCESS_KEY: config.get(' AWS_ACCESS_KEY'),
};

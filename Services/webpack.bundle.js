const path = require('path');

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve('../../Artemis1.0/UI/Artemis/'),
    filename: 'server.bundle.js'
  }
};
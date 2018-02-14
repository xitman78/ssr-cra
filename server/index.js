process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('ignore-styles');
require('babel-core/register')({ignore: [/(node_modules)/], presets: ['es2015', "react-app"]});

require('./server.js');

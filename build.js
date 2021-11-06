const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');
config.optimization.minimizer[0].options.minimize=false;
//defaults.config = config;
//module.exports = defaults;
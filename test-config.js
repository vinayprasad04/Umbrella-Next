const config = require('./next.config.js');

console.log('Config:', config);
console.log('generateBuildId type:', typeof config.generateBuildId);
console.log('generateBuildId function:', config.generateBuildId);

if (typeof config.generateBuildId === 'function') {
  console.log('Calling generateBuildId:', config.generateBuildId());
}

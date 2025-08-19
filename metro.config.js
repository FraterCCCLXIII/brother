const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Basic configuration for development
config.resolver.platforms = ['ios', 'android', 'native'];

module.exports = config;


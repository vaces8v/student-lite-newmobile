const { getDefaultConfig: getDefaultExpoConfig } = require("@expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultExpoConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });

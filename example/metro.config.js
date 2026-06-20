const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

// Expo's getDefaultConfig already auto-detects the workspace (it sets
// watchFolders + nodeModulesPaths to include the repo root). We only EXTEND it:
const config = getDefaultConfig(projectRoot);

// 1. Also watch the repo root so the library source (../src) is bundleable.
config.watchFolders = [...new Set([...(config.watchFolders ?? []), workspaceRoot])];

// 2. Resolve `react-native-foonto` to the library source in development.
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-native-foonto': path.resolve(workspaceRoot, 'src'),
};

module.exports = config;

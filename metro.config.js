const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Metro's native file watcher often misses changes across Docker bind mounts on Windows.
config.watcher = {
    ...config.watcher,
    healthCheck: {
        enabled: true,
        interval: 2000,
        timeout: 1000,
    },
};

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });

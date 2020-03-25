const custom = require('../webpack.config.js');

process.env.TARGET_PLATFORM = 'browser';

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', 'storybook-dark-mode/register'],
  webpackFinal: (config) => {
    const c = {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules
      }
    };

    c.resolve.extensions.push('.ts', '.tsx');

    return c;
  },
};

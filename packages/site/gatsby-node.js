const path = require('path');

// eslint-disable-next-line node/exports-style
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        ui: path.resolve(__dirname, 'src/ui'),
        components: path.resolve(__dirname, 'src/components'),
        theme: path.resolve(__dirname, 'src/theme'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        pages: path.resolve(__dirname, 'src/pages'),
        slices: path.resolve(__dirname, 'src/slices'),
        store: path.resolve(__dirname, 'src/store'),
        types: path.resolve(__dirname, 'src/types'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

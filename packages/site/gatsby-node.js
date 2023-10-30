/* eslint-disable node/no-unpublished-require */
/* eslint-disable node/exports-style */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    externals: ['nock', 'mock-aws-s3', 'aws-sdk'],
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      },
    },
  });
};

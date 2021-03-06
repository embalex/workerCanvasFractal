module.exports = {
  webpack: function (config) {
    config.output.globalObject = 'this';
    config.module.rules.push({
      test: [/\.worker\.js$/, /\.subworker\.js$/],
      use: {
        loader: 'worker-loader',
        options: {
          inline: true,
        },
      },
    });
    return config;
  },
  jest: function (config) {
    config.moduleNameMapper = {
      '../../lib': '<rootDir>/__mocks__/FractalMock.js',
    };
    config.collectCoverageFrom = [
      'src/**/*.{js,jsx}',
    ];
    config.snapshotSerializers = [
      '<rootDir>/node_modules/enzyme-to-json/serializer',
    ];

    return config;
  },
  devServer: function (configFunction) {
    return configFunction;
  },
};

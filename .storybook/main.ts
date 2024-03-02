const config = {
  framework: '@storybook/react-webpack5',
  stories: [
    '../packages/component-library/**/*.mdx',
    '../packages/component-library/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  features: {
    storyStoreV7: false,
  },
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config: any) => {
    config.module.rules.push(
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader',
        },
      },
    );
    config.resolve.extensions.push('.tsx', '.ts');
    return config;
  },
};

export default config;

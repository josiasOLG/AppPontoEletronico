import { getDefaultConfig } from 'expo/metro-config';

const defaultConfig = getDefaultConfig(__dirname);

const updatedConfig = {
  ...defaultConfig,
  resolver: {
    ...(defaultConfig.resolver || {}),
    alias: {
      ...((defaultConfig.resolver && (defaultConfig.resolver as any).alias) || {}),
      '@assets': './src/assets',
      '@atoms': './src/atoms',
      '@api': './src/api',
      '@biometric': './src/biometric',
      '@database': './src/database',
      '@molecules': './src/molecules',
      '@organisms': './src/organisms',
      '@pages': './src/pages',
      '@redux': './src/redux',
      '@routes': './src/routes',
      '@secure': './src/secure',
      '@styles': './src/styles',
      '@svg': './src/svg',
      '@utils': './src/Utils',
    },
  },
};

export default updatedConfig;

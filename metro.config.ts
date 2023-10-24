import { getDefaultConfig } from 'expo/metro-config';

const defaultConfig = getDefaultConfig(__dirname);

const updatedConfig = {
  ...defaultConfig,
  resolver: {
    ...(defaultConfig.resolver || {}),
    alias: {
      ...((defaultConfig.resolver && (defaultConfig.resolver as any).alias) || {}),
      '@assets': './src/assets',
      '@components': './src/components',
    },
  },
};

export default updatedConfig;

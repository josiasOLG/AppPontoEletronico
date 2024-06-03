const environments = {
  localhost: {
    apiUrl: "http://192.168.1.7:5000",
    environment: "localhost",
  },
  dev: {
    apiUrl: "http://api.trucogolds.info/api",
    environment: "dev",
  },
  uat: {
    apiUrl: "http://api.trucogolds.info/api",
    environment: "uat",
  },
  prod: {
    apiUrl: "http://api.trucogolds.info/api",
    environment: "prod",
  },
} as const;

const env: string = (process.env.EXPO_ENV || "localhost").trim();
let selectedEnvironment:
  | (typeof environments)[keyof typeof environments]
  | undefined;

if (environments[env as keyof typeof environments]) {
  selectedEnvironment = environments[env as keyof typeof environments];
}

const config = {
  name: "ponto-eletronico",
  slug: "ponto-eletronico2",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  plugins: [
    "expo-secure-store",
    [
      "expo-local-authentication",
      {
        faceIDPermission: "Allow $(PRODUCT_NAME) to use Face ID.",
      },
    ],
    [
      "expo-build-properties",
      {
        android: {},
        ios: {
          deploymentTarget: "13.4",
        },
      },
    ],
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
        recordAudioAndroid: true,
      },
    ],
  ],
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#20B2AA",
  },
  extra: {
    ...selectedEnvironment,
    eas: {
      projectId: "11f0d330-6ca1-48e1-8e1a-f75f39d6de9d",
    },
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.suaempresa.pontoeletronico",
    infoPlist: {
      NSFaceIDUsageDescription:
        "Esse aplicativo usa o Face ID para garantir uma experiência segura.",
    },
  },
  android: {
    package: "com.suaempresa.pontoeletronico",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#20B2AA",
    },
    usesCleartextTraffic: true,
    config: {
      googleMaps: {
        apiKey: "AIzaSyDn5nUDUhWfFGzi72PRx5TsMtLYop8-owQ",
      },
    },
    // Adicione a configuração do Hermes aqui
    jsEngine: "hermes",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};

export default config;

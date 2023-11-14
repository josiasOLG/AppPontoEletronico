export const environments = {
  "localhost": {
    apiUrl: "http://192.168.1.7:5000",
    environment: 'localhost',
  },
  "dev": {
    apiUrl: "http://api.trucogolds.info/api",
    environment: 'dev',
  },
  "uat": {
    apiUrl: "http://api.trucogolds.info/api",
    environment: 'uat',
  },
  "prod": {
    apiUrl: "http://api.trucogolds.info/api",
    environment: 'prod',
  },
} as const;

import 'dotenv/config';

const config = {
  name: "ponto-eletronico",
  slug: "ponto-eletronico",
  extra: {
    environment: process.env.ENVIRONMENT,
    apiUrl: process.env.API_URL,
  },
};

export default config;

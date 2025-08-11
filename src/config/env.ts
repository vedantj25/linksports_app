const expoConfig = require('../../app.json');
const extra = expoConfig?.expo?.extra || {};

export const ENV = {
  API_BASE_URL: (__DEV__ ? extra.apiBaseUrlDev : extra.apiBaseUrlProd) || 'http://localhost:3000/api/v1'
};


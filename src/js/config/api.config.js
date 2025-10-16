// src/js/config/api.config.js
(function () {
  const BASE = 'http://localhost:8080/api/v1';
  window.API = {
    BASE_URL: BASE,
    AUTH: {
      LOGIN: `${BASE}/auth/login`,
    },
  };
})();

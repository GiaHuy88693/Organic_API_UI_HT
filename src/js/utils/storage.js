// src/js/utils/storage.js
(function () {
  const KEYS = {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token',
  };
  const Storage = {
    setTokens({ accessToken, refreshToken }) {
      if (accessToken) localStorage.setItem(KEYS.ACCESS, accessToken);
      if (refreshToken) localStorage.setItem(KEYS.REFRESH, refreshToken);
    },
    getAccessToken() { return localStorage.getItem(KEYS.ACCESS); },
    getRefreshToken() { return localStorage.getItem(KEYS.REFRESH); },
    clearTokens() {
      localStorage.removeItem(KEYS.ACCESS);
      localStorage.removeItem(KEYS.REFRESH);
    },
    isAuthenticated() { return !!localStorage.getItem(KEYS.ACCESS); },
  };
  window.Storage = Storage;
})();

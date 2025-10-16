// src/js/utils/http.client.js
(function () {
  function normalizeErrorPayload(payload, status) {
    const message =
      payload?.message ||
      payload?.error ||
      payload?.errors?.message ||
      `HTTP ${status || ''}`.trim();

    let errors = null;
    if (Array.isArray(payload?.errors)) {
      errors = payload.errors.map(e => ({
        field: e.field || e.path || e.param || null,
        message: e.message || String(e),
      }));
    } else if (Array.isArray(payload?.data?.errors)) {
      errors = payload.data.errors.map(e => ({
        field: e.field || e.path || e.param || null,
        message: e.message || String(e),
      }));
    }
    return { message, errors };
  }

  async function request(url, { method = 'GET', body, headers, withAuth = false } = {}) {
    const finalHeaders = Object.assign(
      { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      headers || {}
    );

    if (withAuth && window.Storage?.getAccessToken) {
      const token = window.Storage.getAccessToken();
      if (token) finalHeaders['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      // credentials: 'include', // chỉ bật nếu bạn dùng cookie session
    });

    const text = await res.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch (_) {}

    if (!res.ok) {
      const { message, errors } = normalizeErrorPayload(data, res.status);
      return { ok: false, status: res.status, data, message, errors };
    }
    return { ok: true, status: res.status, data };
  }

  window.HttpClient = { request };
})();

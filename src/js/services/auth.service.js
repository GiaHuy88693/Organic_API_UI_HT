// src/js/services/auth.service.js
(function () {
  async function login(email, password) {
    const result = await window.HttpClient.request(window.API.AUTH.LOGIN, {
      method: 'POST',
      body: { email, password },
      withAuth: false,
    });

    if (!result.ok) {
      const { message, errors } = result;
      return { success: false, message, errors };
    }

    const payload = result.data;

    // Nhiều backend đặt token ở các khóa khác nhau -> gom về 1 chuẩn
    const accessToken =
      payload?.accessToken || payload?.token || payload?.jwt || payload?.data?.accessToken || payload?.data?.token;
    const refreshToken =
      payload?.refreshToken || payload?.data?.refreshToken;

    // lưu token nếu có
    window.Storage.setTokens({ accessToken, refreshToken });

    // lấy message thành công (nếu có)
    const successMessage = payload?.message || payload?.data?.message || 'Đăng nhập thành công';

    return { success: true, message: successMessage, data: payload };
  }

  window.AuthService = { login };
})();

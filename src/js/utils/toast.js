// src/js/utils/toast.js
(function () {
  function showToast(text, type = 'info') {
    // type: success | error | info | warn
    Toastify({
      text: text || '',
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      // không set màu cụ thể, dùng default của Toastify;
      // nếu muốn tông màu theo type, có thể thêm className để CSS
      className: `toast-${type}`,
      stopOnFocus: true,
    }).showToast();
  }
  window.Toast = {
    success: (msg) => showToast(msg, 'success'),
    error:   (msg) => showToast(msg, 'error'),
    info:    (msg) => showToast(msg, 'info'),
    warn:    (msg) => showToast(msg, 'warn'),
  };
})();

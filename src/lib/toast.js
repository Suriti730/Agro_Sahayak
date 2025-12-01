export function showToast(message, type = 'info', duration = 3500) {
  try {
    window.dispatchEvent(new CustomEvent('app:toast', { detail: { message, type, duration } }));
  } catch (e) {
    /* noop */
  }
}

export default { showToast };

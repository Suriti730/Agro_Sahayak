// Small cart helper backed by localStorage and broadcast events
const KEY = 'cart';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function write(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  try { window.dispatchEvent(new CustomEvent('cart:update', { detail: cart })); } catch (e) {}
}

export function getCart() { return read(); }

export function addItem(item, qty = 1) {
  const cart = read();
  const idx = cart.findIndex(i => i.id === item.id);
  if (idx >= 0) cart[idx].qty = Math.max(1, cart[idx].qty + qty);
  else cart.push({ ...item, qty: Math.max(1, qty) });
  write(cart);
  return cart;
}

export function updateQty(id, qty) {
  const cart = read().map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
  write(cart);
  return cart;
}

export function removeItem(id) {
  const cart = read().filter(i => i.id !== id);
  write(cart);
  return cart;
}

export function clearCart() { write([]); }

export function subscribe(fn) {
  const handler = (e) => fn(e.detail);
  window.addEventListener('cart:update', handler);
  return () => window.removeEventListener('cart:update', handler);
}

export function totalCount() { return read().reduce((s, i) => s + (i.qty||0), 0); }

export default { getCart, addItem, updateQty, removeItem, clearCart, subscribe, totalCount };

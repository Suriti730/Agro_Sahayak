import React, { useEffect, useState } from 'react';

function ToastItem({ id, message, type, onClose }) {
  const color = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-amber-500';
  useEffect(() => {
    const t = setTimeout(onClose, 750);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`text-white px-4 py-2 rounded-md shadow-md ${color}`}>{message}</div>
  );
}

export default function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const { message, type = 'info', duration } = e.detail || {};
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message, type, duration }]);
    };
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, []);

  const remove = (id) => setToasts((t) => t.filter(x => x.id !== id));

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map(t => (
        <div key={t.id} className="min-w-[220px]">
          <ToastItem id={t.id} message={t.message} type={t.type} onClose={() => remove(t.id)} />
        </div>
      ))}
    </div>
  );
}

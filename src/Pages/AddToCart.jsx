import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, X } from 'lucide-react';
import { Truck, CreditCard, Tag } from 'lucide-react';
import { getCart, updateQty, removeItem, clearCart } from '../lib/cart';

export default function AddToCart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
    const handler = () => setItems(getCart());
    window.addEventListener('cart:update', handler);
    return () => window.removeEventListener('cart:update', handler);
  }, []);

  const inc = (id) => setItems(updateQty(id, (items.find(i=>i.id===id)?.qty||1) + 1));
  const dec = (id) => setItems(updateQty(id, (items.find(i=>i.id===id)?.qty||1) - 1));
  const remove = (id) => setItems(removeItem(id));
  const clearAll = () => { if (confirm('Clear cart?')) { clearCart(); setItems([]); } };

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 5000 ? 0 : (items.length ? 99 : 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-[#F0F6FF] from-white to-slate-50 px-4 ">
      <div className="max-w-6xl mx-auto  ">
        <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-green-600 to-green-700 text-white py-8 px-10 rounded-2xl">
          <div >
            <h1 className="text-3xl font-extrabold">Your Cart</h1>
            <p className="text-s ">Review items before checkout</p>
          </div>
          <div className="flex gap-3 items-center">
            <Link to="/marketplace" className="px-4 py-2 border rounded">Continue shopping</Link>
            <button onClick={clearAll} className="px-4 py-2 bg-red-600 text-white rounded">Clear Cart</button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-xl text-center shadow">Your cart is empty — <Link to="/marketplace" className="text-green-600">browse products</Link></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Items column: spans 3/4 on large screens */}
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg space-y-6">
              {items.map(it => (
                <div key={it.id} className="flex gap-4 items-center p-4 border rounded-2xl hover:shadow-lg transition">
                  <img src={it.image} alt={it.name} className="w-36 h-28 object-cover rounded-xl shadow-sm" />

                  <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="font-semibold text-lg text-gray-900">{it.name}</div>
                          <div className="text-xs text-gray-400 mt-1">Quality verified • {it.stock} in stock</div>
                        </div>

                        <div className="text-right md:text-right">
                          <div className="text-lg font-extrabold text-green-600">₹{it.price}</div>
                          <div className="text-xs text-gray-400">each</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between md:justify-start gap-4">
                        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 gap-2">
                          <button onClick={() => dec(it.id)} className="p-2 rounded-full hover:bg-gray-200"><Minus size={16} /></button>
                          <div className="px-4 font-semibold text-gray-800">{it.qty}</div>
                          <button onClick={() => inc(it.id)} className="p-2 rounded-full hover:bg-gray-200"><Plus size={16} /></button>
                        </div>

                        <button onClick={() => remove(it.id)} className="text-sm text-red-600 hover:underline">Remove</button>

                        <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 border rounded-full text-xs text-gray-500">
                          <Tag size={14} /> Save 5%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar — single column, sticky and full-height on large screens */}
            <aside className="lg:col-span-1 sticky top-24 self-start bg-gradient-to-tr from-white/80 via-slate-50 to-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <Truck size={18} /> <div className="text-xs md:text-sm">Free delivery over ₹5,000 · Secure payment</div>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-500">Items</div>
                  <div className="font-medium text-gray-900">₹{subtotal}</div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div>Shipping</div>
                  <div className="font-medium text-gray-900">{shipping===0? 'Free' : `₹${shipping}`}</div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div>GST (5%)</div>
                  <div className="font-medium text-gray-900">₹{tax}</div>
                </div>

                <div className="border-t pt-4 my-3">
                  <div className="text-xs text-gray-400">Total</div>
                  <div className="text-2xl font-extrabold text-gray-900">₹{total}</div>
                  <div className="text-xs text-gray-400 mt-1">Estimated — taxes & shipping calculated at checkout</div>
                </div>

                <div className="pt-1">
                  <div className="mb-3 text-xs font-semibold text-gray-600">Payment</div>
                  <div className="flex gap-2 items-center mb-4 flex-wrap">
                    {/* <div className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-700"><CreditCard size={16}/> Debit / Credit</div> */}
                    <div className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-700">Cash On Delivery</div>
                    {/* <div className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-700">Netbanking</div> */}
                  </div>

                  <button onClick={() => alert('Checkout not implemented (demo)')} className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg hover:opacity-95 font-bold">Secure Checkout</button>
                </div>

                <div className="mt-4 text-xs text-gray-400">Need more help? Call our support at <strong>1800-123-FARM</strong></div>
              </div>
            </aside>
            
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, clearCart } from '../lib/cart';
import { showToast } from '../lib/toast';

export default function Checkout(){
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [district, setDistrict] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [payment, setPayment] = useState('cod');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setItems(getCart());
  },[]);

  const subtotal = items.reduce((s, it)=> s + it.price * it.qty, 0);
  const shipping = subtotal > 5000 ? 0 : (items.length ? 99 : 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const submit = (e) =>{
    e.preventDefault();
    if(!name || !phone || !address || !pincode || !stateVal || !district || !email){
      showToast('Please fill in all required details','info');
      return;
    }
    // basic validations
    if(!/^\d{10}$/.test(phone)) { showToast('Phone must be 10 digits', 'info'); return; }
    if(!/^\d{6}$/.test(pincode)) { showToast('Pincode must be 6 digits', 'info'); return; }
    if(!/^\S+@\S+\.\S+$/.test(email)) { showToast('Please enter a valid email address', 'info'); return; }
    setProcessing(true);
    setTimeout(()=>{
      // pretend we completed checkout
      const orderId = 'ORD-' + Math.random().toString(36).slice(2,9).toUpperCase();
      // persist order (demo) so admin or user can inspect
      try {
        const store = JSON.parse(localStorage.getItem('orders') || '[]');
        store.unshift({ id: orderId, name, phone, email, state: stateVal, district, pincode, address, items, subtotal, shipping, tax, total, placedAt: new Date().toISOString() });
        localStorage.setItem('orders', JSON.stringify(store));
      } catch (e) {}
      showToast(`Order ${orderId} placed successfully!`, 'success');
      clearCart();
      setProcessing(false);
      navigate('/marketplace');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6FBF6] to-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="mb-4 text-sm text-gray-500">Secure Checkout — Complete your purchase</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery & Payment</h2>

          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Full name</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-200" placeholder="Your full name" required />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-200" placeholder="Mobile number" required />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Pincode</label>
              <input value={pincode} onChange={e=>setPincode(e.target.value)} className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-200" placeholder="6-digit pincode" required />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">State</label>
              <input value={stateVal} onChange={e=>setStateVal(e.target.value)} className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-200" placeholder="State (e.g., Punjab)" required />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">District</label>
              <input value={district} onChange={e=>setDistrict(e.target.value)} className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-200" placeholder="District" required />
            </div>

            <div className="col-span-2 md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-200" placeholder="you@example.com" required />
            </div>

            <div className="col-span-2 md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Delivery Address</label>
              <textarea value={address} onChange={e=>setAddress(e.target.value)} rows={3} className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-200" placeholder="House, street, area, city, state" required />
            </div>

            <div className="col-span-2 md:col-span-2 mt-4">
              <label className="block text-sm text-gray-700 mb-2">Payment method</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`p-3 border rounded-lg cursor-pointer ${payment==='cod' ? 'ring-2 ring-green-200' : ''}`} onClick={()=>setPayment('cod')}>
                  <div className="text-sm font-semibold">Cash on Delivery</div>
                  <div className="text-xs text-gray-400">Pay when you receive</div>
                </label>
                {/* <label className={`p-3 border rounded-lg cursor-pointer ${payment==='card' ? 'ring-2 ring-green-200' : ''}`} onClick={()=>setPayment('card')}>
                  <div className="text-sm font-semibold">Card / UPI / Netbanking</div>
                  <div className="text-xs text-gray-400">Secure online payment</div>
                </label> */}
              </div>
            </div>

            {/* card fields (demo) */}
            {payment === 'card' && (
              <>
                <div className="col-span-2 md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Card number</label>
                  <input className="w-full border px-4 py-3 rounded-lg" placeholder="1234 1234 1234 1234" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Expiry</label>
                  <input className="w-full border px-4 py-3 rounded-lg" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">CVV</label>
                  <input className="w-full border px-4 py-3 rounded-lg" placeholder="123" />
                </div>
              </>
            )}

            <div className="col-span-2 md:col-span-2 mt-4">
              <button type="submit" disabled={processing} className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg hover:opacity-95 font-bold">
                {processing ? 'Processing...' : `Place Order — ₹${total}`}
              </button>
            </div>

            <div className="col-span-2 text-xs text-gray-400 mt-2">By placing the order you agree to our Terms & Conditions and Refund Policy.</div>
          </form>
        </div>

        <aside className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-sm text-gray-500 mb-4">Order Summary</div>
          <div className="space-y-4">
            {items.map(it => (
              <div key={it.id} className="flex items-center gap-3">
                <img src={it.image} alt={it.name} className="w-16 h-12 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">{it.name}</div>
                  <div className="text-xs text-gray-400">Qty: {it.qty} • ₹{it.price} each</div>
                </div>
                <div className="font-medium text-gray-900">₹{it.price * it.qty}</div>
              </div>
            ))}

            <div className="border-t pt-3 text-sm text-gray-600">
              <div className="flex justify-between mb-2"><span>Sub total</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between mb-2"><span>Shipping</span><span>{shipping===0? 'Free' : `₹${shipping}`}</span></div>
              <div className="flex justify-between mb-3"><span>GST (5%)</span><span>₹{tax}</span></div>
              <div className="flex justify-between text-lg font-extrabold text-gray-900"><span>Total</span><span>₹{total}</span></div>
            </div>

            {/* <div className="mt-4 text-xs text-gray-400">Secure payments powered by test gateway — demo only</div> */}
          </div>
        </aside>
      </div>
    </div>
  );
}

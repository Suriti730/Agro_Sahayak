import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { ShoppingCart } from 'lucide-react';
import { totalCount, subscribe } from '../lib/cart';
import { showToast } from '../lib/toast';


function Navbar() {
  return (
    <nav className="bg-green-100 shadow px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="h-8" />

        <Link to="/" className="text-xl font-semibold text-green-800">Agro Sahayak</Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium items-center">

        {/* Home */}
        <li>
          <Link to="/" className="hover:text-green-700">Home</Link>
        </li>

        {/* Crop Services: show real links only for signed-in users; signed-out users open sign-in modal instead */}
        <SignedIn>
          <li className="relative">
            <div className="group flex items-center gap-1 cursor-pointer relative">
              <span className="hover:text-green-700 flex items-center gap-1">
                Crop Services <ChevronDown size={16} />
              </span>
              <ul className="absolute top-full left-0 hidden group-hover:block bg-white text-sm text-gray-800 rounded-md shadow-lg min-w-[180px] z-50">
                <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                  <Link to="/crop-advisor">Crop Advisor</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                  <Link to="/soil-testing">Soil Testing</Link>
                </li>
              </ul>
            </div>
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <button onClick={() => showToast('Please sign in to access Crop Services', 'info')} className="flex items-center gap-1 hover:text-green-700">
              Crop Services <ChevronDown size={16} />
            </button>
          </li>
        </SignedOut>

        <SignedIn>
          {/* Marketplace */}
          <li className="relative">
            <Link to="/marketplace" className="hover:text-green-700">Marketplace</Link>
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <button onClick={() => showToast('Please sign in to access Marketplace', 'info')} className="hover:text-green-700">Marketplace</button>
          </li>
        </SignedOut>

        <SignedIn>
          {/* Farm Connect */}
          <li className="relative">
            <div className="group flex items-center gap-1 cursor-pointer relative">
              <Link to="/mandi" className="hover:text-green-700">Mandi Price</Link>
              {/* <ul className="absolute top-full left-0 hidden group-hover:block bg-white text-sm text-gray-800 rounded-md shadow-lg min-w-[180px] z-50">
              <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                <Link to="/sell-crop">Sell Your Crop</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                <Link to="/events-schemes">Events & Schemes</Link>
              </li>
            </ul> */}
            </div>
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <button onClick={() => showToast('Please sign in to access Mandi Price', 'info')} className="hover:text-green-700">Mandi Price</button>
          </li>
        </SignedOut>

        {/* Weather: navigate only when signed-in, otherwise open sign-in modal */}
        <SignedIn>
          <li>
            <Link to="/weather" className="hover:text-green-700">Weather</Link>
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <button onClick={() => showToast('Please sign in to view weather', 'info')} className="hover:text-green-700">Weather</button>
          </li>
        </SignedOut>
        {/* Admin */}
        {/* <li>
          <Link to="/admin" className="hover:text-green-700">Admin</Link>
        </li> */}
      </ul>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">

        {/* Language Dropdown */}
        {/* <div className="relative text-gray-700 font-medium cursor-pointer hidden md:block">
    <select className="appearance-none bg-transparent pr-5 cursor-pointer">
      <option value="EN">EN</option>
      <option value="PA">ਪੰਜਾਬੀ</option>
      <option value="HI">हिंदी</option>
    </select>
    <span className="absolute right-0 top-1 text-xs pointer-events-none">▼</span>
  </div> */}

        {/* Login / Signup */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Create an account
            </button>
          </SignInButton>
        </SignedOut>

        {/* User Profile + Cart (signed-in only) */}
        <SignedIn>
          <SignedInInner />
        </SignedIn>
      </div>
    </nav>
  );
}

function SignedInInner() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      setCount(totalCount());
      const unsub = subscribe((newCart) => {
        setCount((newCart || []).reduce((s, i) => s + (i.qty || 0), 0));
      });
      return () => unsub && unsub();
    } catch (e) {
      // if cart helper not available, skip
    }
  }, []);

  return (
    <div className="flex items-center gap-5">
      {count > 0 && (
        <Link to="/cart" className="relative p-2 rounded hover:bg-white hidden md:inline-flex items-center">
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-1 text-xs">{count}</span>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Navbar;

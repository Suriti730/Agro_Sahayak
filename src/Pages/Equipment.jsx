import React from "react";

import BgImage from "../assets/BG.jpg";
import { Link } from "react-router-dom";
const Equipment = () => {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div
        className="bg-cover bg-center text-white py-32 px-4"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            From Plowing to Harvesting, Rent the Right Tools
          </h1>
          <p className="mt-4 text-lg">
            Browse verified equipment, compare rates, and book directly online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link
              to="/equipment-list"
              className="bg-white text-green-700 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100"
            >
              View Equipment
            </Link>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Ask AI to Help Me
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          <span className="inline-flex items-center gap-2">
            <img src="https://cdn-icons-png.flaticon.com/512/2910/2910791.png" alt="" className="h-6 w-6" />
            Browse Equipment Categories
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center shadow">
            <div className="text-3xl mb-2">🚜</div>
            <h3 className="font-semibold text-lg">Tractors</h3>
            <p className="text-sm text-gray-600">Powerful tractors for all types of needs.</p>
            <Link to="/category/tractors" className="text-green-600 mt-2 inline-block font-medium">View Tractors</Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center shadow">
            <div className="text-3xl mb-2">🌾</div>
            <h3 className="font-semibold text-lg">Harvesters</h3>
            <p className="text-sm text-gray-600">Efficient harvesting tools to save time.</p>
            <Link to="/category/harvesters" className="text-green-600 mt-2 inline-block font-medium">View Harvesters</Link>
          </div>
        </div>

        {/* Voice Help Section */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-700">
            Not sure what equipment you need? <span className="font-semibold">Ask Agri AI to guide you.</span>
          </p>
          <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            🎙 Start Voice Help
          </button>
        </div>
      </section>

      {/* Featured Equipment (Placeholder Example) */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Top Booked Equipment This Season</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded shadow flex items-center gap-4">
            <img
              src="https://agrisahayak.com/_next/image?url=%2Fimages%2Ftractors%2Fmahindra-475.jpg&w=384&q=75"
              alt="Mahindra 475 DI"
              className="h-28 rounded"
            />
            <div>
              <h3 className="text-md font-semibold">Mahindra 475 DI Tractor</h3>
              <p className="text-sm text-gray-600">Available in Bareilly, UP</p>
              <p className="text-green-700 font-bold">₹850/day</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-green-600 text-white px-4 py-1 rounded text-sm">Book Now</button>
                <button className="bg-white border border-green-600 text-green-600 px-4 py-1 rounded text-sm">Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-6">How Equipment Rental Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-2">🛒</div>
              <h4 className="font-semibold text-lg">Select Equipment</h4>
              <p className="text-sm text-gray-600 mt-1">
                Browse and choose from our wide range of farming equipment.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">📅</div>
              <h4 className="font-semibold text-lg">Pick Your Date</h4>
              <p className="text-sm text-gray-600 mt-1">
                Choose rental duration and confirm your booking.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">🚚</div>
              <h4 className="font-semibold text-lg">We Deliver</h4>
              <p className="text-sm text-gray-600 mt-1">
                Get equipment delivered right to your farm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Quick Prompts */}
      <section className="bg-green-600 text-white py-10 text-center">
        <h2 className="text-xl font-semibold mb-6">Don't know what to rent? Just ask our AI.</h2>
        <button className="bg-white text-green-600 px-6 py-2 rounded font-semibold hover:bg-gray-100 mb-4">
          Ask Agri AI
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 max-w-4xl mx-auto text-sm">
          <div className="bg-green-700 p-3 rounded">"What's the best rotavator for sugarcane?"</div>
          <div className="bg-green-700 p-3 rounded">"Show me harvesters in Nashik"</div>
          <div className="bg-green-700 p-3 rounded">"Rent soil testing kit for 2 days"</div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Left: Logo and Description */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <img src="/logo.png" alt="logo" className="h-8" />
                <span className="text-xl font-semibold text-green-400">Agro Sahayak</span>
              </div>
              <p className="text-sm text-gray-400">Your digital agriculture assistant for better yield, profits & sustainability</p>
            </div>

            {/* Right: Menu Links */}
            <div className="flex-1 flex gap-8">
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/crop-advisor" className="hover:text-white transition-colors">Crop Advisor</Link></li>
                <li><Link to="/soil-testing" className="hover:text-white transition-colors">Soil Testing</Link></li>
              </ul>
              <ul className="space-y-2">
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/equipment" className="hover:text-white transition-colors">Mandi Price</Link></li>
                <li><Link to="/weather" className="hover:text-white transition-colors">Weather</Link></li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a href="https://twitter.com" className="hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
              </a>
              <a href="https://youtube.com" className="hover:text-white transition-colors" aria-label="YouTube">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">Made with ❤️ by Suriti From DAV University</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Equipment;


import React from "react";
import BgImage from "../assets/Bg.jpg";
import { Link } from 'react-router-dom';
import { CheckCircle, Droplets, Leaf, TrendingUp, ArrowRight } from 'lucide-react';

const SoilTesting = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const phoneNumber = event.target.elements.phoneNumber.value;
    const pinCode = event.target.elements.pinCode.value;

    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^\d{6}$/.test(pinCode)) {
      alert("Pincode must be exactly 6 digits.");
      return;
    }

    // Handle form submission logic
    const fullName = event.target.elements.fullName.value.trim();
    const village = event.target.elements.village.value.trim();

    const submission = {
      id: Date.now(),
      fullName,
      phoneNumber,
      pinCode,
      village,
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage so admin panel can read it
    try {
      const existing = JSON.parse(localStorage.getItem('soilSubmissions') || '[]');
      existing.unshift(submission);
      localStorage.setItem('soilSubmissions', JSON.stringify(existing));
    } catch (e) {
      console.error('Could not save submission to localStorage', e);
    }

    // Notify user and reset form
    alert('Form submitted successfully. Our team will contact you soon.');
    event.target.reset();
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white text-gray-900">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-white h-[320px] flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/60"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
            <p className="text-xs font-semibold">Professional Soil Analysis</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Unlock Your Soil's Potential
          </h1>
          <p className="text-base text-green-100 mb-5 leading-relaxed">
            Get comprehensive soil testing to boost crop yield
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-sm">
            Start Booking <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-20 px-4 md:px-6">
        <div className="max-w-md mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-10 text-white">
              <h2 className="text-3xl font-bold mb-2">Book Your Soil Test</h2>
              <p className="text-green-100">Quick and easy registration</p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-3">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition bg-gray-50 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-800 mb-3">Phone Number (+91)</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="10-digit mobile number"
                    required
                    pattern="[0-9]{10}"
                    title="Phone number must be 10 digits"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition bg-gray-50 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="pinCode" className="block text-sm font-semibold text-gray-800 mb-3">Pincode</label>
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    placeholder="6-digit pincode"
                    required
                    pattern="[0-9]{6}"
                    title="Pincode must be 6 digits"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition bg-gray-50 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="village" className="block text-sm font-semibold text-gray-800 mb-3">Village / Area</label>
                  <input
                    type="text"
                    id="village"
                    name="village"
                    placeholder="Your village or area name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition bg-gray-50 placeholder-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:shadow-lg mt-8"
                >
                  Submit Request
                </button>
              </form>

              {/* Benefits Section */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">Why Choose Our Service?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-700"><span className="font-semibold">Accurate Results</span> - Advanced lab testing for precise nutrient analysis</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Leaf className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-700"><span className="font-semibold">Expert Guidance</span> - Personalized recommendations for your crops</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-700"><span className="font-semibold">Boost Yield</span> - Increase productivity by 20-30% with proper amendments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-20 px-4 md:px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What You Get</h2>
            <p className="text-lg text-gray-600">Complete soil analysis with actionable insights for better farming</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border-l-4 border-green-500">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Droplets className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Nutrient Analysis</h3>
              <p className="text-gray-600 text-sm">Comprehensive pH, NPK, and micronutrient testing</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border-l-4 border-emerald-500">
              <div className="bg-emerald-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Crop Recommendations</h3>
              <p className="text-gray-600 text-sm">Suggestions for crops best suited to your soil</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border-l-4 border-green-500">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Yield Boost</h3>
              <p className="text-gray-600 text-sm">Maximize productivity with precise fertilizer guidance</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border-l-4 border-emerald-500">
              <div className="bg-emerald-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">Support long-term soil health and eco-friendly practices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 px-4 md:px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Need Expert Guidance?
          </h3>
          <p className="text-lg text-green-100 mb-8">
            Our AI-powered crop advisor can help you make informed farming decisions
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-green-600 font-bold py-4 px-8 rounded-lg hover:bg-green-50 transition transform hover:scale-105 shadow-lg">
            Talk to AI Assistant <ArrowRight size={20} />
          </button>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Left: Logo and Description */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <img src="/src/logo.png" alt="logo" className="h-8" />
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

export default SoilTesting;

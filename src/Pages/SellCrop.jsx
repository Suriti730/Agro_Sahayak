import React, { useState } from 'react';
import BgImage from "../assets/BG.jpg";
import { Link } from 'react-router-dom'

const SellCrop = () => {
  const [cropName, setCropName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setUploadedFiles([...e.target.files]);
  };

  const handleSubmit = () => {
    console.log("Crop Submitted:", cropName, uploadedFiles);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', color: '#1e293b' }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Sell Your Crops Easily & Securely</h1>
        <p style={{ fontSize: '1.125rem', marginTop: '10px' }}>Connect with verified dealers and get the best price for your harvest — right from your phone.</p>
        <div style={{ marginTop: '20px' }}>
          <button style={btnStylePrimary}>Post a Crop Listing</button>
          <button style={btnStyleSecondary}>View My Listings</button>
        </div>
      </div>

      {/* Upload Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Post a New Crop Listing</h2>
        <div style={cardStyle}>
          <input type="file" multiple onChange={handleFileChange} style={{ marginBottom: '10px' }} />
          <select
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            style={{ padding: '10px', marginBottom: '10px', borderRadius: '8px', width: '100%' }}
          >
            <option value="">Select Crop</option>
            <option value="Wheat">Wheat</option>
            <option value="Rice">Rice</option>
            <option value="Maize">Maize</option>
          </select>
          <button onClick={handleSubmit} style={btnStylePrimary}>Submit Crop for Sale</button>
        </div>
      </div>

      {/* Offers Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Current Offers</h2>
        <div style={cardStyle}>
          <h4>Riyash Trading Co.</h4>
          <p>Wants to buy: Wheat HD-2967</p>
          <p>Quantity: 10 quintals</p>
          <p>Location: Mathura, UP</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button style={btnStyleAccept}>Accept</button>
            <button style={btnStyleSecondary}>Call</button>
            <button style={btnStyleReject}>Reject</button>
          </div>
        </div>
      </div>

      {/* Verified Buyer Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Connect with Verified Buyers</h2>
        <div style={cardStyle}>
          <h4>Singh Agro Traders</h4>
          <p>Crops: Rice, Wheat, Sugarcane</p>
          <button style={btnStylePrimary}>Send Crop Details</button>
        </div>
      </div>

      {/* Market Rates */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Current Market Prices</h2>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={priceBox}>MSP<br /><strong>₹2,015</strong></div>
          <div style={priceBox}>Market Rate<br /><strong>₹2,150</strong></div>
          <div style={priceBox}>Platform Avg.<br /><strong>₹2,250</strong></div>
        </div>
      </div>

      {/* Smart Agent */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Smart Agent to Guide You</h2>
        <div style={cardStyle}>
          <input placeholder="What crop should I grow now?" style={inputStyle} />
          <input placeholder="Help me post wheat" style={inputStyle} />
          <input placeholder="Find buyers in Bihar" style={inputStyle} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px', justifyContent: 'space-between' }}>
            <button style={btnStylePrimary}>Talk to Agri AI</button>
            <button style={btnStyleSecondary}>Call Assistant</button>
          </div>
        </div>
      </div>

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

const sectionStyle = {
  padding: '50px 20px',
  maxWidth: '800px',
  margin: '0 auto',
};

const sectionTitle = {
  fontSize: '1.75rem',
  fontWeight: '600',
  marginBottom: '20px',
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
};

const inputStyle = {
  padding: '10px',
  width: '100%',
  marginBottom: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
};

const btnStylePrimary = {
  backgroundColor: '#10b981',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const btnStyleSecondary = {
  backgroundColor: '#3b82f6',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const btnStyleReject = {
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '6px',
};

const btnStyleAccept = {
  backgroundColor: '#22c55e',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '6px',
};

const priceBox = {
  backgroundColor: '#e0f2fe',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  minWidth: '100px',
  flex: '1',
};

export default SellCrop;

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Search, Filter, TrendingUp, DollarSign, MapPin, AlertCircle } from 'lucide-react';

const Mandi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterCommodity, setFilterCommodity] = useState('');
  const [sortBy, setSortBy] = useState('modal_price');

  // Fetch data from Government API
  useEffect(() => {
    const fetchMandiPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000018d8ab0314bf442f37c7f6de672e62521&format=json&limit=50"
        );
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const json = await response.json();
        setData(json.records || []);
        setError('');
      } catch (err) {
        console.error('Error:', err);
        setError('Unable to fetch mandi prices. Please try again later.');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMandiPrices();
  }, []);

  // Get unique states and commodities for filters
  const uniqueStates = [...new Set(data.map(item => item.state))].sort();
  const uniqueCommodities = [...new Set(data.map(item => item.commodity))].sort();

  // Filter and search data
  const filteredData = data
    .filter(item => {
      const matchesSearch = !searchTerm || 
        item.commodity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.market?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.district?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = !filterState || item.state === filterState;
      const matchesCommodity = !filterCommodity || item.commodity === filterCommodity;
      
      return matchesSearch && matchesState && matchesCommodity;
    })
    .sort((a, b) => {
      if (sortBy === 'modal_price') {
        return (parseFloat(b.modal_price) || 0) - (parseFloat(a.modal_price) || 0);
      }
      return 0;
    });

  // Get price statistics
  const getPriceStats = () => {
    if (filteredData.length === 0) return null;
    const prices = filteredData
      .map(item => parseFloat(item.modal_price) || 0)
      .filter(price => price > 0);
    
    return {
      highest: Math.max(...prices),
      lowest: Math.min(...prices),
      average: (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
    };
  };

  const stats = getPriceStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 px-4 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Mandi Prices</h1>
          <p className="text-green-100">Real-time agricultural commodity prices across India</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-20 py-10">
        {/* Price Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Average Price</p>
                  <p className="text-3xl font-bold text-gray-800">₹{stats.average}</p>
                </div>
                <DollarSign className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Highest Price</p>
                  <p className="text-3xl font-bold text-gray-800">₹{Math.round(stats.highest)}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Lowest Price</p>
                  <p className="text-3xl font-bold text-gray-800">₹{Math.round(stats.lowest)}</p>
                </div>
                <DollarSign className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by commodity, market, or district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              >
                <option value="">All States</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Commodity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commodity</label>
              <select
                value={filterCommodity}
                onChange={(e) => setFilterCommodity(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              >
                <option value="">All Commodities</option>
                {uniqueCommodities.slice(0, 20).map(commodity => (
                  <option key={commodity} value={commodity}>{commodity}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredData.length}</span> results
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4">Loading mandi prices...</p>
          </div>
        )}

        {/* Data Table */}
        {!loading && filteredData.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Commodity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">State</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">District</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Market</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Min Price (₹)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Max Price (₹)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Modal Price (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">{item.commodity}</span>
                      </td>
                    
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-gray-700">
                          <MapPin className="w-4 h-4" />
                          {item.state}
                        </span>
                      </td>
                        <td className="px-6 py-4 text-gray-700">{item.district || '-'}</td>
                      <td className="px-6 py-4 text-gray-700">{item.market}</td>
                      <td className="px-6 py-4">
                        <span className="text-red-600 font-medium">₹{Math.round(item.min_price || 0)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-medium">₹{Math.round(item.max_price || 0)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          ₹{Math.round(item.modal_price || 0)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && filteredData.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No results found. Try adjusting your filters.</p>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About Mandi Prices</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="mb-2">
                <strong>Min Price:</strong> The lowest price reported for the commodity in that market on that day.
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Max Price:</strong> The highest price reported for the commodity in that market on that day.
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Modal Price:</strong> The price at which maximum transactions took place. This is the most representative price.
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Data Source:</strong> Government of India - Ministry of Agriculture & Farmers Welfare.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-green-600 rounded-lg my-8 mx-4 md:mx-20 py-12 px-6 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Get Market Insights</h2>
        <p className="mb-6 text-green-100">Check weather forecasts to plan your harvest timing</p>
        <Link 
          to="/weather" 
          className="inline-block bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors"
        >
          View Weather Forecast
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-semibold text-green-400">Agro Sahayak</span>
              </div>
              <p className="text-sm text-gray-400">Real-time mandi prices powered by Government of India API</p>
            </div>

            <div className="flex-1 flex gap-8">
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/crop-advisor" className="hover:text-white transition-colors">Crop Advisor</Link></li>
                <li><Link to="/soil-testing" className="hover:text-white transition-colors">Soil Testing</Link></li>
              </ul>
              <ul className="space-y-2">
                <li><Link to="/mandi" className="hover:text-white transition-colors">Mandi Prices</Link></li>
                <li><Link to="/weather" className="hover:text-white transition-colors">Weather</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">Made with ❤️ by Agro Sahayak Team</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Mandi;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, Search, MapPin, AlertCircle } from 'lucide-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('Delhi');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 28.7041, longitude: 77.1025 });
  const [suggestions, setSuggestions] = useState([]);

  // Predefined Indian agricultural locations
  const locations = [
    { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    // { name: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Ludhiana', lat: 30.9010, lng: 75.8573 },
    { name: 'Patna', lat: 25.5941, lng: 85.1376 },
    { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
    { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Jalandhar', lat: 31.7266, lng: 75.5762 },
  ];

  // Fetch weather data from Open-Meteo API
  const fetchWeather = async (lat, lng, locationName) => {
    setLoading(true);
    setError('');
    try {
      // Current weather and forecast
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Asia/Kolkata`
      );

      if (!response.ok) throw new Error('Failed to fetch weather data');
      
      const data = await response.json();
      setWeatherData({
        location: locationName,
        current: data.current,
        hourly: data.hourly,
        timezone: data.timezone,
      });
      setForecastData(data.daily);
      setLocation(locationName);
      setCoordinates({ latitude: lat, longitude: lng });
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get suggestions as user types
  const handleSearchInputChange = async (value) => {
    setSearchInput(value);
    
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      // Check predefined locations first
      const predefinedMatches = locations.filter(loc =>
        loc.name.toLowerCase().includes(value.toLowerCase())
      );

      if (predefinedMatches.length > 0) {
        setSuggestions(predefinedMatches.map(loc => ({ 
          name: loc.name, 
          lat: loc.lat, 
          lng: loc.lng,
          type: 'predefined'
        })));
      } else {
        // Use Nominatim for search suggestions
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${value},India&format=json&limit=5`
        );
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          setSuggestions(
            data.map(item => ({
              name: item.name || item.display_name.split(',')[0],
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              type: 'search'
            }))
          );
        }
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = async (suggestion) => {
    await fetchWeather(suggestion.lat, suggestion.lng, suggestion.name);
    setSearchInput('');
    setSuggestions([]);
  };

  // Search for location using geocoding
  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    
    try {
      // First check if it's in predefined locations
      const foundLocation = locations.find(
        loc => loc.name.toLowerCase() === searchInput.toLowerCase()
      );

      if (foundLocation) {
        fetchWeather(foundLocation.lat, foundLocation.lng, foundLocation.name);
        setSearchInput('');
      } else {
        // Use Nominatim (OpenStreetMap) geocoding API for any location in India
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${searchInput},India&format=json&limit=1`
        );
        
        const data = await response.json();

        if (data && data.length > 0) {
          const result = data[0];
          const displayName = result.name || searchInput;
          fetchWeather(
            parseFloat(result.lat),
            parseFloat(result.lon),
            displayName
          );
          setSearchInput('');
        } else {
          setError(
            `Location "${searchInput}" not found. Please try another city or state name.`
          );
        }
      }
    } catch (err) {
      setError('Error searching for location. Please try again.');
      console.error(err);
    }
  };

  // Load default location on component mount
  useEffect(() => {
    fetchWeather(coordinates.latitude, coordinates.longitude, 'Delhi');
  }, []);

  // Get weather icon based on weather code
  const getWeatherIcon = (code) => {
    if (!code) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (code === 0 || code === 1) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (code === 2 || code === 3) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (code >= 45 && code <= 48) return <Cloud className="w-8 h-8 text-gray-500" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (code >= 71 && code <= 87) return <CloudRain className="w-8 h-8 text-blue-500" />;
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  // Get weather description
  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Clear Sky',
      1: 'Mostly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Foggy',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      55: 'Dense Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      71: 'Slight Snow',
      73: 'Moderate Snow',
      75: 'Heavy Snow',
      80: 'Slight Rain Showers',
      81: 'Moderate Rain Showers',
      82: 'Violent Rain Showers',
      85: 'Slight Snow Showers',
      86: 'Heavy Snow Showers',
    };
    return descriptions[code] || 'Unknown';
  };

  // Generate farming alerts based on weather
  const generateAlerts = () => {
    const alerts = [];
    const current = weatherData?.current;
    const daily = forecastData;

    if (!current || !daily) return alerts;

    // High temperature alert
    if (current.temperature_2m > 35) {
      alerts.push({
        type: 'warning',
        message: '🌡️ High Temperature Alert: Use irrigation systems to prevent crop stress.',
      });
    }

    // Rain probability alert
    if (daily.precipitation_probability_max[0] > 60) {
      alerts.push({
        type: 'alert',
        message: '🌧️ Heavy Rain Expected: Ensure proper drainage in fields.',
      });
    }

    // Wind speed alert
    if (daily.wind_speed_10m_max[0] > 25) {
      alerts.push({
        type: 'alert',
        message: '💨 Strong Winds Expected: Secure temporary structures.',
      });
    }

    // Low humidity alert
    if (current.relative_humidity_2m < 30) {
      alerts.push({
        type: 'info',
        message: '💧 Low Humidity: Increase irrigation frequency.',
      });
    }

    // Ideal sowing weather
    if (
      current.temperature_2m >= 20 &&
      current.temperature_2m <= 30 &&
      current.relative_humidity_2m >= 50 &&
      daily.precipitation_probability_max[0] > 30
    ) {
      alerts.push({
        type: 'success',
        message: '✅ Ideal Sowing Weather: Conditions are perfect for planting.',
      });
    }

    return alerts;
  };

  const alerts = generateAlerts();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 px-4 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Weather Forecast for Farming</h1>
          <p className="text-green-100">Real-time weather data to optimize your farming decisions</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-20 py-10">
        {/* Location Search and Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your Location</h2>
          
          {/* Search Bar */}
          <div className="flex gap-2 mb-6 relative">
            <div className="flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search any city or state (e.g., Bangalore, Punjab, Jalandhar)..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition border-b last:border-b-0 text-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{suggestion.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>

          {/* Quick Location Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {locations.map((loc) => (
              <button
                key={loc.name}
                onClick={() => fetchWeather(loc.lat, loc.lng, loc.name)}
                className={`py-2 px-3 rounded-lg transition font-medium text-sm ${
                  location === loc.name
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4">Loading weather data...</p>
          </div>
        ) : weatherData ? (
          <>
            {/* Current Weather */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start justify-between">
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <h2 className="text-3xl font-bold">{weatherData.location}</h2>
                  </div>
                  <p className="text-blue-100 text-sm">Last updated: {new Date().toLocaleTimeString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  {getWeatherIcon(weatherData.current.weather_code)}
                  <div>
                    <div className="text-6xl font-bold">{Math.round(weatherData.current.temperature_2m)}°C</div>
                    <p className="text-blue-100">{getWeatherDescription(weatherData.current.weather_code)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Feels Like</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {Math.round(weatherData.current.apparent_temperature)}°C
                    </p>
                  </div>
                  <Sun className="w-12 h-12 text-yellow-400 opacity-50" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Humidity</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {weatherData.current.relative_humidity_2m}%
                    </p>
                  </div>
                  <Droplets className="w-12 h-12 text-blue-400 opacity-50" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Wind Speed</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {Math.round(weatherData.current.wind_speed_10m)} km/h
                    </p>
                  </div>
                  <Wind className="w-12 h-12 text-cyan-400 opacity-50" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Pressure</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {1013} hPa
                    </p>
                  </div>
                  <Gauge className="w-12 h-12 text-purple-400 opacity-50" />
                </div>
              </div>
            </div>

            {/* Weather Alerts */}
            {alerts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Farm Alerts & Recommendations</h3>
                <div className="space-y-3">
                  {alerts.map((alert, idx) => {
                    const bgColor = {
                      success: 'bg-green-50 border-l-4 border-green-500 text-green-700',
                      alert: 'bg-red-50 border-l-4 border-red-500 text-red-700',
                      warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700',
                      info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-700',
                    };
                    return (
                      <div key={idx} className={`p-4 rounded-lg ${bgColor[alert.type]}`}>
                        {alert.message}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 7-Day Forecast */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                {forecastData.time.map((date, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition">
                    <p className="text-gray-700 font-semibold mb-3">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <div className="flex justify-center mb-3">
                      {getWeatherIcon(forecastData.weather_code[idx])}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{getWeatherDescription(forecastData.weather_code[idx])}</p>
                    <div className="flex justify-center gap-2 mb-2">
                      <span className="text-lg font-bold text-red-500">{Math.round(forecastData.temperature_2m_max[idx])}°</span>
                      <span className="text-lg font-bold text-blue-500">{Math.round(forecastData.temperature_2m_min[idx])}°</span>
                    </div>
                    <p className="text-xs text-blue-600">
                      Rain: {forecastData.precipitation_probability_max[idx]}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Farming Tips */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Farming Tips</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Temperature Management */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    🌡️ Temperature Management
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {weatherData.current.temperature_2m > 35
                      ? 'High temperatures detected (>35°C). Use mulching and increase irrigation to prevent crop stress. Apply shade nets for sensitive crops.'
                      : weatherData.current.temperature_2m < 15
                      ? 'Cool weather detected (<15°C). Monitor for frost. Use protective covers at night. Reduce fertilizer application.'
                      : 'Temperature is optimal (15-35°C). Regular monitoring recommended. Ideal for most crop growth cycles.'}
                  </p>
                </div>

                {/* Irrigation Guidance */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    💧 Irrigation Guidance
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {forecastData.precipitation_probability_max[0] > 60
                      ? 'Heavy rain expected (>60%). Cancel/postpone irrigation. Ensure proper field drainage to prevent waterlogging.'
                      : forecastData.precipitation_probability_max[0] > 30
                      ? 'Moderate rain expected. Reduce irrigation by 50%. Monitor soil moisture after rainfall.'
                      : 'No significant rain expected. Maintain regular irrigation schedule. Check soil moisture daily.'}
                  </p>
                </div>

                {/* Humidity & Disease Management */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    🦠 Disease Management
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {weatherData.current.relative_humidity_2m > 70
                      ? 'High humidity (>70%). Risk of fungal diseases. Apply fungicides preventively. Improve air circulation in fields.'
                      : weatherData.current.relative_humidity_2m < 40
                      ? 'Low humidity (<40%). Dust and powdery mildew risk. Increase irrigation. Use organic dusts if needed.'
                      : 'Humidity levels optimal. Continue regular crop monitoring. Maintain preventive spray schedule.'}
                  </p>
                </div>

                {/* Wind Management */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    💨 Wind Management
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {forecastData.wind_speed_10m_max[0] > 25
                      ? `Strong winds expected (${Math.round(forecastData.wind_speed_10m_max[0])} km/h). Secure temporary structures. Stake tall crops. Avoid pesticide spraying.`
                      : forecastData.wind_speed_10m_max[0] > 15
                      ? `Moderate winds (${Math.round(forecastData.wind_speed_10m_max[0])} km/h). Good for pesticide application. Ensure proper plant support.`
                      : 'Wind conditions optimal. Ideal for pesticide/fertilizer application. Good pollination weather.'}
                  </p>
                </div>

                {/* Pest & Insect Management */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    🐛 Pest Management
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {weatherData.current.temperature_2m > 25 && weatherData.current.relative_humidity_2m > 60
                      ? 'Warm & humid conditions favor pest breeding. Increase field monitoring. Apply organic pesticides. Remove pest hotspots.'
                      : weatherData.current.temperature_2m < 15
                      ? 'Cool weather reduces pest activity. Preventive measures sufficient. Maintain field hygiene.'
                      : 'Moderate pest risk. Continue regular field scouting. Use integrated pest management techniques.'}
                  </p>
                </div>

                {/* Crop-Specific Advice */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    🌾 Crop Operations
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {forecastData.precipitation_probability_max[0] > 50 && weatherData.current.temperature_2m > 20
                      ? 'Excellent conditions for sowing. Prepare fields for planting. Ensure seeds are ready.'
                      : forecastData.precipitation_probability_max[0] < 20 && weatherData.current.temperature_2m > 30
                      ? 'Dry conditions. Avoid harvesting. Focus on irrigation and crop maintenance.'
                      : 'Monitor weather trends before major operations. Plan harvest when wind speeds are low.'}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* CTA Section */}
        <section className="bg-green-600 rounded-lg py-12 px-6 text-center text-white mb-8">
          <h2 className="text-3xl font-semibold mb-4">Get Personalized Farming Guidance</h2>
          <p className="mb-6 text-green-100">Use our crop advisor to get recommendations based on current weather</p>
          <Link 
            to="/crop-advisor" 
            className="inline-block bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors"
          >
            Visit Crop Advisor
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-semibold text-green-400">Agro Sahayak</span>
              </div>
              <p className="text-sm text-gray-400">Real-time weather data powered by Open-Meteo API</p>
            </div>

            <div className="flex-1 flex gap-8">
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/crop-advisor" className="hover:text-white transition-colors">Crop Advisor</Link></li>
                <li><Link to="/soil-testing" className="hover:text-white transition-colors">Soil Testing</Link></li>
              </ul>
              <ul className="space-y-2">
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/equipment" className="hover:text-white transition-colors">Equipment</Link></li>
                <li><Link to="/weather" className="hover:text-white transition-colors">Weather</Link></li>
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

export default Weather;

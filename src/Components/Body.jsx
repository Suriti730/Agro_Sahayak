import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

import { 
  Leaf, 
  Beaker, // Replacing Flask
  ShoppingBag, 
  Tractor,
  Store, 
  Cloud, 
  Droplet,
  Wind,
  Banknote,
  MessageCircleCodeIcon
} from "lucide-react";
import { Link } from 'react-router-dom';

const Body = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch weather data for Jalandhar on component mount
  useEffect(() => {
    const fetchJalandharWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=31.7266&longitude=75.5762&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia/Kolkata`
        );
        const data = await response.json();
        
        const weatherDescriptions = {
          0: 'Clear Sky',
          1: 'Mostly Clear',
          2: 'Partly Cloudy',
          3: 'Overcast',
          45: 'Foggy',
          51: 'Drizzle',
          61: 'Rain',
          63: 'Moderate Rain',
          65: 'Heavy Rain',
          71: 'Snow',
          75: 'Heavy Snow',
          80: 'Rain Showers',
          81: 'Moderate Rain Showers',
          82: 'Violent Rain Showers',
        };

        setWeatherData({
          location: 'Jalandhar',
          condition: weatherDescriptions[data.current.weather_code] || 'Unknown',
          temperature: `${Math.round(data.current.temperature_2m)}°C`,
          humidity: `${data.current.relative_humidity_2m}%`,
          wind: `${Math.round(data.current.wind_speed_10m)} km/h`
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchJalandharWeather();
  }, []);

  const services = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Crop Advisor",
      description: "Get the best crops for your land",
      buttonText: "Try Now",
      buttonLink: "/crop-advisor"
    },
    {
      icon: <Beaker className="h-8 w-8 text-green-600" />,
      title: "Soil Testing",
      description: "Book free door-to-door testing",
      buttonText: "Book Test",
      buttonLink: "/soil-testing"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-green-600" />,
      title: "Marketplace",
      description: "Buy seeds, fertilizers & tools",
      buttonText: "Shop Now",
      buttonLink: "/marketplace"
    },
    {
      icon: <Banknote className="h-8 w-8 text-green-600" />,
      title: "Mandi Price",
      description: "Check real-time crop prices",
      buttonText: "Check Prices",
      buttonLink: "/equipment"
    },
   
    {
      icon: <Cloud className="h-8 w-8 text-green-600" />,
      title: "Weather",
      description: " Get accurate weather forecasts",
      buttonText: "View Forecast",
      buttonLink: "/weather"
    },
     {
      icon: <MessageCircleCodeIcon className="h-8 w-8 text-green-600" />,
      title: "Chat With Agro Saathi",
      description: "Get Help from our AI Assistant",
      buttonText: "Chat Now",
      buttonLink: "/chat-app"
    }
  ];

  const upcomingEvents = [
    {
      title: "Soil Health Workshop",
      date: "April 15",
      location: "Nagpur",
      type: "workshop"
    },
    {
      title: "Govt Subsidy Camp",
      date: "April 18",
      location: "Patna",
      type: "government"
    },
    {
      title: "Organic Farming Drive",
      date: "April 22",
      location: "Jaipur",
      type: "organic"
    }
  ];

  const governmentSchemes = [
    {
      title: "PM Kisan Nidhi Yojana",
      description: "Direct benefit transfer scheme for farmers",
      link: "/schemes/pm-kisan"
    },
    {
      title: "Soil Card Scheme",
      description: "Get detailed soil health report",
      link: "/schemes/soil-card"
    }
  ];

  const testimonials = [
    {
      quote: "Agro Sahayak's Crop Advisor helped me increase my yield significantly.",
      name: "Rajesh Kumar",
      location: "Madhya Pradesh",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=70&h=70&fit=crop"
      
    },
    {
      quote: "Mandi Price feature ensured I got the best rates for my produce.",
      name: "Amit Singh",
      location: "Punjab",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=70&h=70&fit=crop"
    },
    {
      quote: "The soil testing service was quick and accurate. Highly recommend!",
      name: "Priya Patel",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=70&h=70&fit=crop"
    }
  ];

  return (
    <>
      {/* Services Section */}
      <section id="services" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">What Can You Do With Agro Sahayak?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  to={service.buttonLink}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md transition-colors w-full text-center"
                >
                  {service.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weather Widget */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-green-50 rounded-lg p-6">
          {loading ? (
            <div className="text-center py-4">
              <p className="text-gray-600">Loading weather data...</p>
            </div>
          ) : weatherData ? (
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">Today in {weatherData.location}</h3>
                <p className="text-gray-600">{weatherData.condition}, {weatherData.temperature}</p>
              </div>
              <div className="flex space-x-8">
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="font-medium">Humidity</p>
                    <p>{weatherData.humidity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wind className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="font-medium">Wind</p>
                    <p>{weatherData.wind}</p>
                  </div>
                </div>
              </div>
              <Link to="/weather" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors">
                View Weekly Forecast
              </Link>
            </div>
          ) : null}
        </div>
      </section>

{/*       
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {event.date} • {event.location}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'workshop' ? 'bg-green-500' : 
                    event.type === 'government' ? 'bg-gray-400' : 'bg-green-200'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

     
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Government Schemes</h2>
            <div className="space-y-4">
              {governmentSchemes.map((scheme, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-medium">{scheme.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{scheme.description}</p>
                  <Link to={scheme.link} className="text-green-600 hover:text-green-700 text-sm inline-flex items-center">
                    Learn More &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">Hear From Our Farmers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/64/64";
                    }}
                  />
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility Tools */}
      {/* <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex justify-center space-x-6 text-gray-600">
          <button className="flex items-center">
            <span className="mr-2">🔊</span>
            Text-to-Speech
          </button>
          <button className="flex items-center">
            <span className="mr-2">🎤</span>
            Speech Input
          </button>
          <button className="flex items-center">
            <span className="mr-2">🌙</span>
            Dark Mode
          </button>
          <button className="flex items-center">
            <span className="mr-2">🌐</span>
            Multi-Language
          </button>
        </div>
      </section> */}

      {/* CTA */}
      <section className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Start Smarter Farming Today</h2>
       
         
          <SignInButton mode="modal">
    <button  className="inline-block bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors">
      Create an account
    </button>
  </SignInButton>
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
              <p className="text-sm text-gray-400">Your digital agriculture assistant for better yield, 
                <br></br>profits & sustainability</p>
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
    </>
  );
};

export default Body;
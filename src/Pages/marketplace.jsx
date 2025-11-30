import React, { useState } from 'react';
import { Heart, Search, Star, X } from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Products database with seeds, fertilizers, and tools
  const products = [
    // Seeds
    {
      id: 1,
      name: 'Hybrid Wheat Seeds',
      category: 'seeds',
      price: 850,
      rating: 4.5,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1585951237318-9ea266f4a837?w=400&h=400&fit=crop',
      description: 'High-yield hybrid wheat seeds with superior disease resistance',
      fullDescription: 'Our premium hybrid wheat seeds are specially bred for maximum yield and disease resistance. Perfect for modern farming techniques with excellent drought tolerance.',
      specifications: {
        'Yield Potential': '50-60 quintals/hectare',
        'Maturity': '120-130 days',
        'Disease Resistance': 'Rust, Powdery Mildew',
        'Seed Rate': '100 kg/hectare',
        'Best Season': 'October-November'
      },
      stock: 50
    },
    {
      id: 2,
      name: 'Premium Rice Seeds',
      category: 'seeds',
      price: 920,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
      description: 'Certified basmati rice seeds for premium crop yield',
      fullDescription: 'Certified basmati rice seeds with long grain quality and superior aroma. Ideal for premium markets with excellent market demand.',
      specifications: {
        'Grain Type': 'Long grain basmati',
        'Yield': '40-45 quintals/hectare',
        'Plant Height': '80-90 cm',
        'Cooking Quality': 'Premium aromatic',
        'Water Requirement': '1200-1500 mm'
      },
      stock: 35
    },
    {
      id: 3,
      name: 'Maize Seeds',
      category: 'seeds',
      price: 650,
      rating: 4.3,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&h=400&fit=crop',
      description: 'High-protein maize seeds suitable for all seasons',
      fullDescription: 'High-protein hybrid maize seeds suitable for both kharif and rabi seasons. Known for their adaptability and consistent performance.',
      specifications: {
        'Protein Content': '12-14%',
        'Yield': '55-60 quintals/hectare',
        'Plant Height': '200-220 cm',
        'Maturity': '100-110 days',
        'Weather Adaptability': 'Excellent'
      },
      stock: 60
    },
    {
      id: 4,
      name: 'Tomato Seeds',
      category: 'seeds',
      price: 420,
      rating: 4.6,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1464226184081-280282069fda?w=400&h=400&fit=crop',
      description: 'Organic tomato seeds for vegetable farming',
      fullDescription: 'Certified organic tomato seeds producing medium-sized, disease-resistant fruits. Perfect for both commercial and home gardens.',
      specifications: {
        'Fruit Type': 'Round, medium',
        'Weight per Fruit': '120-150 grams',
        'Yield': '40-50 tons/hectare',
        'Maturity': '60-65 days',
        'Pest Resistance': 'High'
      },
      stock: 45
    },
    {
      id: 5,
      name: 'Chilli Seeds',
      category: 'seeds',
      price: 550,
      rating: 4.4,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e90?w=400&h=400&fit=crop',
      description: 'Spicy green chilli seeds with high yield potential',
      fullDescription: 'High-yielding green chilli seeds with excellent pungency and market acceptability. Known for consistent pod setting.',
      specifications: {
        'Pod Length': '12-15 cm',
        'Pod Weight': '3-4 grams',
        'Yield': '15-20 tons/hectare',
        'Maturity': '120-140 days',
        'Pungency Level': 'High'
      },
      stock: 40
    },

    // Fertilizers
    {
      id: 6,
      name: 'NPK Fertilizer 20-20-20',
      category: 'fertilizers',
      price: 480,
      rating: 4.8,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1586771724e5-c64dd64d41e6?w=400&h=400&fit=crop',
      description: 'Balanced NPK fertilizer for all crops, 25kg bag',
      fullDescription: 'Premium balanced NPK fertilizer with equal nutrients suitable for all types of crops. Improves overall plant health and productivity.',
      specifications: {
        'Nitrogen': '20%',
        'Phosphorus': '20%',
        'Potassium': '20%',
        'Package Size': '25 kg',
        'Application': 'Broadcast or split application'
      },
      stock: 100
    },
    {
      id: 7,
      name: 'Organic Compost',
      category: 'fertilizers',
      price: 350,
      rating: 4.6,
      reviews: 367,
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop',
      description: 'Pure organic compost for soil enrichment, 20kg bag',
      fullDescription: 'Pure organic compost made from decomposed plant materials. Perfect for improving soil structure and water retention.',
      specifications: {
        'Organic Matter': '40-50%',
        'Carbon:Nitrogen Ratio': '20:1',
        'pH Level': '6.5-7.5',
        'Package Size': '20 kg',
        'Soil Type': 'All types'
      },
      stock: 75
    },
    {
      id: 8,
      name: 'Urea Fertilizer',
      category: 'fertilizers',
      price: 420,
      rating: 4.5,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=400&fit=crop',
      description: 'High nitrogen content urea for leaf growth, 50kg bag',
      fullDescription: 'High-quality urea fertilizer with 46% nitrogen content. Best for promoting vegetative growth and green foliage.',
      specifications: {
        'Nitrogen Content': '46%',
        'Package Size': '50 kg',
        'Application Rate': '100-150 kg/hectare',
        'Solubility': 'Highly soluble',
        'Storage': 'Cool and dry place'
      },
      stock: 85
    },
    {
      id: 9,
      name: 'Phosphate Fertilizer',
      category: 'fertilizers',
      price: 520,
      rating: 4.7,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e90?w=400&h=400&fit=crop',
      description: 'Rich phosphorus fertilizer for root development, 25kg',
      fullDescription: 'Rich phosphorus fertilizer promoting strong root development and flower formation. Essential for fruit-bearing crops.',
      specifications: {
        'Phosphorus Content': '20%',
        'Package Size': '25 kg',
        'Application Rate': '50-75 kg/hectare',
        'Best For': 'Fruiting and flowering',
        'Effectiveness': 'Quick action'
      },
      stock: 60
    },
    {
      id: 10,
      name: 'Potash Fertilizer',
      category: 'fertilizers',
      price: 450,
      rating: 4.4,
      reviews: 212,
      image: 'https://images.unsplash.com/photo-1561566862-eae6344f7cb1?w=400&h=400&fit=crop',
      description: 'Potassium-rich fertilizer for fruit crops, 25kg bag',
      fullDescription: 'Potassium-rich fertilizer enhancing fruit quality and crop resilience. Ideal for all fruit and vegetable crops.',
      specifications: {
        'Potassium Content': '20%',
        'Package Size': '25 kg',
        'Application Rate': '40-60 kg/hectare',
        'Improves': 'Fruit size and quality',
        'Disease Resistance': 'Enhanced'
      },
      stock: 70
    },

    // Tools
    {
      id: 11,
      name: 'Manual Seed Drill',
      category: 'tools',
      price: 2500,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1585951237318-9ea266f4a837?w=400&h=400&fit=crop',
      description: 'Precision seed drill for efficient planting',
      fullDescription: 'Advanced manual seed drill designed for precision planting with minimal seed wastage. Adjustable for different seed sizes.',
      specifications: {
        'Working Width': '30 cm',
        'Seed Rate': 'Adjustable',
        'Row Spacing': 'Variable',
        'Efficiency': '70-80% seed saving',
        'Material': 'Steel and aluminum'
      },
      stock: 25
    },
    {
      id: 12,
      name: 'Hand Cultivator',
      category: 'tools',
      price: 380,
      rating: 4.5,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop',
      description: 'Durable hand cultivator for soil preparation',
      fullDescription: 'Heavy-duty hand cultivator with ergonomic handle design. Perfect for soil loosening and weed removal.',
      specifications: {
        'Number of Tines': '5-6',
        'Tine Material': 'High carbon steel',
        'Handle Length': '90 cm',
        'Weight': '2.5 kg',
        'Suitable For': 'All soil types'
      },
      stock: 40
    },
    {
      id: 13,
      name: 'Water Sprayer (16L)',
      category: 'tools',
      price: 650,
      rating: 4.7,
      reviews: 298,
      image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e90?w=400&h=400&fit=crop',
      description: 'Reliable water sprayer for pesticide and fertilizer application',
      fullDescription: 'Heavy-duty 16L water sprayer with adjustable nozzle. Ideal for uniform application of pesticides and fertilizers.',
      specifications: {
        'Tank Capacity': '16 liters',
        'Spray Range': '6-8 meters',
        'Nozzle Type': 'Adjustable',
        'Material': 'Durable plastic with steel pump',
        'Warranty': '1 year'
      },
      stock: 50
    },
    {
      id: 14,
      name: 'Garden Weeder',
      category: 'tools',
      price: 280,
      rating: 4.4,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1561566862-eae6344f7cb1?w=400&h=400&fit=crop',
      description: 'Ergonomic weeder for easy weed removal',
      fullDescription: 'Ergonomically designed weeder with sharp blade for efficient weed removal. Reduces back strain during use.',
      specifications: {
        'Blade Length': '12 cm',
        'Blade Material': 'Stainless steel',
        'Handle Length': '35 cm',
        'Weight': '200 grams',
        'Grip': 'Cushioned'
      },
      stock: 55
    },
    {
      id: 15,
      name: 'Sickle/Harvesting Tool',
      category: 'tools',
      price: 320,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&h=400&fit=crop',
      description: 'Sharp stainless steel sickle for harvesting crops',
      fullDescription: 'Professional-grade stainless steel sickle with sharp curved blade. Perfect for quick and efficient harvesting.',
      specifications: {
        'Blade Length': '30 cm',
        'Blade Material': 'Stainless steel',
        'Handle Material': 'Wood',
        'Sharpness': 'Razor-sharp edge',
        'Durability': 'Long-lasting'
      },
      stock: 60
    }
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle wishlist
  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.find(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Farm Marketplace</h1>
          <p className="text-green-100">Quality seeds, fertilizers, and tools for better farming</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setSelectedCategory('seeds')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'seeds'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🌱 Seeds
            </button>
            <button
              onClick={() => setSelectedCategory('fertilizers')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'fertilizers'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🥬 Fertilizers
            </button>
            <button
              onClick={() => setSelectedCategory('tools')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'tools'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔧 Tools
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory === 'all' && 'All Products'}
              {selectedCategory === 'seeds' && ' Seeds'}
              {selectedCategory === 'fertilizers' && 'Fertilizers'}
              {selectedCategory === 'tools' && ' Tools'}
              <span className="text-gray-600 ml-2">({filteredProducts.length})</span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition ${
                        wishlist.find(item => item.id === product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Heart className="w-5 h-5" fill={wishlist.find(item => item.id === product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-800">{product.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm">({product.reviews})</span>
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setQuantity(1);
                        }}
                        disabled={product.stock === 0}
                        className={`px-4 py-2 rounded-lg font-bold transition ${
                          product.stock === 0
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg shadow-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Farm?</h2>
            <p className="text-green-100 text-lg mb-6">
              Get premium seeds, fertilizers, and tools at competitive prices. Free delivery on orders above ₹5000.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                Browse All Products
              </button>
              <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-900 transition border-2 border-white">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">About Agro Sahayak</h3>
            <p className="text-sm">Providing quality farming solutions and products to Indian farmers for sustainable agriculture.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Products</a></li>
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-sm mb-2">📧 support@agrosahayak.com</p>
            <p className="text-sm mb-2">📞 1800-123-FARM</p>
            <p className="text-sm">🕒 Available 6AM - 10PM IST</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm">&copy; 2025 Agro Sahayak. All rights reserved. | Empowering Indian Farmers</p>
          </div>
        </div>
      </footer>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-green-800 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Product Image */}
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-800">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2">Price</p>
                    <p className="text-4xl font-bold text-green-600 mb-2">₹{selectedProduct.price}</p>
                    <p className={`text-sm font-semibold ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of Stock'}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-700">{selectedProduct.fullDescription}</p>
                  </div>

                  {/* Quantity Selector */}
                  {selectedProduct.stock > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold"
                        >
                          -
                        </button>
                        <span className="text-2xl font-bold text-gray-800 w-12 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Buy Button */}
                  <button
                    onClick={() => {
                      alert(`Added ${quantity} ${selectedProduct.name}(s) to cart! Total: ₹${selectedProduct.price * quantity}`);
                      setSelectedProduct(null);
                    }}
                    disabled={selectedProduct.stock === 0}
                    className={`w-full py-3 rounded-lg font-bold text-white transition text-lg ${
                      selectedProduct.stock === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {selectedProduct.stock === 0 ? 'Out of Stock' : `Buy Now - ₹${selectedProduct.price * quantity}`}
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`w-full mt-3 py-3 rounded-lg font-bold transition text-lg ${
                      wishlist.find(item => item.id === selectedProduct.id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {wishlist.find(item => item.id === selectedProduct.id) ? '❤️ Wishlist (saved)' : '🤍 Add to Wishlist'}
                  </button>
                </div>
              </div>

              {/* Specifications */}
              {selectedProduct.specifications && (
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 font-semibold">{key}</p>
                        <p className="text-gray-800 font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;

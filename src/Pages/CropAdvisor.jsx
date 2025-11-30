import React, { useState, useEffect } from "react";
import BgImage from "../assets/Bg.jpg";
import { Link } from 'react-router-dom';

const CropAdvisor = () => {
    const [state, setState] = useState("");
    const [soilType, setSoilType] = useState("");
    const [season, setSeason] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedCrops, setSelectedCrops] = useState(["", "", ""]); // Initialize with empty strings, reduced to 3
    const [comparisonResult, setComparisonResult] = useState(null);

    // List of crops for the dropdown.
    const dropdownCrops = [
        "Rice",
        "Wheat",
        "Maize",
        "Chickpea",
        "Sugarcane",
        "Groundnut",
        "Cotton",
        "Soybean",
        "Barley",
        "Sorghum",
        "Mustard",
        "Lentil",
        "Potato",
        "Tomato",
        "Onion",
        "Cabbage"
    ];

    const cropData = [
        {
            title: "Rice",
            tags: ["Clay Soil", "Kharif", "High Water"],
            yield: "6-7 t/acre",
            price: "₹25-30/kg",
            img: "https://t3.ftcdn.net/jpg/08/41/57/10/360_F_841571074_36z4m8I6mgotOJfCEo84t6IF38Lq2I8h.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Uttar Pradesh", "Punjab", "West Bengal", "Bihar", "Odisha"],
            suitableSoils: ["Clay", "Loamy"],
            suitableSeasons: ["Kharif"],
            irrigationRequired: "Yes"
        },
        {
            title: "Wheat",
            tags: ["Loamy Soil", "Rabi", "Medium Water"],
            yield: "4-5 t/acre",
            price: "₹20-25/kg",
            img: "https://images.pexels.com/photos/39015/wheat-field-wheat-cereals-grain-39015.jpeg?w=500&h=400&fit=crop",
            suitableStates: ["Uttar Pradesh", "Punjab", "Haryana", "Madhya Pradesh", "Rajasthan"],
            suitableSoils: ["Loamy", "Silty", "Clay Loam"],
            suitableSeasons: ["Rabi"],
            irrigationRequired: "Yes"
        },
        {
            title: "Maize",
            tags: ["Sandy Loam Soil", "Kharif", "Medium Water"],
            yield: "5-6 t/acre",
            price: "₹18-22/kg",
            img: "https://cdn.pixabay.com/photo/2014/02/23/13/11/maize-272894_1280.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Karnataka", "Rajasthan", "Uttar Pradesh", "Andhra Pradesh", "Telangana"],
            suitableSoils: ["Sandy Loam", "Silty", "Loamy"],
            suitableSeasons: ["Kharif", "Rabi"],
            irrigationRequired: "Yes"
        },
        {
            title: "Chickpea",
            tags: ["Black Soil", "Rabi", "Low Water"],
            yield: "1.5-2 t/acre",
            price: "₹50-60/kg",
            img: "https://www.haifa-group.com/sites/default/files/chickpeas.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Madhya Pradesh", "Rajasthan", "Maharashtra", "Uttar Pradesh"],
            suitableSoils: ["Black", "Loamy", "Sandy Loam"],
            suitableSeasons: ["Rabi"],
            irrigationRequired: "No"
        },
        {
            title: "Sugarcane",
            tags: ["Loamy Soil", "All Season", "High Water"],
            yield: "80-100 t/acre",
            price: "₹3-4/kg",
            img: "https://plantix.net/en/library/assets/custom/crop-images/sugarcane.jpeg?w=500&h=400&fit=crop",
            suitableStates: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu"],
            suitableSoils: ["Loamy", "Clay Loam", "Clay"],
            suitableSeasons: ["All Season"],
            irrigationRequired: "Yes"
        },
        {
            title: "Groundnut",
            tags: ["Sandy Loam Soil", "Kharif", "Medium Water"],
            yield: "1.5-2 t/acre",
            price: "₹60-70/kg",
            img: "https://www.protectourlivelihood.in/wp-content/uploads/2025/04/Image-Groundnut.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Gujarat", "Andhra Pradesh", "Tamil Nadu", "Rajasthan"],
            suitableSoils: ["Sandy Loam", "Silty"],
            suitableSeasons: ["Kharif"],
            irrigationRequired: "Yes"
        },
        {
            title: "Cotton",
            tags: ["Black Soil", "Kharif", "Medium Water"],
            yield: "15-20 quintals/acre",
            price: "₹5000-6000/bale",
            img: "https://fadfay.com/cdn/shop/articles/cotton-plants-are-tall-and-green-with-a-branching--Xi2ktwlpS02wO48TO6CUsw-sqZ-RNRzS1GLIO91uGXvnA.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Gujarat", "Maharashtra", "Andhra Pradesh", "Karnataka"],
            suitableSoils: ["Black", "Loamy"],
            suitableSeasons: ["Kharif"],
            irrigationRequired: "Yes"
        },
        {
            title: "Soybean",
            tags: ["Loamy Soil", "Kharif", "Medium Water"],
            yield: "2-2.5 t/acre",
            price: "₹40-50/kg",
            img: "https://cdn.britannica.com/28/154828-050-05C6239A/Soybeans.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Madhya Pradesh", "Rajasthan", "Maharashtra", "Karnataka"],
            suitableSoils: ["Loamy", "Sandy Loam"],
            suitableSeasons: ["Kharif"],
            irrigationRequired: "No"
        },
        {
            title: "Barley",
            tags: ["Sandy Loam", "Rabi", "Low Water"],
            yield: "3-4 t/acre",
            price: "₹18-22/kg",
            img: "https://cdn.britannica.com/31/75931-050-FED41F1F/Barley.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Rajasthan", "Uttar Pradesh", "Haryana", "Punjab"],
            suitableSoils: ["Sandy Loam", "Loamy", "Silty"],
            suitableSeasons: ["Rabi"],
            irrigationRequired: "No"
        },
        {
            title: "Sorghum",
            tags: ["Black Soil", "Kharif", "Low Water"],
            yield: "3-4 t/acre",
            price: "₹20-25/kg",
            img: "https://cdn.britannica.com/21/136021-050-FA97E7C7/Sorghum.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Karnataka", "Maharashtra", "Rajasthan", "Andhra Pradesh"],
            suitableSoils: ["Black", "Loamy", "Sandy"],
            suitableSeasons: ["Kharif"],
            irrigationRequired: "No"
        },
        {
            title: "Mustard",
            tags: ["Loamy Soil", "Rabi", "Low Water"],
            yield: "1.5-2 t/acre",
            price: "₹45-55/kg",
            img: "https://www.thespruce.com/thmb/dqMSMrErgh6Dzg3aStCpS4jr-E0%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/mustard-plant-growing-guide-7377609_01-7dd11987305340b7a79f41d359514096.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Rajasthan", "Madhya Pradesh", "Haryana", "Punjab"],
            suitableSoils: ["Loamy", "Silty", "Sandy Loam"],
            suitableSeasons: ["Rabi"],
            irrigationRequired: "No"
        },
        {
            title: "Lentil",
            tags: ["Black Soil", "Rabi", "Low Water"],
            yield: "1.2-1.5 t/acre",
            price: "₹55-65/kg",
            img: "https://cdn.britannica.com/54/148154-050-91F7CB39/Lentil.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Madhya Pradesh", "Uttar Pradesh", "Bihar", "Rajasthan"],
            suitableSoils: ["Black", "Loamy"],
            suitableSeasons: ["Rabi"],
            irrigationRequired: "No"
        },
        {
            title: "Potato",
            tags: ["Loamy Soil", "Rabi", "Medium Water"],
            yield: "20-25 t/acre",
            price: "₹10-15/kg",
            img: "https://plantix.net/en/library/assets/custom/crop-images/potato.jpeg?w=500&h=400&fit=crop",
            suitableStates: ["Uttar Pradesh", "Punjab", "West Bengal", "Bihar"],
            suitableSoils: ["Loamy", "Sandy Loam", "Silty"],
            suitableSeasons: ["Rabi", "Zaid"],
            irrigationRequired: "Yes"
        },
        {
            title: "Tomato",
            tags: ["Loamy Soil", "Zaid", "High Water"],
            yield: "25-30 t/acre",
            price: "₹12-18/kg",
            img: "https://cdn.mos.cms.futurecdn.net/9g6DkA7vRH8niqGvBdq6QL.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Karnataka", "Maharashtra", "Madhya Pradesh", "Tamil Nadu"],
            suitableSoils: ["Loamy", "Sandy Loam", "Clay Loam"],
            suitableSeasons: ["Zaid", "Rabi"],
            irrigationRequired: "Yes"
        },
        {
            title: "Onion",
            tags: ["Loamy Soil", "Rabi", "Medium Water"],
            yield: "20-25 t/acre",
            price: "₹15-22/kg",
            img: "https://www.agrifarming.in/wp-content/uploads/Secrets-of-Onion-Farming5.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Gujarat", "Maharashtra", "Karnataka", "Rajasthan"],
            suitableSoils: ["Loamy", "Sandy Loam"],
            suitableSeasons: ["Rabi"],
            irrigationRequired: "Yes"
        },
        {
            title: "Cabbage",
            tags: ["Loamy Soil", "Rabi", "Medium Water"],
            yield: "30-35 t/acre",
            price: "₹8-12/kg",
            img: "https://i.ytimg.com/vi/UPk72G1CIt8/maxresdefault.jpg?w=500&h=400&fit=crop",
            suitableStates: ["Himachal Pradesh", "Punjab", "Haryana", "Uttar Pradesh"],
            suitableSoils: ["Loamy", "Sandy Loam", "Clay Loam"],
            suitableSeasons: ["Rabi", "Zaid"],
            irrigationRequired: "Yes"
        }
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "state":
                setState(value);
                break;
            case "soilType":
                setSoilType(value);
                break;
            case "season":
                setSeason(value);
                break;
            default:
                break;
        }
    };

    const getRecommendations = () => {
        setLoading(true);
        setError("");
        setRecommendations([]);

        // Simulate API call and filter crops (replace with your actual API endpoint)
        try {

            const filteredCrops = cropData.filter(crop => {
                return (state === "" || crop.suitableStates.includes(state)) &&
                    (soilType === "" || crop.suitableSoils.includes(soilType)) &&
                    (season === "" || crop.suitableSeasons.includes(season));
            });
            if (filteredCrops.length === 0) {
                setError("No suitable crops found for the given criteria.");
            }
            setRecommendations(filteredCrops);

        } catch (err) {
            setError("Failed to fetch recommendations. Please try again.");
            console.error("Error fetching recommendations:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCropSelection = (index, cropTitle) => {
        setSelectedCrops(prevSelectedCrops => {
            const newSelectedCrops = [...prevSelectedCrops];
            newSelectedCrops[index] = cropTitle;
            return newSelectedCrops;
        });
    };

    const compareCrops = () => {
        const uniqueSelectedCrops = [...new Set(selectedCrops)]; // Remove duplicates
        if (uniqueSelectedCrops.length < 2 || uniqueSelectedCrops.includes("")) {
            alert("Please select at least two different crops to compare.");
            return;
        }

        const cropsToCompare = cropData.filter(crop => uniqueSelectedCrops.includes(crop.title));
        const comparison = {};

        if (cropsToCompare.length > 0) {
            // Get all unique keys
            const allKeys = cropsToCompare.reduce((keys, crop) => {
                Object.keys(crop).forEach(key => {
                    if (!keys.includes(key)) {
                        keys.push(key);
                    }
                });
                return keys;
            }, []);

            allKeys.forEach(key => {
                if (key !== 'img') { // Exclude comparing image URLs
                    comparison[key] = cropsToCompare.map(crop => ({
                        title: crop.title,
                        value: crop[key] || 'N/A' // Use 'N/A' if a crop doesn't have a value for a key.
                    }));
                }
            });
        }
        setComparisonResult(comparison);
    };

    // useEffect to run when recommendations change, to clear any previous comparison
    useEffect(() => {
        setComparisonResult(null);
        setSelectedCrops(["", "", ""]); // Reset dropdowns
    }, [recommendations]);



    return (
        <div className="bg-[#fefdf9] text-[#1f1f1f]">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center text-white h-[500px] flex items-center justify-start px-10"
                style={{ backgroundImage: `url(${BgImage})` }}
            >
                <div className="absolute inset-0 bg-opacity-40"></div>
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl font-bold mb-4">
                        Find the Best Crops for Your Land
                    </h1>
                    <p className="mb-6 text-lg">
                        Get personalized crop recommendations.
                    </p>
                    {recommendations.length === 0 && (
                        <button
                            onClick={() => document.getElementById('recommendation-form').scrollIntoView({ behavior: 'smooth' })}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
                        >
                            Start Recommendation →
                        </button>
                    )}
                </div>
            </div>

            {/* Recommendation Form */}
            <div id="recommendation-form" className="py-16 px-6 flex justify-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
                    <h2 className="text-xl font-bold mb-6 text-center">
                        Fill in Your Farming Info
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">State</label>
                            <select
                                name="state"
                                value={state}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded-md bg-white"
                            >
                                <option value="">Any State</option>
                                <option>Andhra Pradesh</option>
                                <option>Bihar</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Karnataka</option>
                                <option>Madhya Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Odisha</option>
                                <option>Punjab</option>
                                <option>Rajasthan</option>
                                <option>Tamil Nadu</option>
                                <option>Telangana</option>
                                <option>Uttar Pradesh</option>
                                <option>West Bengal</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Soil Type</label>
                            <select
                                name="soilType"
                                value={soilType}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded-md bg-white"
                            >
                                <option value="">Any Soil</option>
                                <option>Clay</option>
                                <option>Loamy</option>
                                <option>Sandy</option>
                                <option>Silty</option>
                                <option>Sandy Loam</option>
                                <option>Black</option>
                                <option>Clay Loam</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Season</label>
                            <select
                                name="season"
                                value={season}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded-md bg-white"
                            >
                                <option value="">Any Season</option>
                                <option>Kharif</option>
                                <option>Rabi</option>
                                <option>Zaid</option>
                                <option>All Season</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={getRecommendations}
                            disabled={loading}
                            className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Getting Recommendations..." : "Get Recommendations"}
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                </div>
            </div>

            {/* Top Crop Matches */}
            {recommendations.length > 0 && (
                <div className="px-6 pb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Top Crop Matches for You
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {recommendations.map((crop, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-200">
                                <div className="relative h-48 w-full">
                                    <img src={crop.img} className="h-48 w-full object-cover" alt={crop.title} />
                                    <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">{crop.tags[1] || ''}</div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">{crop.title}</h3>
                                        <span className="text-sm text-gray-500">{crop.irrigationRequired === 'Yes' ? '💧 Irrig' : '🌿 Rainfed'}</span>
                                    </div>
                                    <div className="flex gap-2 text-xs my-2 text-gray-500 flex-wrap">
                                        {crop.tags.map((tag, idx) => (
                                            <span key={idx} className="bg-gray-100 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-sm">🌾 {crop.yield}</p>
                                        <p className="text-sm font-semibold">{crop.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Compare Crops */}
            <div className="bg-white py-16 px-6">
                <h2 className="text-2xl font-bold text-center mb-8">
                    Compare Crops Side by Side
                </h2>
                <div className="max-w-4xl mx-auto  rounded-xl p-6 shadow">
                    <div className="mb-4">
                        <p>Fill all the three crop fields. If comparing only two crops, then select a crop in the two fields.</p>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
                            <div className="flex gap-4 w-full">
                                <select
                                    value={selectedCrops[0]}
                                    onChange={(e) => handleCropSelection(0, e.target.value)}
                                    className="border p-2 rounded-md flex-1 min-w-0"
                                >
                                    <option value="">Select Crop 1</option>
                                    {dropdownCrops.map(cropTitle => (
                                        <option key={cropTitle} value={cropTitle}>{cropTitle}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedCrops[1]}
                                    onChange={(e) => handleCropSelection(1, e.target.value)}
                                    className="border p-2 rounded-md flex-1 min-w-0"
                                >
                                    <option value="">Select Crop 2</option>
                                    {dropdownCrops.map(cropTitle => (
                                        <option key={cropTitle} value={cropTitle}>{cropTitle}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedCrops[2]}
                                    onChange={(e) => handleCropSelection(2, e.target.value)}
                                    className="border p-2 rounded-md flex-1 min-w-0"
                                    disabled={selectedCrops[0] === "" || selectedCrops[1] === ""}
                                >
                                    <option value="">Select Crop 3</option>
                                    {dropdownCrops.map(cropTitle => (
                                        <option key={cropTitle} value={cropTitle}>{cropTitle}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-3 md:mt-0 md:ml-4 flex-shrink-0">
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
                                    onClick={compareCrops}
                                    disabled={selectedCrops.filter(Boolean).length < 2} // Disable if less than 2 selected
                                >
                                    Compare Crops
                                </button>
                            </div>
                        </div>
                    </div>

                    {comparisonResult && (
                        <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                            <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">Comparison Results</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                                            <th className="py-3 px-4 font-semibold text-left rounded-tl-md">Criteria</th>
                                            {Array.from(new Set(selectedCrops)).filter(Boolean).map((cropTitle, idx, arr) => (
                                                <th key={cropTitle} className={`py-3 px-4 font-semibold text-center ${idx === arr.length - 1 ? 'rounded-tr-md' : ''}`}>
                                                    {cropTitle}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(comparisonResult).map(([key, values], idx) => {
                                            // Capitalize key and format it
                                            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
                                            
                                            return (
                                                <tr key={key} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50 transition border-b border-gray-200`}>
                                                    <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">{formattedKey}</td>
                                                    {values.map((item) => {
                                                        // Format the value - add commas to arrays
                                                        let displayValue = item.value;
                                                        if (Array.isArray(item.value)) {
                                                            displayValue = item.value.join(', ');
                                                        }
                                                        
                                                        return (
                                                            <td key={item.title} className="py-3 px-4 text-gray-600 text-center">
                                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium inline-block">{displayValue}</span>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ✅ Tips from Agri Experts Section */}
            <div className="bg-[#fefdf9] py-16 px-6">
                <h2 className="text-2xl font-bold text-center mb-10">
                    Tips from Agro Experts
                </h2>
                <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
                    {[
                        {
                            title: "Use Certified Seeds",
                            desc: "Always source your seeds from government-approved suppliers for best results.",
                        },
                        {
                            title: "Rotate Crops",
                            desc: "Regular crop rotation helps maintain soil health and prevents diseases.",
                        },
                        {
                            title: "Monitor Markets",
                            desc: "Keep track of market trends before deciding on your crop selection.",
                        },
                        {
                            title: "Organic Manure",
                            desc: "Use organic manure to improve long-term soil fertility naturally.",
                        },
                    ].map((tip, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
                        >
                            <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                            <p className="text-sm text-gray-600">{tip.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-green-50 text-center py-12 px-4">
                <h3 className="text-lg font-semibold mb-2">
                    Need help choosing the right crop?
                </h3>
                <p className="mb-4 text-sm">
                    Our AI assistant can guide you through the process
                </p>
                <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                    Talk to our AI Assistant
                </button>
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

export default CropAdvisor;
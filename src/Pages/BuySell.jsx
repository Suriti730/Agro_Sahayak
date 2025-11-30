import React from "react";
import BgImage from "../assets/Bg.jpg";
import { Link } from 'react-router-dom';

const BuySell = () =>{
    return(

     <div className="bg-[#fefdf9] text-[#1f1f1f]">
          {/* Hero Section */}
          <div
            className="relative bg-cover bg-center text-white h-[500px] flex items-center justify-start px-10"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <div className="absolute inset-0  bg-opacity-40"></div>
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">
              Sell Smarter. Buy Better.   
              </h1>
              <p className="mb-6 text-lg">
              Connect with verified buyers, get real-time prices, and trade your crops effortlessly all in one trusted platform designed for farmers.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md">
                Buy & Sell →
              </button>
            </div>
          </div>
    
        </div>
    );
};
export default BuySell;
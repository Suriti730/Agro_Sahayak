import BgImage from "../assets/Bg.jpg";
function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-start px-6 md:px-20"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Overlay */}
     

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Empowering Farmers from <br />
          <span className="text-green-400">Soil to Sale</span>
        </h1>
        <p className="mb-6 text-lg">
          Your digital agriculture assistant for better yield, profits & sustainability
        </p>
        <div className="flex gap-4">
        <button 
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
  onClick={() => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
  Explore Services
</button>
          <a href="/crop-advisor" className="border border-white hover:bg-white hover:text-green-700 text-white px-5 py-2 rounded-md inline-block">
      Crop Advisor
          </a>
        
        </div>
      </div>
    </section>
    
  );
}

export default HeroSection;

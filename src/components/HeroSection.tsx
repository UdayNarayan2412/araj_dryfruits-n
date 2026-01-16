import React from 'react';
import { ArrowRight, Star, Award, Shield } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreProducts: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onExploreProducts }) => {
  return (
    <section className="relative h-[85vh] min-h-[550px] flex items-start justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl mb-4 leading-tight animate-text-reveal tracking-tight">
            <span className="font-inter font-normal">Araj's</span>{' '}
            <span className="font-instrument font-normal">Timeless</span>{' '}
            <span className="font-inter font-normal">Flavors</span>
          </h1>
          <p className="font-poppins text-lg md:text-xl mb-6 max-w-2xl mx-auto opacity-90 animate-text-reveal-delay-2">
            Handpicked excellence since 1985 • Fresh to your doorstep
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-6 animate-text-reveal-delay-3">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-maroon-400 fill-current" />
              <span className="text-sm font-poppins">Premium Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-maroon-400" />
              <span className="text-sm font-poppins">Since 1985</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-maroon-400" />
              <span className="text-sm font-poppins">100% Natural</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-text-reveal-delay-4">
            <button
              onClick={onShopNow}
              className="bg-maroon-600 hover:bg-maroon-700 text-white font-poppins font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-2 group shadow-lg hover:shadow-xl"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExploreProducts}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-poppins font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
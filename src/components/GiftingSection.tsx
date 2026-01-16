import React from 'react';
import { ArrowRight, Gift } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

interface GiftingSectionProps {
  onViewAll: () => void;
}

const GiftingSection: React.FC<GiftingSectionProps> = ({ onViewAll }) => {
  // Filter products that are marked as gift packs
  const giftProducts = products.filter(product => product.category === 'Gift Packs').slice(0, 4);

  return (
    <section className="py-16 bg-white relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/src/assets/WhatsApp Image 2025-07-08 at 15.04.38_11fcf927.jpg')`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          transform: 'rotate(45deg)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-maroon-600 mr-2" />
            <h2 className="text-3xl md:text-4xl text-gray-900 animate-text-reveal tracking-tight">
              <span className="font-instrument font-thin">Perfect for Gifting</span>
            </h2>
          </div>
          <p className="font-poppins text-lg text-gray-600 max-w-2xl mx-auto animate-text-reveal-delay-1">
            Thoughtfully curated gift packs of premium dry fruits and spices, 
            perfect for special occasions and celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {giftProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-slide-up-stagger transform hover:scale-105 transition-transform duration-300" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative">
                <div className="absolute -top-2 -right-2 bg-maroon-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  Gift Pack
                </div>
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onViewAll}
            className="bg-maroon-600 hover:bg-maroon-700 text-white font-poppins font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center space-x-2 group shadow-lg hover:shadow-xl animate-text-reveal-delay-2"
          >
            <span>Explore Gift Packs</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GiftingSection; 
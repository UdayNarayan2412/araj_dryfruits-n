import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

interface FeaturedProductsProps {
  onViewAll: () => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onViewAll }) => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  return (
    <section className="py-16 bg-gray-50 relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/src/assets/WhatsApp Image 2025-07-08 at 15.04.38_11fcf927.jpg')`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 animate-text-reveal tracking-tight">
            <span className="font-instrument font-thin">Featured Products</span>
          </h2>
          <p className="font-poppins text-lg text-gray-600 max-w-2xl mx-auto animate-text-reveal-delay-1">
            Discover our handpicked selection of premium dry fruits and spices, 
            carefully sourced for exceptional quality and flavor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="animate-slide-up-stagger" style={{ animationDelay: `${index * 0.15}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onViewAll}
            className="bg-maroon-600 hover:bg-maroon-700 text-white font-poppins font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center space-x-2 group shadow-lg hover:shadow-xl animate-text-reveal-delay-2"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
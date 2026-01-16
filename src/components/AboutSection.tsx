import React from 'react';
import { Award, Leaf, Heart, Truck } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-maroon-600" />,
      title: 'Premium Quality',
      description: 'Hand-picked products from the finest sources around the world.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-maroon-600" />,
      title: '100% Natural',
      description: 'No artificial preservatives or additives, just pure natural goodness.',
    },
    {
      icon: <Heart className="w-8 h-8 text-maroon-600" />,
      title: 'Family Tradition',
      description: 'Three generations of expertise in dry fruits and spices.',
    },
    {
      icon: <Truck className="w-8 h-8 text-maroon-600" />,
      title: 'Fresh Delivery',
      description: 'Direct from source to your doorstep with guaranteed freshness.',
    },
  ];

  return (
    <section className="py-16 bg-white relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/src/assets/WhatsApp Image 2025-07-08 at 15.04.38_11fcf927.jpg')`,
          backgroundSize: '150px 150px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-6 animate-text-reveal tracking-tight">
              Our Story of <span className="text-maroon-600 font-instrument font-thin">Quality</span> & <span className="text-maroon-600 font-instrument font-thin">Tradition</span>
            </h2>
            <p className="font-poppins text-lg text-gray-600 mb-6 animate-text-reveal-delay-1">
              Since 1985, Araj has been a trusted name in premium dry fruits and spices. 
              What started as a small family business has grown into a brand that thousands 
              of customers rely on for authentic, high-quality products.
            </p>
            <p className="font-poppins text-lg text-gray-600 mb-8 animate-text-reveal-delay-2">
              We believe in maintaining the highest standards of quality, from sourcing 
              the finest ingredients to ensuring they reach your kitchen with all their 
              natural goodness intact.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-text-reveal-delay-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 transform hover:scale-105 transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="font-poppins font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-slide-in-right">
            <img
              src="https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Our Story"
              className="rounded-lg shadow-lg w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
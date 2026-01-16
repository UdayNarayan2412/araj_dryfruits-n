import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: <Award className="w-8 h-8 text-maroon-600" />, number: '38+', text: 'Years of Excellence' },
    { icon: <Users className="w-8 h-8 text-maroon-600" />, number: '10,000+', text: 'Happy Customers' },
    { icon: <Globe className="w-8 h-8 text-maroon-600" />, number: '50+', text: 'Premium Products' },
    { icon: <Heart className="w-8 h-8 text-maroon-600" />, number: '100%', text: 'Natural & Pure' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('/src/assets/WhatsApp Image 2025-07-08 at 15.04.38_11fcf927.jpg')`,
          backgroundSize: '150px 150px',
          backgroundRepeat: 'repeat',
        }}
      />
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-luxora text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          About <span className="text-maroon-600">Araj</span>
        </h1>
        <p className="font-poppins text-lg text-gray-600 max-w-3xl mx-auto">
          A legacy of quality, tradition, and excellence in dry fruits and spices since 1985
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <div className="font-playfair text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
            <div className="font-poppins text-gray-600">{stat.text}</div>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="font-luxora text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Journey
          </h2>
          <p className="font-poppins text-lg text-gray-600 mb-6">
            Founded in 1985 by Mr. Ravi Agarwal, Araj began as a small family business with a simple mission: 
            to provide the finest quality dry fruits and spices to our community. What started in a small 
            storefront in Mumbai has grown into a trusted brand serving thousands of customers across India.
          </p>
          <p className="font-poppins text-lg text-gray-600 mb-6">
            Over the years, we've maintained our commitment to quality while expanding our reach. Every product 
            in our collection is carefully selected from the best sources around the world, ensuring that our 
            customers receive only the premium quality they deserve.
          </p>
          <p className="font-poppins text-lg text-gray-600">
            Today, Araj is more than just a business—it's a testament to the power of quality, tradition, 
            and customer satisfaction. We're proud to be part of your family's meals and celebrations.
          </p>
        </div>
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Our Journey"
            className="rounded-lg shadow-lg w-full h-96 object-cover"
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-maroon-50 rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-luxora text-xl font-bold text-gray-900 mb-4 tracking-tight">Our Mission</h3>
            <p className="font-poppins text-gray-600">
              To provide the finest quality dry fruits and spices while maintaining the traditional values 
              that have made us a trusted name for over three decades. We strive to bring authentic flavors 
              and natural goodness to every household.
            </p>
          </div>
          <div>
            <h3 className="font-luxora text-xl font-bold text-gray-900 mb-4 tracking-tight">Our Vision</h3>
            <p className="font-poppins text-gray-600">
              To become the most trusted brand for premium dry fruits and spices, setting the standard 
              for quality and customer service in the industry while staying true to our family values 
              and commitment to excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="text-center mb-12">
        <h2 className="font-luxora text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-maroon-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">Quality First</h3>
            <p className="font-poppins text-gray-600">
              We never compromise on quality. Every product is carefully selected and tested to meet our high standards.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-maroon-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">Customer Care</h3>
            <p className="font-poppins text-gray-600">
              Our customers are at the heart of everything we do. We build lasting relationships based on trust and satisfaction.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-maroon-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">Sustainability</h3>
            <p className="font-poppins text-gray-600">
              We believe in sustainable practices that benefit our suppliers, customers, and the environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
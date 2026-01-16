import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-saffron-50 relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/src/assets/WhatsApp Image 2025-07-08 at 15.04.38_11fcf927.jpg')`,
          backgroundSize: '180px 180px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-luxora text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-text-reveal tracking-tight">
            What Our Customers Say
          </h2>
          <p className="font-poppins text-lg text-gray-600 max-w-2xl mx-auto animate-text-reveal-delay-1">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Araj.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-6 animate-text-reveal-delay-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentIndex].rating
                        ? 'text-maroon-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <blockquote className="text-center mb-8 animate-text-reveal-delay-3">
              <p className="font-poppins text-lg md:text-xl text-gray-700 italic">
                "{testimonials[currentIndex].text}"
              </p>
            </blockquote>

            <div className="flex items-center justify-center space-x-4 animate-text-reveal-delay-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full object-cover transform hover:scale-110 transition-transform duration-200"
              />
              <div className="text-center">
                <h4 className="font-poppins font-semibold text-gray-900">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-600">{testimonials[currentIndex].location}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                  index === currentIndex ? 'bg-maroon-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
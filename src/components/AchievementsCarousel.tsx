import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Achievement {
  id: number;
  image: string;
  title: string;
  description: string;
  year: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    image: '/achievments/iso-22000.jpg',
    title: 'ISO 22000 Certification',
    description: 'Achieved international food safety certification, marking our commitment to the highest quality standards in dry fruits and spices processing.',
    year: '2020'
  },
  {
    id: 2,
    image: '/achievments/expansion.jpg',
    title: 'National Expansion',
    description: 'Successfully expanded operations to 15 major cities across India, bringing premium quality dry fruits to more households.',
    year: '2018'
  },
  {
    id: 3,
    image: '/achievments/sustainable.jpg',
    title: 'Sustainable Sourcing',
    description: 'Established direct partnerships with 1000+ farmers, ensuring sustainable sourcing practices and supporting local communities.',
    year: '2019'
  },
  {
    id: 4,
    image: '/achievments/award.jpg',
    title: 'Excellence Award',
    description: 'Received the prestigious Food Industry Excellence Award for our commitment to quality and customer satisfaction.',
    year: '2021'
  }
];

const AchievementsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === achievements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? achievements.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">
          <span className="font-inter text-3xl md:text-4xl text-gray-900">What </span>
          <span className="font-instrument text-3xl md:text-4xl text-gray-900">Araj </span>
          <span className="font-inter text-3xl md:text-4xl text-gray-900">Achieved</span>
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 -ml-4 md:ml-4"
            aria-label="Previous achievement"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 -mr-4 md:mr-4"
            aria-label="Next achievement"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="w-full flex-shrink-0 px-4 md:px-8"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="w-full md:w-2/5">
                          <div className="h-64 md:h-full relative">
                            <img
                              src={achievement.image}
                              alt={achievement.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-maroon-600 text-white px-3 py-1 rounded-full text-sm font-inter">
                              {achievement.year}
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                          <h3 className="text-xl md:text-2xl font-instrument mb-4 text-gray-900">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-600 font-inter leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {achievements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-maroon-600 w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to achievement ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsCarousel; 
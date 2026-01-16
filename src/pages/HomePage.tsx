import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import GiftingSection from '../components/GiftingSection';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import AchievementsCarousel from '../components/AchievementsCarousel';

interface HomePageProps {
  onShopNow: () => void;
  onExploreProducts: () => void;
  onViewAllProducts: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onShopNow, onExploreProducts, onViewAllProducts }) => {
  return (
    <div>
      <HeroSection onShopNow={onShopNow} onExploreProducts={onExploreProducts} />
      <FeaturedProducts onViewAll={onViewAllProducts} />
      <GiftingSection onViewAll={onViewAllProducts} />
      <AboutSection />
      <AchievementsCarousel />
      <Testimonials />
    </div>
  );
};

export default HomePage;
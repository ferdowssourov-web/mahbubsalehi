import { useEffect } from 'react';
import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import VisionPreview from '@/components/VisionPreview';
import QuoteSection from '@/components/QuoteSection';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="home-page">
      <HeroSlider />
      <AboutSection />
      <VisionPreview />
      <QuoteSection />
      <ActivitiesSection />
    </main>
  );
};

export default HomePage;

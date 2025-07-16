import React from 'react';
import {
  HeroSection,
  ServicesPreview,
  WhyChooseUs,
  TestimonialsPreview,
  CTASection
} from '../components/feature';

export const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <TestimonialsPreview />
      <CTASection />
    </div>
  );
};

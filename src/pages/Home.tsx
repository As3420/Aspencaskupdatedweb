import React from 'react';
import {
  HeroSection,
  ClientLogos,
  ServicesPreview,
  FeaturesSection,
  ProcessSection,
  TestimonialsPreview,
  NewsletterSignup,
  CTASection
} from '../components/feature';

export const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ClientLogos />
      <ServicesPreview />
      <FeaturesSection />
      <ProcessSection />
      <TestimonialsPreview />
      <NewsletterSignup />
      <CTASection />
    </div>
  );
};

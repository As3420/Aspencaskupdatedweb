import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../../../data/services';
import { AnimatedText } from '../../ui/AnimatedText';
import { ServiceCard } from '../../sections/ServiceCard';
import { Button } from '../../ui/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ServicesPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedText
            text="Our Expertise"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in cutting-edge technologies to deliver scalable, high-performance solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button size="lg" icon={ArrowRight} onClick={() => navigate('/services')}>
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

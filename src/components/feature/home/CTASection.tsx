import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '../../ui/AnimatedText';
import { Button } from '../../ui/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedText
            text="Ready to Transform Your Business?"
            className="text-4xl md:text-5xl font-bold mb-6"
          />
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's discuss how our innovative solutions can help you achieve your goals and stay ahead of the competition.
          </p>
          <Button
            size="lg"
            icon={ArrowRight}
            onClick={() => navigate('/contact')}
            className="bg-white text-slate-900 hover:bg-gray-100"
          >
            Start Your Project Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

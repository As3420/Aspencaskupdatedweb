import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card } from '../ui/Card';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 h-full relative overflow-hidden">
        <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-200 opacity-50" />
        
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
          "{testimonial.content}"
        </blockquote>
        
        <div className="flex items-center">
          <motion.img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.position} at {testimonial.company}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
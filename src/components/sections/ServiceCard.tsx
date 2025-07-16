import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Card } from '../ui/Card';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 h-full group">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>
        
        <ul className="space-y-3">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-center text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * idx }}
              viewport={{ once: true }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 flex-shrink-0"></div>
              {feature}
            </motion.li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};
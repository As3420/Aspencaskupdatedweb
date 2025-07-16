import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
}) => {
  return (
    <motion.div
      className={`bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg ${hover ? 'hover:shadow-2xl hover:shadow-blue-500/10' : ''} transition-all duration-300 ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};
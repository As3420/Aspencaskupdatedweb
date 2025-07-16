import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Headphones, Clock, Award } from 'lucide-react';
import { AnimatedText } from '../../ui/AnimatedText';
import { Card } from '../../ui/Card';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security protocols and data protection measures',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with cutting-edge technologies',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Global Scalability',
      description: 'Solutions that scale from startup to enterprise level',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and maintenance',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Rapid Delivery',
      description: 'Agile development with faster time-to-market',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Rigorous testing and quality assurance processes',
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedText
            text="Why Choose AspenCask Solution?"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver exceptional results through innovation, expertise, and unwavering commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center h-full group">
                <motion.div
                  className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 10 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
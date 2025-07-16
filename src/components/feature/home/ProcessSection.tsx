import React from 'react';
import { motion } from 'framer-motion';
import { Search, Palette, Code, Rocket } from 'lucide-react';
import { AnimatedText } from '../../ui/AnimatedText';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Discovery',
      description: 'We analyze your requirements and understand your business goals',
      color: 'from-blue-500 to-cyan-500',
      step: '01'
    },
    {
      icon: Palette,
      title: 'Design',
      description: 'Creating intuitive designs and user experiences that engage',
      color: 'from-purple-500 to-pink-500',
      step: '02'
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Building robust, scalable solutions with modern technologies',
      color: 'from-green-500 to-emerald-500',
      step: '03'
    },
    {
      icon: Rocket,
      title: 'Launch',
      description: 'Deploying your solution with ongoing support and maintenance',
      color: 'from-orange-500 to-red-500',
      step: '04'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedText
            text="Our Development Process"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven methodology that ensures successful project delivery from concept to launch
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-orange-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 z-20">
                    {step.step}
                  </div>
                  
                  <motion.div
                    className={`bg-gradient-to-r ${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    whileHover={{ rotate: 5, y: -5 }}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
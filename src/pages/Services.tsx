import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '../components/ui/AnimatedText';
import { ServiceCard } from '../components/sections/ServiceCard';
import { Button } from '../components/ui/Button';
import { services } from '../data/services';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Services: React.FC = () => {
  const navigate = useNavigate();

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a comprehensive project roadmap.'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Our team designs scalable solutions with modern architecture patterns.'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build your solution using best practices and rigorous testing.'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'We deploy your solution and provide ongoing maintenance and support.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedText
              text="Our Services"
              className="text-4xl md:text-6xl font-bold mb-6"
            />
            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Comprehensive technology solutions designed to accelerate your business growth and digital transformation journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
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
              text="Our Development Process"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery from concept to deployment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AnimatedText
                text="Why Choose Our Services?"
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              />
              <p className="text-xl text-gray-600 mb-8">
                We deliver exceptional results through our commitment to quality, innovation, and client satisfaction.
              </p>
              
              <div className="space-y-4">
                {[
                  'Latest technology stack and frameworks',
                  'Agile development methodology',
                  'Scalable and maintainable code',
                  'Comprehensive testing and quality assurance',
                  '24/7 support and maintenance',
                  'Transparent communication throughout the project'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&dpr=2"
                alt="Development team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              text="Ready to Start Your Project?"
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's discuss how our services can help you achieve your business goals and digital transformation objectives.
            </p>
            <Button
              size="lg"
              icon={ArrowRight}
              onClick={() => navigate('/contact')}
              className="bg-white text-slate-900 hover:bg-gray-100"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
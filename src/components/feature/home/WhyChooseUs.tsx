import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '../../ui/AnimatedText';
import { CheckCircle, Zap, Shield, Users } from 'lucide-react';

const features = [
  { icon: CheckCircle, title: 'Proven Track Record', desc: 'Successful delivery of 50+ projects' },
  { icon: Zap, title: 'Cutting-Edge Technology', desc: 'Latest frameworks and methodologies' },
  { icon: Shield, title: 'Secure & Scalable', desc: 'Enterprise-grade security and performance' },
  { icon: Users, title: 'Expert Team', desc: 'Experienced developers and consultants' },
];

export const WhyChooseUs: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedText
            text="Why Choose AspenCask Solution?"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          />
          <p className="text-xl text-gray-600 mb-8">
            We combine innovation, expertise, and dedication to deliver exceptional results.
          </p>
          <div className="space-y-6">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
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
            src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2"
            alt="Team working"
            className="rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </motion.div>
      </div>
    </div>
  </section>
);

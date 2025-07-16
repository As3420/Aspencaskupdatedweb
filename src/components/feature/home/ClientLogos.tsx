import React from 'react';
import { motion } from 'framer-motion';

export const ClientLogos: React.FC = () => {
  const techPartners = [
    { 
      name: 'React', 
      logo: '⚛️', 
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      description: 'Frontend Framework'
    },
    { 
      name: 'Node.js', 
      logo: '🟢', 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 hover:bg-green-100',
      description: 'Backend Runtime'
    },
    { 
      name: 'TypeScript', 
      logo: '📘', 
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      description: 'Type-Safe Development'
    },
    { 
      name: 'Python', 
      logo: '🐍', 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100',
      description: 'AI & Data Science'
    },
    { 
      name: 'AWS', 
      logo: '☁️', 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      description: 'Cloud Infrastructure'
    },
    { 
      name: 'Docker', 
      logo: '🐳', 
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      description: 'Containerization'
    },
    { 
      name: 'MongoDB', 
      logo: '🍃', 
      color: 'from-green-600 to-green-800',
      bgColor: 'bg-green-50 hover:bg-green-100',
      description: 'NoSQL Database'
    },
    { 
      name: 'PostgreSQL', 
      logo: '🐘', 
      color: 'from-blue-700 to-indigo-700',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      description: 'Relational Database'
    },
    { 
      name: 'Next.js', 
      logo: '▲', 
      color: 'from-gray-800 to-black',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      description: 'React Framework'
    },
    { 
      name: 'TensorFlow', 
      logo: '🧠', 
      color: 'from-orange-600 to-red-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      description: 'Machine Learning'
    },
    { 
      name: 'Kubernetes', 
      logo: '⚙️', 
      color: 'from-blue-600 to-purple-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      description: 'Container Orchestration'
    },
    { 
      name: 'GraphQL', 
      logo: '◆', 
      color: 'from-pink-500 to-purple-500',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
      description: 'API Query Language'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powered by Industry-Leading Technologies
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We leverage cutting-edge technologies and frameworks to deliver exceptional solutions
          </p>
        </motion.div>

        {/* First Row - Left to Right */}
        <div className="relative mb-8">
          <motion.div
            className="flex space-x-6 items-center"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...techPartners, ...techPartners].map((tech, index) => (
              <motion.div
                key={`row1-${index}`}
                className={`flex items-center space-x-4 ${tech.bgColor} px-6 py-4 rounded-2xl min-w-max shadow-lg border border-white/50 backdrop-blur-sm group transition-all duration-300`}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tech.color} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 10 }}
                >
                  {tech.logo}
                </motion.div>
                <div className="text-left">
                  <span className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
                    {tech.name}
                  </span>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {tech.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative">
          <motion.div
            className="flex space-x-6 items-center"
            animate={{ x: [-1200, 0] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...techPartners.slice().reverse(), ...techPartners.slice().reverse()].map((tech, index) => (
              <motion.div
                key={`row2-${index}`}
                className={`flex items-center space-x-4 ${tech.bgColor} px-6 py-4 rounded-2xl min-w-max shadow-lg border border-white/50 backdrop-blur-sm group transition-all duration-300`}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tech.color} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: -10 }}
                >
                  {tech.logo}
                </motion.div>
                <div className="text-left">
                  <span className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
                    {tech.name}
                  </span>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {tech.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        {/* <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        > */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '12+', label: 'Technologies Mastered', icon: '🚀' },
              { number: '50+', label: 'Projects Delivered', icon: '💼' },
              { number: '98%', label: 'Performance Score', icon: '⚡' },
              { number: '24/7', label: 'Technical Support', icon: '🛠️' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 group hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div> */}
        {/* </motion.div> */}
      </div>
    </section>
  );
};
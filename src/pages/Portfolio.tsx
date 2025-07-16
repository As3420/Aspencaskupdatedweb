import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedText } from '../components/ui/AnimatedText';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
              text="Our Portfolio"
              className="text-4xl md:text-6xl font-bold mb-6"
            />
            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our successful projects and see how we've helped businesses transform through innovative technology solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* <div className="flex space-x-3">
                          <Button
                            size="sm"
                            icon={ExternalLink}
                            className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                          >
                            Live Demo
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Github}
                            className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                          >
                            Code
                          </Button>
                        </div> */}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              text="Like What You See?"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            />
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to start your own success story? Let's discuss how we can bring your vision to life with our expertise and innovation.
            </p>
            <Button
              size="lg"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
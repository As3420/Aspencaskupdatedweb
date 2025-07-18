import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '../components/ui/AnimatedText';
import { Card } from '../components/ui/Card';
import { Target, Users, Award, Rocket } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We stay at the forefront of technology, constantly exploring new solutions to solve complex challenges.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients, building lasting partnerships based on trust and mutual success.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality solutions that exceed expectations.'
    },
    {
      icon: Rocket,
      title: 'Growth',
      description: 'We help businesses scale and grow through strategic technology implementations.'
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
              text="About AspenCask Solution"
              className="text-4xl md:text-6xl font-bold mb-6"
            />
            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Founded in 2024, AspenCask Solution LLP is a leading software development company dedicated to transforming businesses through innovative digital solutions. We specialize in web development, artificial intelligence, cloud computing, and enterprise software.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                alt="Our mission"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe in creating software that not only meets today's needs but anticipates tomorrow's challenges.
              </p>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become the most trusted technology partner for businesses worldwide, known for our innovation, reliability, and commitment to excellence in every project we deliver.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              text="Our Core Values"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every solution we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center h-full">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
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
              text="Our Technology Stack"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to deliver robust, scalable, and innovative solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: 'React', category: 'Frontend', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
              { name: 'Node.js', category: 'Backend', icon: '🟢', color: 'from-green-500 to-emerald-500' },
              { name: 'TypeScript', category: 'Language', icon: '📘', color: 'from-blue-600 to-indigo-600' },
              { name: 'Python', category: 'AI/ML', icon: '🐍', color: 'from-yellow-500 to-orange-500' },
              { name: 'AWS', category: 'Cloud', icon: '☁️', color: 'from-orange-500 to-red-500' },
              { name: 'Docker', category: 'DevOps', icon: '🐳', color: 'from-blue-500 to-blue-700' },
              { name: 'MongoDB', category: 'Database', icon: '🍃', color: 'from-green-600 to-green-800' },
              { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: 'from-blue-700 to-indigo-700' },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center group">
                  <motion.div
                    className="relative mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${tech.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {tech.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.category}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              text="Our Journey So Far"
              className="text-4xl md:text-5xl font-bold mb-4"
            />
            <p className="text-xl text-gray-300">
              Since our founding in 2024, we've been making a significant impact
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Completed', icon: '🚀' },
              { number: '50+', label: 'Happy Clients', icon: '😊' },
              { number: '4', label: 'Core Services', icon: '⚡' },
              { number: '100%', label: 'Client Satisfaction', icon: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
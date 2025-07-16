import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Cutting-edge web applications built with modern frameworks and technologies for optimal performance and user experience.',
    icon: 'Code',
    features: [
      'React & Vue.js Applications',
      'Full-Stack Development',
      'Progressive Web Apps',
      'E-commerce Solutions',
      'API Development & Integration'
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by artificial intelligence to automate processes and drive business insights.',
    icon: 'Brain',
    features: [
      'Machine Learning Models',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'AI-Powered Automation'
    ]
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Scalable cloud infrastructure and migration services to ensure your applications perform at their best.',
    icon: 'Cloud',
    features: [
      'Cloud Migration',
      'AWS & Azure Services',
      'DevOps & CI/CD',
      'Microservices Architecture',
      'Serverless Solutions'
    ]
  },
  {
    id: 'enterprise-software',
    title: 'Enterprise Software',
    description: 'Robust enterprise solutions designed to streamline operations and enhance productivity across your organization.',
    icon: 'Building',
    features: [
      'Custom ERP Solutions',
      'CRM Development',
      'Business Intelligence',
      'Workflow Automation',
      'System Integration'
    ]
  }
];
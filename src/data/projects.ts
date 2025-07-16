import { Project } from '../types';
import {publicImages} from '../shared/utlis/public-images.utlis'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Edunova Skill',
    description: 'An academic website offering a wide range of online courses, interactive learning modules, and skill development resources for students and professionals.',
    category: 'Education Technology',
    image: publicImages.edunova,
    technologies: ['React', 'Node.js', 'MongoDB', 'EdTech APIs']
  },
  {
    id: '2',
    title: 'Cloud Migration Suite',
    description: 'Enterprise cloud migration platform with automated deployment and monitoring capabilities.',
    category: 'Cloud Computing',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
  },
  {
    id: '3',
    title: 'AI Analytics Dashboard',
    description: 'Real-time analytics platform powered by machine learning for predictive business insights.',
    category: 'AI & Machine Learning',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js']
  },
  {
    id: '4',
    title: 'AmentisNutraceuticals',
    description: 'AmentisNutraceuticals website showcasing health supplements, product details, and wellness resources for customers.',
    category: 'Web Development',
    image: publicImages.amentis,
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Contentful']
  }
];
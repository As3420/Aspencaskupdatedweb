export interface NavItem {
  name: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  posted: string;
}

export interface CareerApplication {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio?: string;
  coverLetter: string;
}
import { JobPosition } from '../types';

export const jobPositions: JobPosition[] = [
  // {
  //   id: 'senior-react-developer',
  //   title: 'Senior React Developer',
  //   department: 'Engineering',
  //   location: 'Ghaziabad, UP / Remote',
  //   type: 'Full-time',
  //   experience: '3-5 years',
  //   description: 'Join our dynamic team to build cutting-edge web applications using React and modern JavaScript technologies.',
  //   requirements: [
  //     'Bachelor\'s degree in Computer Science or related field',
  //     '3+ years of experience with React.js and TypeScript',
  //     'Strong knowledge of HTML5, CSS3, and modern JavaScript (ES6+)',
  //     'Experience with state management libraries (Redux, Zustand)',
  //     'Familiarity with RESTful APIs and GraphQL',
  //     'Knowledge of testing frameworks (Jest, React Testing Library)',
  //     'Experience with version control systems (Git)',
  //     'Understanding of responsive design and cross-browser compatibility'
  //   ],
  //   responsibilities: [
  //     'Develop and maintain high-quality React applications',
  //     'Collaborate with designers and backend developers',
  //     'Write clean, maintainable, and well-documented code',
  //     'Participate in code reviews and technical discussions',
  //     'Optimize applications for maximum speed and scalability',
  //     'Stay updated with latest React ecosystem trends',
  //     'Mentor junior developers and share knowledge',
  //     'Contribute to technical architecture decisions'
  //   ],
  //   benefits: [
  //     'Competitive salary package',
  //     'Health insurance coverage',
  //     'Flexible working hours',
  //     'Remote work options',
  //     'Professional development opportunities',
  //     'Annual performance bonuses',
  //     'Paid time off and holidays',
  //     'Modern development tools and equipment'
  //   ],
  //   posted: '2024-01-15'
  // },
  // {
  //   id: 'fullstack-developer',
  //   title: 'Full Stack Developer',
  //   department: 'Engineering',
  //   location: 'Ghaziabad, UP / Hybrid',
  //   type: 'Full-time',
  //   experience: '2-4 years',
  //   description: 'We\'re looking for a versatile full-stack developer to work on both frontend and backend technologies.',
  //   requirements: [
  //     'Bachelor\'s degree in Computer Science or equivalent experience',
  //     '2+ years of full-stack development experience',
  //     'Proficiency in React.js and Node.js',
  //     'Experience with databases (MongoDB, PostgreSQL)',
  //     'Knowledge of RESTful API development',
  //     'Familiarity with cloud platforms (AWS, Azure)',
  //     'Understanding of DevOps practices and CI/CD',
  //     'Strong problem-solving and debugging skills'
  //   ],
  //   responsibilities: [
  //     'Design and develop full-stack web applications',
  //     'Build and maintain RESTful APIs',
  //     'Work with databases and data modeling',
  //     'Implement responsive user interfaces',
  //     'Deploy applications to cloud platforms',
  //     'Collaborate with cross-functional teams',
  //     'Ensure application security and performance',
  //     'Participate in agile development processes'
  //   ],
  //   benefits: [
  //     'Competitive compensation',
  //     'Health and dental insurance',
  //     'Flexible work arrangements',
  //     'Learning and development budget',
  //     'Team building activities',
  //     'Performance-based incentives',
  //     'Casual work environment',
  //     'Latest technology stack'
  //   ],
  //   posted: '2024-01-10'
  // },
  // {
  //   id: 'ai-ml-engineer',
  //   title: 'AI/ML Engineer',
  //   department: 'AI & Data Science',
  //   location: 'Ghaziabad, UP / Remote',
  //   type: 'Full-time',
  //   experience: '2-5 years',
  //   description: 'Join our AI team to develop intelligent solutions and machine learning models that drive business value.',
  //   requirements: [
  //     'Master\'s degree in Computer Science, AI, or related field',
  //     '2+ years of experience in machine learning',
  //     'Strong programming skills in Python',
  //     'Experience with ML frameworks (TensorFlow, PyTorch, Scikit-learn)',
  //     'Knowledge of data preprocessing and feature engineering',
  //     'Understanding of deep learning and neural networks',
  //     'Experience with cloud ML services (AWS SageMaker, Azure ML)',
  //     'Strong mathematical and statistical background'
  //   ],
  //   responsibilities: [
  //     'Develop and deploy machine learning models',
  //     'Design AI-powered features and solutions',
  //     'Analyze large datasets and extract insights',
  //     'Optimize model performance and accuracy',
  //     'Collaborate with product teams on AI integration',
  //     'Research and implement latest AI techniques',
  //     'Build data pipelines and ML infrastructure',
  //     'Document and present findings to stakeholders'
  //   ],
  //   benefits: [
  //     'Competitive salary with equity options',
  //     'Comprehensive health benefits',
  //     'Conference and training allowances',
  //     'Research and development time',
  //     'Access to latest AI tools and platforms',
  //     'Flexible working conditions',
  //     'Innovation bonuses',
  //     'Career growth opportunities'
  //   ],
  //   posted: '2024-01-08'
  // },
  // {
  //   id: 'devops-engineer',
  //   title: 'DevOps Engineer',
  //   department: 'Infrastructure',
  //   location: 'Ghaziabad, UP / Remote',
  //   type: 'Full-time',
  //   experience: '3-6 years',
  //   description: 'Help us build and maintain scalable infrastructure and deployment pipelines for our growing platform.',
  //   requirements: [
  //     'Bachelor\'s degree in Computer Science or related field',
  //     '3+ years of DevOps or infrastructure experience',
  //     'Strong knowledge of AWS/Azure cloud platforms',
  //     'Experience with containerization (Docker, Kubernetes)',
  //     'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
  //     'Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)',
  //     'Experience with monitoring and logging tools',
  //     'Strong scripting skills (Bash, Python)'
  //   ],
  //   responsibilities: [
  //     'Design and maintain cloud infrastructure',
  //     'Implement CI/CD pipelines and automation',
  //     'Monitor system performance and reliability',
  //     'Ensure security and compliance standards',
  //     'Optimize infrastructure costs and performance',
  //     'Collaborate with development teams',
  //     'Implement disaster recovery procedures',
  //     'Troubleshoot and resolve infrastructure issues'
  //   ],
  //   benefits: [
  //     'Attractive compensation package',
  //     'Health insurance and wellness programs',
  //     'Certification and training support',
  //     'Flexible work schedule',
  //     'Remote work opportunities',
  //     'Performance bonuses',
  //     'Professional development budget',
  //     'Modern tools and technologies'
  //   ],
  //   posted: '2024-01-05'
  // }
];

export const companyBenefits = [
  {
    icon: 'Heart',
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance, wellness programs, and mental health support'
  },
  {
    icon: 'Clock',
    title: 'Work-Life Balance',
    description: 'Flexible working hours, remote work options, and generous paid time off'
  },
  {
    icon: 'TrendingUp',
    title: 'Career Growth',
    description: 'Professional development opportunities, mentorship programs, and clear career paths'
  },
  {
    icon: 'Users',
    title: 'Great Team',
    description: 'Collaborative culture, team building activities, and supportive work environment'
  },
  {
    icon: 'Laptop',
    title: 'Latest Technology',
    description: 'Modern development tools, latest hardware, and cutting-edge technology stack'
  },
  {
    icon: 'Award',
    title: 'Recognition',
    description: 'Performance-based bonuses, employee recognition programs, and achievement rewards'
  }
];

export const workCulture = [
  {
    title: 'Innovation First',
    description: 'We encourage creative thinking and innovative solutions to complex problems.',
    icon: 'Lightbulb'
  },
  {
    title: 'Continuous Learning',
    description: 'Stay updated with latest technologies through training, conferences, and workshops.',
    icon: 'BookOpen'
  },
  {
    title: 'Collaborative Environment',
    description: 'Work with talented professionals in a supportive and inclusive environment.',
    icon: 'Users'
  },
  {
    title: 'Quality Excellence',
    description: 'We maintain high standards and deliver exceptional results for our clients.',
    icon: 'Star'
  }
];
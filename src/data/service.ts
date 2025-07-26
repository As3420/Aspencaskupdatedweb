import { ServiceCategory, CaseStudy } from '../types/chat';

export const caseStudies: CaseStudy[] = [
  {
    id: 'healthcare-platform',
    title: 'Healthcare Management Platform',
    client: 'MedCare Solutions',
    industry: 'Healthcare',
    challenge: 'Streamline patient management and reduce administrative overhead',
    solution: 'Comprehensive healthcare platform with AI-powered scheduling and EHR integration',
    results: [
      '60% reduction in administrative tasks',
      '40% improvement in patient satisfaction',
      '99.9% system uptime',
      '50% faster appointment scheduling'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'AI/ML'],
    duration: '8 months',
    teamSize: 12
  },
  {
    id: 'fintech-platform',
    title: 'Digital Banking Platform',
    client: 'Neo Bank Ltd',
    industry: 'Financial Services',
    challenge: 'Create a modern, secure digital banking experience',
    solution: 'Full-stack fintech platform with real-time transactions and advanced security',
    results: [
      '500K+ active users',
      '99.99% transaction success rate',
      'PCI DSS compliant',
      '30% increase in customer engagement'
    ],
    technologies: ['React Native', 'Microservices', 'Kubernetes', 'Blockchain'],
    duration: '12 months',
    teamSize: 18
  },
  {
    id: 'ecommerce-marketplace',
    title: 'Multi-Vendor E-commerce Platform',
    client: 'Global Market Hub',
    industry: 'E-commerce',
    challenge: 'Build scalable marketplace supporting millions of products and vendors',
    solution: 'Cloud-native e-commerce platform with AI-powered recommendations',
    results: [
      '1M+ products listed',
      '10K+ active vendors',
      '40% increase in conversion rate',
      '99.9% platform availability'
    ],
    technologies: ['Next.js', 'Python', 'Redis', 'Elasticsearch', 'AWS'],
    duration: '10 months',
    teamSize: 15
  }
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Modern, responsive web applications',
    icon: '🌐',
    color: 'blue',
    services: [
      {
        id: 'custom-web-dev',
        name: 'Custom Web Development',
        description: 'Bespoke web applications tailored to your business needs',
        features: [
          'Responsive design & mobile optimization',
          'SEO-friendly architecture',
          'High-performance optimization',
          'Cross-browser compatibility',
          'Accessibility compliance (WCAG 2.1)',
          'Progressive Web App (PWA) capabilities'
        ],
        technologies: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
        caseStudies: [caseStudies[2]],
        pricing: { startingPrice: 5000, currency: 'USD', model: 'project' }
      },
      {
        id: 'ecommerce-development',
        name: 'E-commerce Development',
        description: 'Scalable online stores and marketplaces',
        features: [
          'Multi-vendor marketplace support',
          'Payment gateway integration',
          'Inventory management',
          'Order tracking & fulfillment',
          'Customer analytics & reporting',
          'Mobile commerce optimization'
        ],
        technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal'],
        caseStudies: [caseStudies[2]],
        pricing: { startingPrice: 8000, currency: 'USD', model: 'project' }
      },
      {
        id: 'web-apps',
        name: 'Web Applications',
        description: 'Complex web applications with advanced functionality',
        features: [
          'Single Page Applications (SPA)',
          'Real-time data synchronization',
          'Advanced user authentication',
          'API development & integration',
          'Database design & optimization',
          'Third-party service integration'
        ],
        technologies: ['React', 'Angular', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL']
      }
    ]
  },
  {
    id: 'mobile-development',
    name: 'Mobile Development',
    description: 'Native and cross-platform mobile apps',
    icon: '📱',
    color: 'green',
    services: [
      {
        id: 'ios-development',
        name: 'iOS App Development',
        description: 'Native iOS applications for iPhone and iPad',
        features: [
          'Native iOS performance',
          'Apple Human Interface Guidelines compliance',
          'App Store optimization',
          'Core Data & CloudKit integration',
          'Push notifications',
          'In-app purchases'
        ],
        technologies: ['Swift', 'SwiftUI', 'Core Data', 'CloudKit', 'Xcode']
      },
      {
        id: 'android-development',
        name: 'Android App Development',
        description: 'Native Android applications with modern UI',
        features: [
          'Material Design implementation',
          'Google Play Store optimization',
          'Firebase integration',
          'Room database',
          'Background services',
          'Google Pay integration'
        ],
        technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Firebase', 'Android Studio']
      },
      {
        id: 'cross-platform',
        name: 'Cross-Platform Development',
        description: 'Single codebase for multiple platforms',
        features: [
          'Code reusability across platforms',
          'Native performance',
          'Platform-specific UI components',
          'Hot reload development',
          'Third-party plugin ecosystem',
          'Cost-effective development'
        ],
        technologies: ['React Native', 'Flutter', 'Xamarin', 'Ionic']
      }
    ]
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & ML',
    description: 'AI-powered solutions and machine learning',
    icon: '🤖',
    color: 'purple',
    services: [
      {
        id: 'custom-ai-models',
        name: 'Custom AI Model Development',
        description: 'Tailored AI models for specific business needs',
        features: [
          'Deep learning model architecture',
          'Custom training datasets',
          'Model optimization & fine-tuning',
          'A/B testing for model performance',
          'Continuous learning implementation',
          'Edge computing deployment'
        ],
        technologies: ['TensorFlow', 'PyTorch', 'Hugging Face', 'ONNX', 'CUDA']
      },
      {
        id: 'nlp-solutions',
        name: 'Natural Language Processing',
        description: 'Advanced text and language understanding',
        features: [
          'Sentiment analysis & emotion detection',
          'Named entity recognition',
          'Text classification & categorization',
          'Language translation services',
          'Speech-to-text & text-to-speech',
          'Conversational AI development'
        ],
        technologies: ['spaCy', 'NLTK', 'OpenAI GPT', 'Google Cloud NLP', 'Azure Cognitive Services']
      },
      {
        id: 'computer-vision',
        name: 'Computer Vision Solutions',
        description: 'Image and video analysis capabilities',
        features: [
          'Object detection & recognition',
          'Facial recognition systems',
          'Medical image analysis',
          'Quality control automation',
          'Augmented reality integration',
          'Video analytics & surveillance'
        ],
        technologies: ['OpenCV', 'YOLO', 'TensorFlow Vision', 'MediaPipe', 'Detectron2']
      }
    ]
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    description: 'Scalable cloud infrastructure and services',
    icon: '☁️',
    color: 'cyan',
    services: [
      {
        id: 'cloud-migration',
        name: 'Cloud Migration Services',
        description: 'Seamless migration to cloud platforms',
        features: [
          'Legacy system assessment',
          'Migration strategy planning',
          'Zero-downtime migration',
          'Data migration & synchronization',
          'Performance optimization',
          'Cost optimization analysis'
        ],
        technologies: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker']
      },
      {
        id: 'devops-cicd',
        name: 'DevOps & CI/CD',
        description: 'Automated deployment and infrastructure',
        features: [
          'Continuous integration/deployment',
          'Infrastructure as Code (IaC)',
          'Container orchestration',
          'Monitoring & logging setup',
          'Automated testing pipelines',
          'Security compliance automation'
        ],
        technologies: ['Jenkins', 'GitLab CI', 'Terraform', 'Ansible', 'Prometheus']
      },
      {
        id: 'serverless',
        name: 'Serverless Architecture',
        description: 'Event-driven serverless solutions',
        features: [
          'Function-as-a-Service (FaaS)',
          'Event-driven architecture',
          'Auto-scaling capabilities',
          'Pay-per-use pricing model',
          'Microservices implementation',
          'API Gateway integration'
        ],
        technologies: ['AWS Lambda', 'Azure Functions', 'Google Cloud Functions', 'Vercel']
      }
    ]
  },
  {
    id: 'enterprise-software',
    name: 'Enterprise Software',
    description: 'Large-scale business applications',
    icon: '🏢',
    color: 'indigo',
    services: [
      {
        id: 'erp-systems',
        name: 'ERP Systems',
        description: 'Enterprise Resource Planning solutions',
        features: [
          'Financial management',
          'Supply chain management',
          'Human resources management',
          'Customer relationship management',
          'Business intelligence & reporting',
          'Multi-location support'
        ],
        technologies: ['SAP', 'Oracle', 'Microsoft Dynamics', 'Odoo', 'Custom Development']
      },
      {
        id: 'crm-solutions',
        name: 'CRM Solutions',
        description: 'Customer relationship management systems',
        features: [
          'Lead management & tracking',
          'Sales pipeline automation',
          'Customer segmentation',
          'Marketing campaign management',
          'Customer service integration',
          'Analytics & reporting dashboards'
        ],
        technologies: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Custom CRM Development']
      },
      {
        id: 'business-automation',
        name: 'Business Process Automation',
        description: 'Workflow automation and optimization',
        features: [
          'Workflow design & automation',
          'Document management systems',
          'Approval process automation',
          'Integration with existing systems',
          'Robotic Process Automation (RPA)',
          'Performance monitoring & optimization'
        ],
        technologies: ['UiPath', 'Automation Anywhere', 'Microsoft Power Automate', 'Zapier']
      }
    ]
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics & BI',
    description: 'Data-driven insights and business intelligence',
    icon: '📊',
    color: 'orange',
    services: [
      {
        id: 'data-warehousing',
        name: 'Data Warehousing',
        description: 'Centralized data storage and management',
        features: [
          'ETL/ELT pipeline development',
          'Data modeling & schema design',
          'Real-time data processing',
          'Data quality assurance',
          'Historical data archiving',
          'Performance optimization'
        ],
        technologies: ['Snowflake', 'Amazon Redshift', 'Google BigQuery', 'Apache Spark']
      },
      {
        id: 'business-intelligence',
        name: 'Business Intelligence',
        description: 'Interactive dashboards and reporting',
        features: [
          'Executive dashboards',
          'Self-service analytics',
          'Automated reporting',
          'KPI monitoring & alerts',
          'Predictive analytics',
          'Mobile BI applications'
        ],
        technologies: ['Tableau', 'Power BI', 'Looker', 'QlikView', 'Custom Dashboards']
      },
      {
        id: 'big-data',
        name: 'Big Data Solutions',
        description: 'Large-scale data processing and analysis',
        features: [
          'Distributed data processing',
          'Real-time stream processing',
          'Machine learning on big data',
          'Data lake architecture',
          'Scalable storage solutions',
          'Advanced analytics algorithms'
        ],
        technologies: ['Hadoop', 'Apache Kafka', 'Elasticsearch', 'MongoDB', 'Cassandra']
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Comprehensive security solutions',
    icon: '🔒',
    color: 'red',
    services: [
      {
        id: 'security-assessment',
        name: 'Security Assessment & Auditing',
        description: 'Comprehensive security evaluation',
        features: [
          'Vulnerability assessments',
          'Penetration testing',
          'Security code review',
          'Compliance auditing',
          'Risk assessment & mitigation',
          'Security policy development'
        ],
        technologies: ['OWASP', 'Nessus', 'Metasploit', 'Burp Suite', 'Wireshark']
      },
      {
        id: 'identity-management',
        name: 'Identity & Access Management',
        description: 'Secure user authentication and authorization',
        features: [
          'Single Sign-On (SSO)',
          'Multi-factor authentication',
          'Role-based access control',
          'Identity federation',
          'Privileged access management',
          'User lifecycle management'
        ],
        technologies: ['Active Directory', 'Okta', 'Auth0', 'LDAP', 'SAML']
      },
      {
        id: 'security-monitoring',
        name: 'Security Monitoring & Response',
        description: '24/7 security monitoring and incident response',
        features: [
          'Security Information Event Management (SIEM)',
          'Threat detection & analysis',
          'Incident response planning',
          'Forensic analysis',
          'Compliance monitoring',
          'Security awareness training'
        ],
        technologies: ['Splunk', 'ELK Stack', 'IBM QRadar', 'CrowdStrike', 'SentinelOne']
      }
    ]
  },
  {
    id: 'blockchain',
    name: 'Blockchain & Web3',
    description: 'Decentralized applications and blockchain solutions',
    icon: '⛓️',
    color: 'amber',
    services: [
      {
        id: 'smart-contracts',
        name: 'Smart Contract Development',
        description: 'Secure and efficient smart contracts',
        features: [
          'Smart contract architecture',
          'Security audit & testing',
          'Gas optimization',
          'Multi-chain deployment',
          'Upgradeable contracts',
          'Integration with dApps'
        ],
        technologies: ['Solidity', 'Rust', 'Ethereum', 'Polygon', 'Binance Smart Chain']
      },
      {
        id: 'dapp-development',
        name: 'DApp Development',
        description: 'Decentralized applications on blockchain',
        features: [
          'Frontend dApp development',
          'Web3 wallet integration',
          'IPFS integration',
          'DeFi protocol development',
          'NFT marketplace creation',
          'Cross-chain compatibility'
        ],
        technologies: ['Web3.js', 'Ethers.js', 'React', 'MetaMask', 'WalletConnect']
      },
      {
        id: 'tokenization',
        name: 'Tokenization Solutions',
        description: 'Custom token creation and management',
        features: [
          'ERC-20/ERC-721 token creation',
          'Tokenomics design',
          'Token distribution mechanisms',
          'Staking & governance systems',
          'Cross-chain bridges',
          'Token analytics & monitoring'
        ],
        technologies: ['OpenZeppelin', 'Chainlink', 'TheGraph', 'Uniswap', 'PancakeSwap']
      }
    ]
  },
  {
    id: 'consulting',
    name: 'Technology Consulting',
    description: 'Strategic technology guidance and planning',
    icon: '💡',
    color: 'teal',
    services: [
      {
        id: 'digital-transformation',
        name: 'Digital Transformation',
        description: 'Complete digital business transformation',
        features: [
          'Digital strategy development',
          'Technology roadmap planning',
          'Process re-engineering',
          'Change management',
          'Digital culture transformation',
          'ROI measurement & optimization'
        ],
        technologies: ['Strategic Planning', 'Process Mapping', 'Change Management', 'Analytics']
      },
      {
        id: 'architecture-consulting',
        name: 'Architecture Consulting',
        description: 'System architecture and technical strategy',
        features: [
          'Enterprise architecture design',
          'Microservices architecture',
          'API strategy & design',
          'Technology stack evaluation',
          'Scalability planning',
          'Performance optimization'
        ],
        technologies: ['System Design', 'Microservices', 'API Management', 'Cloud Architecture']
      },
      {
        id: 'technology-audit',
        name: 'Technology Audit & Assessment',
        description: 'Comprehensive technology evaluation',
        features: [
          'Current state assessment',
          'Gap analysis',
          'Technology debt evaluation',
          'Security assessment',
          'Performance benchmarking',
          'Modernization recommendations'
        ],
        technologies: ['Audit Tools', 'Performance Testing', 'Security Scanning', 'Code Analysis']
      }
    ]
  }
];

export const getAllServices = () => {
  return serviceCategories.reduce((acc, category) => {
    return [...acc, ...category.services];
  }, [] as any[]);
};

export const getServiceById = (id: string) => {
  return getAllServices().find(service => service.id === id);
};

export const getCategoryById = (id: string) => {
  return serviceCategories.find(category => category.id === id);
};
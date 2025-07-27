import { QuickOption } from '../types/chat';
import { serviceCategories, caseStudies } from './service';
import { jobPositions, workCulture } from './careers';
import { contactInfo } from './contact';
import { projects } from './projects';
import { socialLinks } from './social';
import { testimonials } from './testimonials';
import { services } from './services';

// Enhanced founder/owner keyword detection
const founderKeywords = [
  'founder', 'owner', 'ceo', 'director', 'established', 'started', 'created', 
  'who made', 'who owns', 'who founded', 'leadership', 'management', 
  'company head', 'established by', 'who runs', 'boss', 'chief', 'head'
];

const founderPatterns = [
  /founder/i,
  /owner/i,
  /ceo/i,
  /director/i,
  /who (is|are|owns|founded|created|started|runs|leads)/i,
  /established by/i,
  /company head/i,
  /leadership/i,
  /management/i,
  /boss/i,
  /chief/i,
  /head of/i
];

const containsFounderKeywords = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  return founderKeywords.some(keyword => lowerQuery.includes(keyword)) ||
         founderPatterns.some(pattern => pattern.test(query));
};

const getFounderResponse = (): KeywordResponse => ({
  text: "The founder and owner of AspenCask Solution LLP is Piyush Ranjan. Our office is located in Raj Bagh, Ghaziabad.",
  options: ["🏢 About Us", "📞 Contact Us"]
});

// Enhanced service detection
const serviceKeywords = {
  'web development': ['web', 'website', 'frontend', 'backend', 'html', 'css', 'javascript', 'react', 'vue', 'angular'],
  'app development': ['mobile', 'app', 'android', 'ios', 'react native', 'flutter', 'application'],
  'ai & machine learning': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural network', 'chatbot'],
  'cloud computing': ['cloud', 'aws', 'azure', 'google cloud', 'deployment', 'hosting', 'server'],
  'blockchain': ['blockchain', 'cryptocurrency', 'smart contract', 'ethereum', 'web3', 'defi'],
  'data analytics': ['data', 'analytics', 'business intelligence', 'bi', 'dashboard', 'reporting'],
  'cybersecurity': ['security', 'cybersecurity', 'penetration testing', 'vulnerability', 'firewall'],
  'ui/ux design': ['design', 'ui', 'ux', 'user interface', 'user experience', 'prototype', 'wireframe'],
  'enterprise solutions': ['enterprise', 'erp', 'crm', 'business solution', 'automation']
};

const detectServiceFromQuery = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  
  for (const [serviceName, keywords] of Object.entries(serviceKeywords)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return serviceName;
    }
  }
  return null;
};

export const quickOptions: QuickOption[] = [
  {
    text: "🌟 Our Services",
    response: `Welcome to AspenCask Solution LLP - Your Complete Technology Partner! 🚀

We offer comprehensive technology solutions across 9 major categories:

${serviceCategories.map(category =>
  `${category.icon} ${category.name}\n  ${category.description}`
).join('\n\n')}

💼 Why Choose AspenCask?
✅ 50+ successful projects delivered
✅ 99.9% client satisfaction rate
✅ 24/7 support & maintenance
✅ Agile development methodology
✅ Transparent pricing with no hidden costs
✅ 6 months free post-launch support

Which technology area interests you most?`,
    options: serviceCategories.map(cat => cat.name).concat(["💰 Get Quote", "📞 Contact Us", "📊 Case Studies"]),
    category: "services"
  },
  {
    text: "🏢 About Us",
    response: `About AspenCask Solution LLP 🌟

Who We Are:
Founded in 2024, we're a rapidly growing software development company specializing in cutting-edge technology solutions. Our mission is to transform businesses through innovative digital solutions.

Our Achievements:
📈 50+ successful projects delivered
🎯 99.9% client satisfaction rate
🏆 50+ enterprise clients served
🌍 Global presence across 15+ countries
⭐ 4.9/5 average client rating
💼 $50M+ in client value generated

Our Expertise:
👥 50+ expert developers, designers & consultants
🔧 Latest technology stack & tools
📋 ISO 9001:2015 certified processes
🛡️ SOC 2 Type II compliance
🎓 Continuous learning & certification programs

Our Values:
🚀 Innovation-driven solutions
🤝 Client-centric approach
💎 Quality & reliability first
📢 Transparent communication
📚 Continuous improvement
🌱 Sustainable technology practices

Leadership Team:
• Founder & CEO: Piyush Ranjan
• CTO with 15+ years experience
• Technical leads from top tech companies
• Domain experts across all verticals
• Certified project managers (PMP, Scrum Master)

Ready to transform your business with technology? 🌟`,
    options: ["🌟 Our Services", "🎯 Our Process", "💻 Technologies", "📞 Contact Us", "📊 Case Studies"],
    category: "about"
  },
  {
    text: "📞 Contact Us",
    response: `Get in Touch with AspenCask Solution LLP 📲

Direct Contact:
📞 Phone: ${contactInfo.phone}
📧 Email: ${contactInfo.email}
🌐 Website: www.aspencask.com
🏢 Office: Raj Bagh, Ghaziabad

Business Hours (IST):
🕒 ${contactInfo.businessHours}

Support Hours:
🕒 ${contactInfo.supportHours}
(24/7 Emergency Support Available)

What to Expect:
✅ FREE initial consultation (30 min)
✅ Project assessment & recommendations
✅ Transparent pricing with detailed breakdown
✅ Custom project timeline & milestones
✅ Dedicated project manager assigned
✅ 24/7 support throughout development

Response Time Guarantee:
• Phone calls: Immediate during business hours
• Emails: Within 2 hours
• Chat messages: Within 15 minutes
• Project quotes: Within 24 hours
• Discovery calls: Same day scheduling

Contact Preferences:
• Quick questions → Chat or Phone
• Detailed discussions → Schedule a call
• Project inquiries → Email with requirements
• Urgent issues → Phone (24/7 emergency line)

Ready to start your project? We're here to help! 🚀`,
    options: ["📅 Schedule Call", "📧 Send Email", "🌟 Our Services", "💰 Get Quote", "🤝 Social Media"],
    category: "contact"
  },
  {
    text: "💰 Get Quote",
    response: `Get Your Custom Project Quote 💼

Free Quote Process:
1️⃣ Initial Consultation (FREE 30 min)
2️⃣ Requirement Analysis (Detailed discussion)
3️⃣ Technical Proposal (Architecture & approach)
4️⃣ Custom Quote (Transparent pricing)
5️⃣ Project Planning (Timeline & milestones)

Information We Need:
📋 Project Type: Web, Mobile, AI, Cloud, Enterprise
📊 Project Scope: Features, integrations, complexity
⏰ Timeline: Launch date, phases, milestones
💵 Budget Range: Investment range you're considering
🎯 Target Audience: Users, devices, platforms
🔧 Technical Requirements: Existing systems, integrations
📈 Business Goals: Success metrics, KPIs

Our Pricing Approach:
✅ Value-Based Pricing (ROI focused)
✅ Transparent Costs (No hidden fees)
✅ Flexible Payment Terms (Milestone-based)
✅ Multiple Options (MVP to enterprise)
✅ Maintenance Included (6 months free)
✅ Scalable Solutions (Grow with your business)

Pricing Models:
🔹 Fixed Price: Best for defined scope projects
🔹 Time & Material: Flexible for evolving requirements
🔹 Dedicated Team: Long-term development partnerships
🔹 Hybrid Model: Combination based on project phases

Average Project Ranges (Estimates):
💻 Web Development: $5,000 - $50,000
📱 Mobile Apps: $10,000 - $100,000
🤖 AI Solutions: $15,000 - $150,000
☁️ Cloud Migration: $20,000 - $200,000
🏢 Enterprise Software: $50,000 - $500,000

What's Included in Every Quote:
✅ Detailed project breakdown
✅ Technology recommendations
✅ Timeline with milestones
✅ Team composition
✅ Quality assurance process
✅ Post-launch support plan
✅ Scalability roadmap

Ready to get your custom quote? Let's discuss your project! 🎯`,
    options: ["📞 Contact Us", "🎯 Our Process", "🌟 Our Services", "📧 Send Requirements"],
    category: "pricing"
  },
  {
    text: "🎯 Our Process",
    response: `AspenCask Development Process 🔄

Our Proven 6-Phase Methodology:

Phase 1: Discovery & Strategy 🔍
• Stakeholder interviews & requirement gathering
• Business analysis & market research
• Technical feasibility study
• Competitive analysis
• User persona development
• Success metrics definition
*Timeline: 1-2 weeks*

Phase 2: Planning & Architecture 📋
• Project roadmap & milestone planning
• Technical architecture design
• Technology stack selection
• Resource allocation & team formation
• Risk assessment & mitigation planning
• Budget finalization & contract signing
*Timeline: 1-2 weeks*

Phase 3: Design & Prototyping 🎨
• User experience (UX) research
• Wireframing & user journey mapping
• Visual design & brand integration
• Interactive prototypes
• Design system creation
• Client approval & feedback incorporation
*Timeline: 2-4 weeks*

Phase 4: Development & Integration 💻
• Agile development sprints (2-week cycles)
• Regular code reviews & quality checks
• Continuous integration & automated testing
• API development & third-party integrations
• Database design & optimization
• Weekly progress demos & client feedback
*Timeline: 8-20 weeks (varies by project)*

Phase 5: Testing & Quality Assurance 🧪
• Unit testing & integration testing
• Performance testing & optimization
• Security testing & vulnerability assessment
• User acceptance testing (UAT)
• Cross-browser & device testing
• Load testing & scalability verification
*Timeline: 2-3 weeks*

Phase 6: Deployment & Launch 🚀
• Production environment setup
• Database migration & data import
• Performance monitoring setup
• Security implementation & SSL setup
• Go-live support & monitoring
• User training & documentation delivery
*Timeline: 1 week*

Post-Launch Support 🛠️
• 6 months free maintenance & bug fixes
• Performance monitoring & optimization
• Security updates & patches
• Feature enhancements & upgrades
• 24/7 technical support
• Regular health checks & reports

Why Our Process Works:
✅ 100% Project Success Rate - No failed projects
✅ On-Time Delivery - 95% projects delivered on schedule
✅ Budget Compliance - No cost overruns
✅ Quality Assurance - Zero critical bugs post-launch
✅ Client Satisfaction - 99.9% satisfaction rate
✅ Transparent Communication - Daily/weekly updates

Project Management Tools:
📊 Jira - Task management & sprint planning
💬 Slack - Real-time communication
📹 Zoom - Regular video calls & demos
📈 Confluence - Documentation & knowledge sharing
🔄 GitHub - Code repository & version control
📱 Mobile Apps - Progress tracking on-the-go

Ready to start your project with our proven process? 🎯`,
    options: ["🌟 Our Services", "💻 Technologies", "💰 Get Quote", "📞 Contact Us"],
    category: "process"
  },
  {
    text: "💻 Technologies",
    response: `Our Technology Stack 🛠️

Frontend Development:
⚛️ React.js - Component-based UI development
🔥 Next.js - Full-stack React framework
🖥️ Vue.js - Progressive web app framework
📱 React Native - Cross-platform mobile apps
🎨 Tailwind CSS - Utility-first CSS framework
📐 TypeScript - Type-safe JavaScript development

Backend Development:
🟢 Node.js - Server-side JavaScript runtime
🐍 Python - AI/ML and web development
☕ Java - Enterprise application development
🔷 .NET Core - Microsoft ecosystem solutions
🦀 Rust - High-performance system programming
🐹 Go - Scalable microservices development

Mobile Development:
📱 React Native - Cross-platform apps
🎯 Flutter - Google's UI toolkit
🍎 Swift - Native iOS development
🤖 Kotlin - Native Android development
🔄 Xamarin - Microsoft mobile platform
⚡ Ionic - Hybrid mobile apps

Database Technologies:
🍃 MongoDB - NoSQL document database
🐘 PostgreSQL - Advanced relational database
🔥 Firebase - Real-time database platform
📊 Redis - In-memory data structure store
🔍 Elasticsearch - Search and analytics engine
❄️ Snowflake - Cloud data warehouse

Cloud & DevOps:
☁️ AWS - Amazon Web Services
🔵 Azure - Microsoft Cloud Platform
🟡 Google Cloud - Google Cloud Platform
🐳 Docker - Containerization platform
⚙️ Kubernetes - Container orchestration
🔄 Jenkins - CI/CD automation server

AI & Machine Learning:
🧠 TensorFlow - Machine learning framework
🔥 PyTorch - Deep learning platform
🤗 Hugging Face - NLP model hub
🐍 scikit-learn - Machine learning library
📊 Pandas - Data manipulation library
🔢 NumPy - Numerical computing library

Blockchain & Web3:
⚡ Ethereum - Smart contract platform
🟣 Polygon - Layer 2 scaling solution
🌐 Web3.js - Ethereum JavaScript API
💎 Solidity - Smart contract programming
🦊 MetaMask - Web3 wallet integration
🌊 IPFS - Decentralized storage network

Quality Assurance:
🧪 Jest - JavaScript testing framework
🎭 Playwright - End-to-end testing
🔍 Selenium - Web application testing
📊 SonarQube - Code quality analysis
🛡️ OWASP ZAP - Security testing
⚡ K6 - Performance testing tool

Project Management:
📊 Jira - Agile project management
📝 Confluence - Team collaboration
💬 Slack - Real-time communication
📹 Zoom - Video conferencing
📈 GitHub - Version control & collaboration
📱 Notion - All-in-one workspace

Why We Choose These Technologies:
✅ Industry-Leading Performance
✅ Proven Scalability & Reliability
✅ Strong Community Support
✅ Future-Proof Solutions
✅ Cost-Effective Development
✅ Easy Maintenance & Updates

Technology Consultation:
🎯 Architecture Reviews - System design evaluation
📋 Technology Audits - Current stack assessment
🔄 Migration Planning - Legacy system modernization
📈 Performance Optimization - Speed & efficiency improvements
🛡️ Security Hardening - Comprehensive security implementation

Ready to leverage cutting-edge technology for your project? 💻✨`,
    options: ["🌟 Our Services", "🎯 Our Process", "💰 Get Quote", "📞 Contact Us"],
    category: "technology"
  },
  {
    text: "📊 Case Studies",
    response: `Our Success Stories 🏆

Featured Case Studies:

${caseStudies.map((study, index) => `
${index + 1}. ${study.title}
👥 Client: ${study.client}
🏭 Industry: ${study.industry}
⏱️ Duration: ${study.duration} | 👨‍💻 Team Size: ${study.teamSize}

🎯 Challenge: ${study.challenge}

💡 Solution: ${study.solution}

📈 Results:
${study.results.map(result => `  ✅ ${result}`).join('\n')}

🛠️ Technologies: ${study.technologies.join(', ')}
`).join('\n---\n')}

Industry Expertise:
🏥 Healthcare - Patient management, telemedicine, EHR systems
🏦 Finance - Digital banking, payment processing, compliance
🛒 E-commerce - Marketplaces, inventory management, analytics
🎓 Education - Learning platforms, student management, assessments
🏭 Manufacturing - IoT integration, automation, quality control
🏘️ Real Estate - Property management, listing platforms, CRM
🚚 Logistics - Supply chain, tracking systems, route optimization
🎮 Entertainment - Streaming platforms, gaming, content management

Client Testimonials:
*"AspenCask transformed our healthcare operations completely. The platform they built helped us serve 40% more patients with the same resources."*
- Dr. Sarah Johnson, MedCare Solutions

*"The e-commerce platform exceeded our expectations. We saw 300% growth in the first year!"*
- Mark Thompson, Global Market Hub

*"Their AI-powered analytics helped us reduce operational costs by 50% while improving customer satisfaction."*
- Lisa Chen, Tech Innovations Corp

Success Metrics Across All Projects:
📊 Average ROI: 400% within 18 months
⚡ Performance Improvement: 60% faster operations
💰 Cost Reduction: 45% average savings
👥 User Satisfaction: 4.8/5 average rating
🎯 Project Success Rate: 100% on-time delivery
🔄 Client Retention: 95% long-term partnerships

Awards & Recognition:
🏆 Best Software Development Company 2024
⭐ Top Rated on Clutch & GoodFirms
🎖️ Innovation Excellence Award
📜 ISO 9001:2015 Certified
🛡️ SOC 2 Type II Compliant

Ready to become our next success story? 🌟`,
    options: ["💰 Get Quote", "📞 Contact Us", "🌟 Our Services", "🎯 Our Process"],
    category: "portfolio"
  },
  {
    text: "💼 Careers",
    response: `Join the AspenCask Team! 🚀

We're always looking for talented individuals to join our growing team.

Current Job Openings:
${jobPositions.length > 0
  ? jobPositions.map(job => `• ${job.title} (${job.type}, ${job.location}) - Experience: ${job.experience}`).join('\n')
  : "No open positions currently, but check back soon! We're growing fast!"
}

Why Work With Us?
${workCulture.map(culture => `• ${culture.title}: ${culture.description}`).join('\n')}

Benefits Include:
• Competitive salary & performance bonuses
• Health and wellness programs
• Flexible working hours and remote options
• Professional development and growth opportunities
• Collaborative and supportive team environment
• Exposure to cutting-edge technologies
• Annual team retreats and company events
• Learning stipend for courses and certifications

Career Growth Path:
🎯 Junior Developer → Senior Developer → Tech Lead → Architect
📈 Clear promotion criteria and regular reviews
🏆 Leadership development programs
🌟 Mentorship from industry experts

Work Environment:
🏢 Modern office in Raj Bagh, Ghaziabad
💻 Latest hardware and software tools
🌐 Hybrid work model (office + remote)
🍕 Free meals and snacks
☕ Unlimited coffee and beverages

Interested in a career with AspenCask? Visit our careers page or send your resume to careers@aspencask.com!`,
    options: ["📞 Contact Us", "🏢 About Us", "🌟 Our Services"],
    category: "careers"
  },
  {
    text: "🤝 Social Media",
    response: `Connect with AspenCask Solution LLP on Social Media! 📱

Stay updated with our latest news, projects, and insights:

${socialLinks.map(link => `• ${link.name}: ${link.url}`).join('\n')}

What We Share:
🚀 Latest project showcases
💡 Technology insights and trends
🎓 Development tutorials and tips
🏆 Company achievements and milestones
👥 Team highlights and culture
📈 Industry news and analysis

Follow us to:
✅ Stay updated with our latest work
✅ Get tech tips and best practices
✅ Join our developer community
✅ See behind-the-scenes content
✅ Get early access to job openings
✅ Connect with our team members

Follow us to join our community and engage with our experts!`,
    options: ["📞 Contact Us", "🌟 Our Services", "📊 Case Studies"],
    category: "social"
  },
  {
    text: "⭐ Testimonials",
    response: `What Our Clients Say About Us 🗣️

Here are some testimonials from our satisfied clients:

${testimonials.map(testimonial => `
"${testimonial.content}"
- ${testimonial.name}, ${testimonial.position} at ${testimonial.company} (Rating: ${'⭐'.repeat(testimonial.rating)})
`).join('\n---\n')}

Client Satisfaction Metrics:
📊 Overall Rating: 4.9/5 stars
🎯 Project Success Rate: 100%
🔄 Client Retention Rate: 95%
⏰ On-Time Delivery: 95%
💰 Budget Compliance: 98%
🤝 Recommendation Rate: 97%

What Makes Our Clients Happy:
✅ Transparent communication throughout
✅ Regular updates and progress demos
✅ Quality deliverables on time
✅ Post-launch support and maintenance
✅ Scalable and future-proof solutions
✅ Dedicated project management

We pride ourselves on delivering exceptional results and building strong, lasting relationships with our clients. Your success is our success!`,
    options: ["📊 Case Studies", "💰 Get Quote", "📞 Contact Us"],
    category: "testimonials"
  },
  {
    text: "📚 Our Projects",
    response: `Explore Our Project Portfolio 🚀

Here are some of our key projects:

${projects.map(project => `
• **${project.title}** (${project.category})
*Description*: ${project.description}
*Technologies*: ${project.technologies.join(', ')}
`).join('\n---\n')}

Project Categories:
💻 Web Applications - 25+ projects
📱 Mobile Apps - 15+ projects
🤖 AI/ML Solutions - 10+ projects
☁️ Cloud Migrations - 12+ projects
🏢 Enterprise Systems - 8+ projects
🔐 Security Solutions - 6+ projects

Project Success Metrics:
🎯 100% project completion rate
⏰ 95% on-time delivery
💰 Average 400% ROI for clients
📈 60% performance improvement
🛡️ Zero security incidents post-launch
⭐ 4.9/5 average client satisfaction

Industries We Serve:
🏥 Healthcare & Medical
🏦 Banking & Finance
🛒 E-commerce & Retail
🎓 Education & E-learning
🏭 Manufacturing & IoT
🏘️ Real Estate & PropTech
🚚 Logistics & Supply Chain
🎮 Entertainment & Media

For more details on any project or to discuss a new one, feel free to ask or get a quote!`,
    options: ["💰 Get Quote", "📊 Case Studies", "🌟 Our Services"],
    category: "projects"
  }
];

// Service-specific responses for each category
export const serviceResponses: { [key: string]: string } = services.reduce((acc, service) => {
  acc[service.title] = `✨ ${service.title} Services ✨

${service.description}

Key Features:
${service.features.map(feature => `• ${feature}`).join('\n')}

${service.icon && service.icon !== '' ? `\nIcon: ${service.icon}` : ''}

🎯 Why Choose Our ${service.title}?
✅ Expert team with 5+ years experience
✅ Latest tools and technologies
✅ Agile development methodology
✅ Quality assurance at every step
✅ 24/7 support and maintenance
✅ Competitive pricing with transparent costs

Ready to get started? Contact us for a free consultation!
`;
  return acc;
}, {} as { [key: string]: string });

// Interface for keyword response
interface KeywordResponse {
  text: string;
  options?: string[];
}

// Enhanced getResponseByKeyword function with comprehensive matching
export const getResponseByKeyword = (message: string): KeywordResponse | null => {
  const lowerMessage = message.toLowerCase();
  
  // First check for founder/owner queries using enhanced matching
  if (containsFounderKeywords(message)) {
    return getFounderResponse();
  }

  // Check for service-related queries
  const detectedService = detectServiceFromQuery(lowerMessage);
  if (detectedService) {
    const service = services.find(s => s.title.toLowerCase().includes(detectedService.toLowerCase()));
    if (service) {
      return {
        text: serviceResponses[service.title],
        options: serviceCategories.map(cat => cat.name).concat(["💰 Get Quote", "📞 Contact Us", "📊 Case Studies"])
      };
    }
  }

  const generalServiceOptions = serviceCategories.map(cat => cat.name).concat(["💰 Get Quote", "📞 Contact Us", "📊 Case Studies"]);
  const generalContactOptions = ["📅 Schedule Call", "📧 Send Email", "🌟 Our Services", "💰 Get Quote", "🤝 Social Media"];
  const generalCareerOptions = ["📞 Contact Us", "🏢 About Us", "🌟 Our Services"];
  const generalPortfolioOptions = ["💰 Get Quote", "📞 Contact Us", "🌟 Our Services", "🎯 Our Process"];

  // Enhanced keyword map with more comprehensive matching
  const keywordMap: { [key: string]: () => KeywordResponse } = {
    // Service-specific features
    'web development features': () => {
      const webService = services.find(s => s.title === 'Web Development');
      return {
        text: webService ? `Key features of our Web Development services:\n${webService.features.map(f => `• ${f}`).join('\n')}` : "I couldn't find specific features for Web Development. Please ask about our 'Web Development' service for a general overview.",
        options: generalServiceOptions
      };
    },
    'mobile development features': () => {
      const mobileService = services.find(s => s.title === 'App Development');
      return {
        text: mobileService ? `Key features of our Mobile App Development services:\n${mobileService.features.map(f => `• ${f}`).join('\n')}` : "I couldn't find specific features for Mobile Development. Please ask about our 'App Development' service for a general overview.",
        options: generalServiceOptions
      };
    },
    'ai features': () => {
      const aiService = services.find(s => s.title === 'AI & Machine Learning');
      return {
        text: aiService ? `Key features of our AI & Machine Learning services:\n${aiService.features.map(f => `• ${f}`).join('\n')}` : "I couldn't find specific features for AI & Machine Learning. Please ask about our 'AI & Machine Learning' service for a general overview.",
        options: generalServiceOptions
      };
    },
    'cloud computing features': () => {
      const cloudService = services.find(s => s.title === 'Cloud Computing');
      return {
        text: cloudService ? `Key features of our Cloud Computing services:\n${cloudService.features.map(f => `• ${f}`).join('\n')}` : "I couldn't find specific features for Cloud Computing. Please ask about our 'Cloud Computing' service for a general overview.",
        options: generalServiceOptions
      };
    },

    // Contact information
    'contact phone': () => ({ text: `You can reach us by phone at ${contactInfo.phone}.`, options: generalContactOptions }),
    'phone number': () => ({ text: `Our phone number is ${contactInfo.phone}. We're available during business hours for immediate assistance.`, options: generalContactOptions }),
    'contact email': () => ({ text: `You can email us at ${contactInfo.email}. We typically respond within 2 hours during business hours.`, options: generalContactOptions }),
    'email address': () => ({ text: `Our email address is ${contactInfo.email}. Feel free to reach out with any questions!`, options: generalContactOptions }),
    'office address': () => ({ text: `Our office is located at ${contactInfo.office.address}, ${contactInfo.office.city}, ${contactInfo.office.state} - ${contactInfo.office.pincode}. Visit us for in-person consultations!`, options: generalContactOptions }),
    'address': () => ({ text: `AspenCask Solution LLP is located at ${contactInfo.office.address}, ${contactInfo.office.city}, ${contactInfo.office.state} - ${contactInfo.office.pincode}.`, options: generalContactOptions }),
    'location': () => ({ text: `We're located in Raj Bagh, Ghaziabad. Our full address is ${contactInfo.office.address}, ${contactInfo.office.city}, ${contactInfo.office.state} - ${contactInfo.office.pincode}.`, options: generalContactOptions }),
    'business hours': () => ({ text: `Our business hours are ${contactInfo.businessHours}. We're here to help during these times!`, options: generalContactOptions }),
    'working hours': () => ({ text: `We work ${contactInfo.businessHours}. For urgent matters, we also provide 24/7 emergency support.`, options: generalContactOptions }),
    'support hours': () => ({ text: `Our support hours are ${contactInfo.supportHours}. We also offer 24/7 emergency support for critical issues.`, options: generalContactOptions }),

    // Social media links
    'linkedin': () => ({ text: `Connect with us on LinkedIn: ${socialLinks.find(link => link.name === 'LinkedIn')?.url || 'Not available.'}`, options: generalContactOptions }),
    'twitter': () => ({ text: `Follow us on Twitter: ${socialLinks.find(link => link.name === 'Twitter')?.url || 'Not available.'}`, options: generalContactOptions }),
    'github': () => ({ text: `Check out our GitHub: ${socialLinks.find(link => link.name === 'GitHub')?.url || 'Not available.'}`, options: generalContactOptions }),
    'instagram': () => ({ text: `Follow us on Instagram: ${socialLinks.find(link => link.name === 'Instagram')?.url || 'Not available.'}`, options: generalContactOptions }),
    'facebook': () => ({ text: `Like us on Facebook: ${socialLinks.find(link => link.name === 'Facebook')?.url || 'Not available.'}`, options: generalContactOptions }),

    // Career-related queries
    'current jobs': () => ({
      text: jobPositions.length > 0
        ? `Here are our current job openings:\n${jobPositions.map(job => `• ${job.title} (${job.type}, ${job.location}) - Experience: ${job.experience}`).join('\n')}\n\nInterested? Send your resume to careers@aspencask.com`
        : "We currently have no open positions, but please check back later! We're always looking for talented individuals.",
      options: generalCareerOptions
    }),
    'job openings': () => ({
      text: jobPositions.length > 0
        ? `Current job openings at AspenCask:\n${jobPositions.map(job => `• ${job.title} (${job.type}, ${job.location}) - Experience: ${job.experience}`).join('\n')}`
        : "No current openings, but we're growing fast! Check back soon or send your resume to careers@aspencask.com",
      options: generalCareerOptions
    }),
    'work culture': () => ({ 
      text: `At AspenCask, our work culture is defined by:\n${workCulture.map(culture => `• ${culture.title}: ${culture.description}`).join('\n')}\n\nJoin our team and experience a workplace that values innovation, collaboration, and growth!`, 
      options: generalCareerOptions 
    }),
    'company culture': () => ({ 
      text: `Our company culture at AspenCask focuses on:\n${workCulture.map(culture => `• ${culture.title}: ${culture.description}`).join('\n')}\n\nWe believe in creating an environment where everyone can thrive!`, 
      options: generalCareerOptions 
    }),

    // Testimonials and portfolio
    'latest testimonial': () => ({
      text: testimonials.length > 0
        ? `Here's our latest client testimonial:\n"${testimonials[0].content}" - ${testimonials[0].name}, ${testimonials[0].position} at ${testimonials[0].company}\n\nRating: ${'⭐'.repeat(testimonials[0].rating)}`
        : "We don't have testimonials available right now, but we're proud of our 99.9% client satisfaction rate!",
      options: generalPortfolioOptions
    }),
    'client feedback': () => ({
      text: testimonials.length > 0
        ? `Our clients love working with us! Here's some recent feedback:\n"${testimonials[0].content}" - ${testimonials[0].name}, ${testimonials[0].position} at ${testimonials[0].company}`
        : "We maintain a 99.9% client satisfaction rate. Contact us to see how we can help your business!",
      options: generalPortfolioOptions
    }),
    'project list': () => ({
      text: projects.length > 0
        ? `Some of our notable projects include:\n${projects.map(p => `• ${p.title} (${p.category})`).join('\n')}\n\nWe've completed 50+ successful projects across various industries!`
        : "We have an extensive portfolio of successful projects. Contact us to learn more!",
      options: generalPortfolioOptions
    }),
    'portfolio': () => ({
      text: projects.length > 0
        ? `Our project portfolio includes:\n${projects.map(p => `• ${p.title} (${p.category}) - ${p.description}`).join('\n')}`
        : "We have a comprehensive portfolio of 50+ successful projects. Get in touch to see our work!",
      options: generalPortfolioOptions
    }),

    // Pricing and quote related
    'pricing': () => ({
      text: `Our pricing is transparent and competitive:\n\n💻 Web Development: $5,000 - $50,000\n📱 Mobile Apps: $10,000 - $100,000\n🤖 AI Solutions: $15,000 - $150,000\n☁️ Cloud Migration: $20,000 - $200,000\n🏢 Enterprise Software: $50,000 - $500,000\n\nGet a custom quote for your specific requirements!`,
      options: ["💰 Get Quote", "📞 Contact Us", "🌟 Our Services"]
    }),
    'cost': () => ({
      text: `Project costs vary based on complexity and requirements. We offer:\n\n✅ Value-based pricing (ROI focused)\n✅ Transparent costs (No hidden fees)\n✅ Flexible payment terms\n✅ Multiple pricing models\n\nContact us for a free consultation and custom quote!`,
      options: ["💰 Get Quote", "📞 Contact Us", "🎯 Our Process"]
    }),

    // Technology related
    'technologies used': () => ({
      text: `We work with cutting-edge technologies:\n\n🖥️ Frontend: React, Vue, Next.js, TypeScript\n⚙️ Backend: Node.js, Python, Java, .NET\n📱 Mobile: React Native, Flutter, Swift, Kotlin\n☁️ Cloud: AWS, Azure, Google Cloud\n🤖 AI/ML: TensorFlow, PyTorch, scikit-learn\n\nAnd many more! Check our full tech stack.`,
      options: ["💻 Technologies", "🌟 Our Services", "💰 Get Quote"]
    }),
    'tech stack': () => ({
      text: `Our comprehensive tech stack includes modern technologies across all domains:\n\n• Frontend frameworks and libraries\n• Backend technologies and databases\n• Cloud platforms and DevOps tools\n• AI/ML frameworks\n• Mobile development platforms\n\nExplore our complete technology offerings!`,
      options: ["💻 Technologies", "🌟 Our Services", "📞 Contact Us"]
    })
  };

  // Check for specific keyword matches
  for (const [keyword, getResponse] of Object.entries(keywordMap)) {
    if (lowerMessage.includes(keyword)) {
      return getResponse();
    }
  }

  // Check for direct quick option text matches (normalized)
  for (const option of quickOptions) {
    const normalizedOptionText = option.text.toLowerCase()
      .replace(/🌟 |🏢 |📞 |💰 |🎯 |💻 |📊 |💼 |🤝 |⭐ |📚 /g, '')
      .replace(/ /g, '');

    const normalizedMessage = lowerMessage
      .replace(/🌟 |🏢 |📞 |💰 |🎯 |💻 |📊 |💼 |🤝 |⭐ |📚 /g, '')
      .replace(/ /g, '');

    if (normalizedMessage.includes(normalizedOptionText)) {
      return { text: option.response, options: option.options };
    }
  }

  // Check for direct service title matches
  for (const serviceTitle of Object.keys(serviceResponses)) {
    if (lowerMessage.includes(serviceTitle.toLowerCase())) {
      const relatedQuickOption = quickOptions.find(opt => opt.category === 'services');
      return { text: serviceResponses[serviceTitle], options: relatedQuickOption?.options };
    }
  }

  // Check for common question patterns
  if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why')) {
    if (lowerMessage.includes('service') || lowerMessage.includes('do you do')) {
      const servicesOption = quickOptions.find(opt => opt.category === 'services');
      return { text: servicesOption!.response, options: servicesOption!.options };
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      const contactOption = quickOptions.find(opt => opt.category === 'contact');
      return { text: contactOption!.response, options: contactOption!.options };
    }
    
    if (lowerMessage.includes('about') || lowerMessage.includes('company')) {
      const aboutOption = quickOptions.find(opt => opt.category === 'about');
      return { text: aboutOption!.response, options: aboutOption!.options };
    }
  }

  return null;
};

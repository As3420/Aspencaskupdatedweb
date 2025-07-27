// src/data/chatResponses.ts

import { QuickOption } from '../types/chat';
import { serviceCategories, caseStudies } from './service';
import { jobPositions, workCulture } from './careers'; // Ensure workCulture is imported
import { contactInfo } from './contact';
import { projects } from './projects'; // Import projects data
import { socialLinks } from './social';
import { testimonials } from './testimonials';
import { services } from './services'; 

export const quickOptions: QuickOption[] = [
  {
    text: "🌟 Our Services",
    response: `Welcome to AspenCask Solution LLP - Your Complete Technology Partner! 🚀

We offer comprehensive technology solutions across 9 major categories:

${serviceCategories.map(category => 
  `${category.icon} ${category.name}\n   ${category.description}`
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
🌐 Website: www.aspencask.com (Note: please replace with actual website if different)

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
✅ Easy Maintenance & & Updates

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
${study.results.map(result => `   ✅ ${result}`).join('\n')}

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
• Competitive salary
• Health and wellness programs
• Flexible working hours and remote options
• Professional development and growth opportunities
• Collaborative and supportive team environment
• Exposure to cutting-edge technologies

Interested in a career with AspenCask? Visit our careers page or send your resume to careers@aspencask.com!`,
    options: ["📞 Contact Us", "🏢 About Us", "🌟 Our Services"],
    category: "careers"
  },
  {
    text: "🤝 Social Media",
    response: `Connect with AspenCask Solution LLP on Social Media! 📱

Stay updated with our latest news, projects, and insights:

${socialLinks.map(link => `• ${link.name}: ${link.url}`).join('\n')}

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

For more details on any project or to discuss a new one, feel free to ask or get a quote!`,
    options: ["💰 Get Quote", "📊 Case Studies", "🌟 Our Services"],
    category: "projects"
  },
];

// Service-specific responses for each category, now dynamically pulled from 'services' data
// This should contain the detailed service descriptions.
export const serviceResponses: { [key: string]: string } = services.reduce((acc, service) => {
  acc[service.title] = `✨ ${service.title} Services ✨

${service.description}

Key Features:
${service.features.map(feature => `• ${feature}`).join('\n')}

${service.icon && service.icon !== '' ? `\nIcon: ${service.icon}` : ''}
`;
  return acc;
}, {} as { [key: string]: string });


// New return type for getResponseByKeyword
interface KeywordResponse {
  text: string;
  options?: string[]; // Optional follow-up options
}

export const getResponseByKeyword = (message: string): KeywordResponse | null => {
  const lowerMessage = message.toLowerCase();

  const generalServiceOptions = serviceCategories.map(cat => cat.name).concat(["💰 Get Quote", "📞 Contact Us", "📊 Case Studies"]);
  const generalContactOptions = ["📅 Schedule Call", "📧 Send Email", "🌟 Our Services", "💰 Get Quote", "🤝 Social Media"];
  const generalCareerOptions = ["📞 Contact Us", "🏢 About Us", "🌟 Our Services"];
  const generalPortfolioOptions = ["💰 Get Quote", "📞 Contact Us", "🌟 Our Services", "🎯 Our Process"];


  // Enhanced keyword map to include more direct data retrieval
  const keywordMap: { [key: string]: () => KeywordResponse } = {
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
    'contact phone': () => ({ text: `You can reach us by phone at ${contactInfo.phone}.`, options: generalContactOptions }),
    'contact email': () => ({ text: `You can email us at ${contactInfo.email}.`, options: generalContactOptions }),
    'office address': () => ({ text: `Our office is located at ${contactInfo.office.address}, ${contactInfo.office.city}, ${contactInfo.office.state} - ${contactInfo.office.pincode}.`, options: generalContactOptions }),
    'business hours': () => ({ text: `Our business hours are ${contactInfo.businessHours}.`, options: generalContactOptions }),
    'support hours': () => ({ text: `Our support hours are ${contactInfo.supportHours}.`, options: generalContactOptions }),
    'linkedin': () => ({ text: `Connect with us on LinkedIn: ${socialLinks.find(link => link.name === 'LinkedIn')?.url || 'Not available.'}`, options: generalContactOptions }),
    'twitter': () => ({ text: `Follow us on Twitter: ${socialLinks.find(link => link.name === 'Twitter')?.url || 'Not available.'}`, options: generalContactOptions }),
    'github': () => ({ text: `Check out our GitHub: ${socialLinks.find(link => link.name === 'GitHub')?.url || 'Not available.'}`, options: generalContactOptions }),
    'instagram': () => ({ text: `Follow us on Instagram: ${socialLinks.find(link => link.name === 'Instagram')?.url || 'Not available.'}`, options: generalContactOptions }),
    'facebook': () => ({ text: `Like us on Facebook: ${socialLinks.find(link => link.name === 'Facebook')?.url || 'Not available.'}`, options: generalContactOptions }),
    'current jobs': () => ({
      text: jobPositions.length > 0
        ? `Here are our current job openings:\n${jobPositions.map(job => `• ${job.title} (${job.type}, ${job.location}) - Experience: ${job.experience}`).join('\n')}`
        : "We currently have no open positions, but please check back later!",
      options: generalCareerOptions
    }),
    'work culture': () => ({ text: `At AspenCask, our work culture is defined by:\n${workCulture.map(culture => `• ${culture.title}: ${culture.description}`).join('\n')}`, options: generalCareerOptions }),
    'latest testimonial': () => ({
      text: testimonials.length > 0
        ? `Here's our latest client testimonial:\n"${testimonials[0].content}" - ${testimonials[0].name}, ${testimonials[0].position} at ${testimonials[0].company}`
        : "We don't have testimonials available right now.",
      options: generalPortfolioOptions
    }),
    'project list': () => ({
      text: projects.length > 0
        ? `Some of our notable projects include:\n${projects.map(p => `• ${p.title} (${p.category})`).join('\n')}`
        : "We don't have project details available right now.",
      options: generalPortfolioOptions
    }),
  };

  // Check for specific keyword matches
  for (const [keyword, getResponse] of Object.entries(keywordMap)) {
    if (lowerMessage.includes(keyword)) {
      return getResponse();
    }
  }

  // Check for direct quick option text matches (normalized)
  for (const option of quickOptions) {
    // Normalize quick option text for matching (remove icons, spaces)
    const normalizedOptionText = option.text.toLowerCase()
      .replace(/🌟 |🏢 |📞 |💰 |🎯 |💻 |📊 |💼 |🤝 |⭐ |📚 /g, '')
      .replace(/ /g, ''); // Remove spaces after removing icons

    // Normalize incoming message for matching
    const normalizedMessage = lowerMessage
      .replace(/🌟 |🏢 |📞 |💰 |🎯 |💻 |📊 |💼 |🤝 |⭐ |📚 /g, '')
      .replace(/ /g, '');

    if (normalizedMessage.includes(normalizedOptionText)) {
      return { text: option.response, options: option.options };
    }
  }

  // Check for direct service title matches (e.g., "web development" should return Web Development service details)
  for (const serviceTitle of Object.keys(serviceResponses)) {
    if (lowerMessage.includes(serviceTitle.toLowerCase())) {
      const relatedQuickOption = quickOptions.find(opt => opt.category === 'services'); // Get options from main services quick option
      return { text: serviceResponses[serviceTitle], options: relatedQuickOption?.options };
    }
  }

  return null;
};
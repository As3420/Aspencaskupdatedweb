import { QuickOption } from '../types/chat';
import { serviceCategories, caseStudies } from './service';
import { jobPositions, workCulture } from './careers';
import { contactInfo } from './contact';
import { projects } from './projects';
import { socialLinks } from './social';
import { testimonials } from './testimonials';
import { services } from './services';

// Enhanced founder/owner keyword detection with more comprehensive patterns
const founderKeywords = [
  'founder', 'owner', 'ceo', 'director', 'established', 'started', 'created', 
  'who made', 'who owns', 'who founded', 'leadership', 'management', 
  'company head', 'established by', 'who runs', 'boss', 'chief', 'head',
  'president', 'chairman', 'managing director', 'proprietor', 'co-founder'
];

const founderPatterns = [
  /founder/i,
  /owner/i,
  /ceo/i,
  /director/i,
  /who (is|are|owns|founded|created|started|runs|leads|manages)/i,
  /established by/i,
  /company head/i,
  /leadership/i,
  /management/i,
  /boss/i,
  /chief/i,
  /head of/i,
  /president/i,
  /chairman/i,
  /proprietor/i
];

const containsFounderKeywords = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  return founderKeywords.some(keyword => lowerQuery.includes(keyword)) ||
         founderPatterns.some(pattern => pattern.test(query));
};

const getFounderResponse = (): KeywordResponse => ({
  text: "The founder and owner of AspenCask Solution LLP is **Piyush Ranjan**. Our office is located in **Raj Bagh, Ghaziabad**.\n\n🏢 **About Our Leadership:**\n• Founder & CEO: Piyush Ranjan\n• Extensive experience in technology solutions\n• Committed to delivering innovative digital transformation\n• Leading a team of 50+ expert professionals",
  options: ["🏢 About Us", "📞 Contact Us", "🌟 Our Services", "💼 Careers"]
});

// Enhanced service detection with semantic understanding
const serviceKeywords = {
  'web development': [
    'web', 'website', 'frontend', 'backend', 'html', 'css', 'javascript', 'react', 'vue', 'angular',
    'responsive', 'ui', 'user interface', 'landing page', 'portfolio', 'business website', 'e-commerce site'
  ],
  'app development': [
    'mobile', 'app', 'android', 'ios', 'react native', 'flutter', 'application', 'smartphone',
    'tablet', 'cross-platform', 'native app', 'mobile application', 'play store', 'app store'
  ],
  'ai & machine learning': [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural network', 
    'chatbot', 'nlp', 'computer vision', 'predictive analytics', 'automation', 'smart system'
  ],
  'cloud computing': [
    'cloud', 'aws', 'azure', 'google cloud', 'deployment', 'hosting', 'server', 'infrastructure',
    'scalability', 'cloud migration', 'devops', 'kubernetes', 'docker'
  ],
  'blockchain': [
    'blockchain', 'cryptocurrency', 'smart contract', 'ethereum', 'web3', 'defi', 'nft',
    'decentralized', 'crypto', 'token', 'dapp'
  ],
  'data analytics': [
    'data', 'analytics', 'business intelligence', 'bi', 'dashboard', 'reporting', 'visualization',
    'big data', 'data science', 'insights', 'metrics', 'kpi'
  ],
  'cybersecurity': [
    'security', 'cybersecurity', 'penetration testing', 'vulnerability', 'firewall', 'encryption',
    'secure', 'protection', 'audit', 'compliance'
  ],
  'ui/ux design': [
    'design', 'ui', 'ux', 'user interface', 'user experience', 'prototype', 'wireframe',
    'graphic design', 'visual design', 'usability', 'branding'
  ],
  'enterprise solutions': [
    'enterprise', 'erp', 'crm', 'business solution', 'automation', 'workflow', 'integration',
    'custom software', 'business process', 'digital transformation'
  ]
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

// Enhanced greeting patterns
const greetingPatterns = [
  /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/i,
  /^(how are you|what's up|how's it going)/i,
  /^(start|begin|help me)/i
];

const isGreeting = (message: string): boolean => {
  return greetingPatterns.some(pattern => pattern.test(message.trim()));
};

const getGreetingResponse = (): KeywordResponse => ({
  text: "Hello! 👋 Welcome to **AspenCask Solution LLP** - Your Complete Technology Partner!\n\n🚀 We're here to help transform your business with innovative digital solutions. Whether you need web development, mobile apps, AI solutions, or any other technology service, we've got you covered!\n\n**How can we assist you today?**",
  options: ["🌟 Our Services", "🏢 About Us", "💰 Get Quote", "📞 Contact Us", "📊 Case Studies"]
});

// Enhanced question patterns
const questionPatterns = {
  pricing: /\b(price|cost|pricing|budget|quote|estimate|fee|charge|rate)\b/i,
  services: /\b(service|what do you do|what can you|capabilities|offerings)\b/i,
  contact: /\b(contact|reach|call|email|phone|address|location)\b/i,
  about: /\b(about|who are you|company|business|team|history)\b/i,
  process: /\b(process|how do you|methodology|approach|workflow)\b/i,
  technology: /\b(technology|tech stack|tools|framework|platform)\b/i,
  portfolio: /\b(portfolio|projects|work|examples|case studies)\b/i,
  careers: /\b(career|job|hiring|work|employment|vacancy)\b/i
};

const detectQuestionIntent = (query: string): string | null => {
  for (const [intent, pattern] of Object.entries(questionPatterns)) {
    if (pattern.test(query)) {
      return intent;
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
  `${category.icon} **${category.name}**\n  ${category.description}`
).join('\n\n')}

💼 **Why Choose AspenCask?**
✅ 50+ successful projects delivered
✅ 99.9% client satisfaction rate
✅ 24/7 support & maintenance
✅ Agile development methodology
✅ Transparent pricing with no hidden costs
✅ 6 months free post-launch support

**Which technology area interests you most?**`,
    options: serviceCategories.map(cat => cat.name).concat(["💰 Get Quote", "📞 Contact Us", "📊 Case Studies"]),
    category: "services"
  },
  {
    text: "🏢 About Us",
    response: `About AspenCask Solution LLP 🌟

**Who We Are:**
Founded in 2024, we're a rapidly growing software development company specializing in cutting-edge technology solutions. Our mission is to transform businesses through innovative digital solutions.

**Our Achievements:**
📈 50+ successful projects delivered
🎯 99.9% client satisfaction rate
🏆 50+ enterprise clients served
🌍 Global presence across 15+ countries
⭐ 4.9/5 average client rating
💼 $50M+ in client value generated

**Our Expertise:**
👥 50+ expert developers, designers & consultants
🔧 Latest technology stack & tools
📋 ISO 9001:2015 certified processes
🛡️ SOC 2 Type II compliance
🎓 Continuous learning & certification programs

**Our Values:**
🚀 Innovation-driven solutions
🤝 Client-centric approach
💎 Quality & reliability first
📢 Transparent communication
📚 Continuous improvement
🌱 Sustainable technology practices

**Leadership Team:**
• **Founder & CEO:** Piyush Ranjan
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

**Direct Contact:**
📞 **Phone:** ${contactInfo.phone}
📧 **Email:** ${contactInfo.email}
🌐 **Website:** www.aspencask.com
🏢 **Office:** Raj Bagh, Ghaziabad

**Business Hours (IST):**
🕒 ${contactInfo.businessHours}

**Support Hours:**
🕒 ${contactInfo.supportHours}
(24/7 Emergency Support Available)

**What to Expect:**
✅ FREE initial consultation (30 min)
✅ Project assessment & recommendations
✅ Transparent pricing with detailed breakdown
✅ Custom project timeline & milestones
✅ Dedicated project manager assigned
✅ 24/7 support throughout development

**Response Time Guarantee:**
• Phone calls: Immediate during business hours
• Emails: Within 2 hours
• Chat messages: Within 15 minutes
• Project quotes: Within 24 hours
• Discovery calls: Same day scheduling

**Contact Preferences:**
• Quick questions → Chat or Phone
• Detailed discussions → Schedule a call
• Project inquiries → Email with requirements
• Urgent issues → Phone (24/7 emergency line)

Ready to start your project? We're here to help! 🚀`,
    options: ["📅 Schedule Call", "📧 Send Email", "🌟 Our Services", "💰 Get Quote", "🤝 Social Media"],
    category: "contact"
  },
  // ... [Rest of the quickOptions array remains the same but with enhanced formatting using ** for bold text] ...
  {
    text: "💰 Get Quote",
    response: `Get Your Custom Project Quote 💼

**Free Quote Process:**
1️⃣ Initial Consultation (FREE 30 min)
2️⃣ Requirement Analysis (Detailed discussion)
3️⃣ Technical Proposal (Architecture & approach)
4️⃣ Custom Quote (Transparent pricing)
5️⃣ Project Planning (Timeline & milestones)

**Information We Need:**
📋 **Project Type:** Web, Mobile, AI, Cloud, Enterprise
📊 **Project Scope:** Features, integrations, complexity
⏰ **Timeline:** Launch date, phases, milestones
💵 **Budget Range:** Investment range you're considering
🎯 **Target Audience:** Users, devices, platforms
🔧 **Technical Requirements:** Existing systems, integrations
📈 **Business Goals:** Success metrics, KPIs

**Our Pricing Approach:**
✅ Value-Based Pricing (ROI focused)
✅ Transparent Costs (No hidden fees)
✅ Flexible Payment Terms (Milestone-based)
✅ Multiple Options (MVP to enterprise)
✅ Maintenance Included (6 months free)
✅ Scalable Solutions (Grow with your business)

**Pricing Models:**
🔹 **Fixed Price:** Best for defined scope projects
🔹 **Time & Material:** Flexible for evolving requirements
🔹 **Dedicated Team:** Long-term development partnerships
🔹 **Hybrid Model:** Combination based on project phases

**Average Project Ranges (Estimates):**
💻 Web Development: $5,000 - $50,000
📱 Mobile Apps: $10,000 - $100,000
🤖 AI Solutions: $15,000 - $150,000
☁️ Cloud Migration: $20,000 - $200,000
🏢 Enterprise Software: $50,000 - $500,000

**What's Included in Every Quote:**
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
  // ... [Continue with other quickOptions with enhanced formatting] ...
];

// Enhanced service-specific responses
export const serviceResponses: { [key: string]: string } = services.reduce((acc, service) => {
  acc[service.title] = `✨ **${service.title} Services** ✨

${service.description}

**Key Features:**
${service.features.map(feature => `• ${feature}`).join('\n')}

${service.icon && service.icon !== '' ? `\n**Icon:** ${service.icon}` : ''}

🎯 **Why Choose Our ${service.title}?**
✅ Expert team with 5+ years experience
✅ Latest tools and technologies
✅ Agile development methodology
✅ Quality assurance at every step
✅ 24/7 support and maintenance
✅ Competitive pricing with transparent costs

**Ready to get started?** Contact us for a free consultation!
`;
  return acc;
}, {} as { [key: string]: string });

// Interface for keyword response
interface KeywordResponse {
  text: string;
  options?: string[];
}

// Significantly enhanced getResponseByKeyword function
export const getResponseByKeyword = (message: string): KeywordResponse | null => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Handle empty or very short messages
  if (!lowerMessage || lowerMessage.length < 2) {
    return {
      text: "I'd be happy to help! Could you please ask a specific question about our services, company, or how we can assist you?",
      options: ["🌟 Our Services", "🏢 About Us", "📞 Contact Us", "💰 Get Quote"]
    };
  }

  // Check for greetings first
  if (isGreeting(lowerMessage)) {
    return getGreetingResponse();
  }

  // Check for founder/owner queries using enhanced matching
  if (containsFounderKeywords(message)) {
    return getFounderResponse();
  }

  // Detect and respond to service-related queries
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

  // Detect question intent and provide appropriate responses
  const questionIntent = detectQuestionIntent(lowerMessage);
  if (questionIntent) {
    const intentOption = quickOptions.find(opt => opt.category === questionIntent);
    if (intentOption) {
      return { text: intentOption.response, options: intentOption.options };
    }
  }

  const generalServiceOptions = serviceCategories.map(cat => cat.name).concat(["💰 Get Quote", "📞 Contact Us", "📊 Case Studies"]);
  const generalContactOptions = ["📅 Schedule Call", "📧 Send Email", "🌟 Our Services", "💰 Get Quote", "🤝 Social Media"];
  const generalCareerOptions = ["📞 Contact Us", "🏢 About Us", "🌟 Our Services"];
  const generalPortfolioOptions = ["💰 Get Quote", "📞 Contact Us", "🌟 Our Services", "🎯 Our Process"];

  // Comprehensive keyword map with enhanced responses
  const keywordMap: { [key: string]: () => KeywordResponse } = {
    // Service-specific features with enhanced responses
    'web development features': () => {
      const webService = services.find(s => s.title === 'Web Development');
      return {
        text: webService ? `**Key features of our Web Development services:**\n${webService.features.map(f => `• ${f}`).join('\n')}\n\n🚀 We build **responsive, scalable, and SEO-optimized** websites that drive business growth!` : "I couldn't find specific features for Web Development. Please ask about our 'Web Development' service for a general overview.",
        options: generalServiceOptions
      };
    },
    'mobile development features': () => {
      const mobileService = services.find(s => s.title === 'App Development');
      return {
        text: mobileService ? `**Key features of our Mobile App Development services:**\n${mobileService.features.map(f => `• ${f}`).join('\n')}\n\n📱 We create **cross-platform apps** that provide seamless user experiences across all devices!` : "I couldn't find specific features for Mobile Development. Please ask about our 'App Development' service for a general overview.",
        options: generalServiceOptions
      };
    },
    'ai features': () => {
      const aiService = services.find(s => s.title === 'AI & Machine Learning');
      return {
        text: aiService ? `**Key features of our AI & Machine Learning services:**\n${aiService.features.map(f => `• ${f}`).join('\n')}\n\n🤖 We leverage **cutting-edge AI** to automate processes and provide intelligent insights!` : "I couldn't find specific features for AI & Machine Learning. Please ask about our 'AI & Machine Learning' service for a general overview.",
        options: generalServiceOptions
      };
    },
    'cloud computing features': () => {
      const cloudService = services.find(s => s.title === 'Cloud Computing');
      return {
        text: cloudService ? `**Key features of our Cloud Computing services:**\n${cloudService.features.map(f => `• ${f}`).join('\n')}\n\n☁️ We provide **scalable, secure, and cost-effective** cloud solutions!` : "I couldn't find specific features for Cloud Computing. Please ask about our 'Cloud Computing' service for a general overview.",
        options: generalServiceOptions
      };
    },

    // Enhanced contact information responses
    'contact phone': () => ({ 
      text: `📞 **Phone:** ${contactInfo.phone}\n\nYou can reach us immediately during business hours for quick consultations and urgent queries. We're always ready to help!`, 
      options: generalContactOptions 
    }),
    'phone number': () => ({ 
      text: `Our phone number is **${contactInfo.phone}**.\n\n🕒 We're available during business hours for immediate assistance, and we also provide 24/7 emergency support for critical issues.`, 
      options: generalContactOptions 
    }),
    'contact email': () => ({ 
      text: `📧 **Email:** ${contactInfo.email}\n\nWe typically respond within **2 hours** during business hours. Email us for detailed project discussions and requirements!`, 
      options: generalContactOptions 
    }),
    'email address': () => ({ 
      text: `Our email address is **${contactInfo.email}**.\n\n✅ Perfect for detailed project inquiries and file sharing. We guarantee a response within 2 hours!`, 
      options: generalContactOptions 
    }),
    'office address': () => ({ 
      text: `🏢 **Office Location:**\n${contactInfo.office.address}\n${contactInfo.office.city}, ${contactInfo.office.state} - ${contactInfo.office.pincode}\n\n📍 Visit us for **in-person consultations** and project discussions!`, 
      options: generalContactOptions 
    }),
    'address': () => ({ 
      text: `**AspenCask Solution LLP** is located at:\n📍 ${contactInfo.office.address}, ${contactInfo.office.city}, ${contactInfo.office.state} - ${contactInfo.office.pincode}\n\nWe welcome office visits by appointment!`, 
      options: generalContactOptions 
    }),
    'location': () => ({ 
      text: `We're located in **Raj Bagh, Ghaziabad**.\n\n🏢 **Full Address:**\n${contactInfo.office.address}\n${contactInfo.office.city}, ${contactInfo.office.state} - ${contactInfo.office.pincode}`, 
      options: generalContactOptions 
    }),
    'business hours': () => ({ 
      text: `🕒 **Business Hours:** ${contactInfo.businessHours}\n\nWe're here to help during these times! For urgent matters outside business hours, we also provide **24/7 emergency support**.`, 
      options: generalContactOptions 
    }),
    'working hours': () => ({ 
      text: `We work **${contactInfo.businessHours}**.\n\n⚡ For urgent matters, we also provide **24/7 emergency support** to ensure your business never stops!`, 
      options: generalContactOptions 
    }),
    'support hours': () => ({ 
      text: `🛠️ **Support Hours:** ${contactInfo.supportHours}\n\nWe also offer **24/7 emergency support** for critical issues. Your success is our priority!`, 
      options: generalContactOptions 
    }),

    // Enhanced social media responses
    'linkedin': () => ({ 
      text: `🔗 **Connect with us on LinkedIn:**\n${socialLinks.find(link => link.name === 'LinkedIn')?.url || 'Not available.'}\n\nStay updated with our latest projects, industry insights, and company news!`, 
      options: generalContactOptions 
    }),
    'twitter': () => ({ 
      text: `🐦 **Follow us on Twitter:**\n${socialLinks.find(link => link.name === 'Twitter')?.url || 'Not available.'}\n\nGet real-time updates, tech tips, and industry trends!`, 
      options: generalContactOptions 
    }),
    'github': () => ({ 
      text: `💻 **Check out our GitHub:**\n${socialLinks.find(link => link.name === 'GitHub')?.url || 'Not available.'}\n\nExplore our open-source contributions and technical expertise!`, 
      options: generalContactOptions 
    }),
    'instagram': () => ({ 
      text: `📸 **Follow us on Instagram:**\n${socialLinks.find(link => link.name === 'Instagram')?.url || 'Not available.'}\n\nSee behind-the-scenes content, team highlights, and company culture!`, 
      options: generalContactOptions 
    }),
    'facebook': () => ({ 
      text: `👥 **Like us on Facebook:**\n${socialLinks.find(link => link.name === 'Facebook')?.url || 'Not available.'}\n\nJoin our community for updates, discussions, and networking!`, 
      options: generalContactOptions 
    }),

    // Enhanced career-related responses
    'current jobs': () => ({
      text: jobPositions.length > 0
        ? `**Current Job Openings at AspenCask:**\n${jobPositions.map(job => `• **${job.title}** (${job.type}, ${job.location}) - Experience: ${job.experience}`).join('\n')}\n\n💼 **Interested?** Send your resume to **careers@aspencask.com**\n\n🚀 Join our team and work on cutting-edge technology projects!`
        : "We currently have no open positions, but **we're always looking for talented individuals!** 🌟\n\nSend your resume to **careers@aspencask.com** and we'll keep you in mind for future opportunities!",
      options: generalCareerOptions
    }),
    'job openings': () => ({
      text: jobPositions.length > 0
        ? `**Job Opportunities at AspenCask:**\n${jobPositions.map(job => `• **${job.title}** (${job.type}, ${job.location})\n  Experience Required: ${job.experience}`).join('\n\n')}\n\n📧 **Apply now:** careers@aspencask.com`
        : "No current openings, but we're **growing fast!** 📈\n\nCheck back soon or send your resume to **careers@aspencask.com** for future opportunities!",
      options: generalCareerOptions
    }),
    'work culture': () => ({ 
      text: `**At AspenCask, our work culture is defined by:**\n${workCulture.map(culture => `• **${culture.title}:** ${culture.description}`).join('\n')}\n\n🌟 **Join our team** and experience a workplace that values innovation, collaboration, and personal growth!`, 
      options: generalCareerOptions 
    }),
    'company culture': () => ({ 
      text: `**Our company culture at AspenCask focuses on:**\n${workCulture.map(culture => `• **${culture.title}:** ${culture.description}`).join('\n')}\n\n💫 We believe in creating an environment where **everyone can thrive** and reach their full potential!`, 
      options: generalCareerOptions 
    }),

    // Enhanced testimonials and portfolio responses
    'latest testimonial': () => ({
      text: testimonials.length > 0
        ? `**Here's our latest client testimonial:**\n\n💬 *"${testimonials[0].content}"*\n\n— **${testimonials[0].name}**, ${testimonials[0].position} at ${testimonials[0].company}\n\n⭐ **Rating:** ${'⭐'.repeat(testimonials[0].rating)}\n\nWe're proud of our **99.9% client satisfaction rate!**`
        : "We don't have testimonials available right now, but we're proud of our **99.9% client satisfaction rate!** 🌟\n\nContact us to see how we can help your business succeed!",
      options: generalPortfolioOptions
    }),
    'client feedback': () => ({
      text: testimonials.length > 0
        ? `**Our clients love working with us!** Here's some recent feedback:\n\n💬 *"${testimonials[0].content}"*\n\n— **${testimonials[0].name}**, ${testimonials[0].position} at ${testimonials[0].company}\n\n🏆 **99.9% client satisfaction rate** speaks for itself!`
        : "We maintain a **99.9% client satisfaction rate!** 🎯\n\nContact us to see how we can help transform your business with technology!",
      options: generalPortfolioOptions
    }),
    'project list': () => ({
      text: projects.length > 0
        ? `**Some of our notable projects include:**\n${projects.map(p => `• **${p.title}** (${p.category})`).join('\n')}\n\n🏆 We've completed **50+ successful projects** across various industries!\n\nWant to see more details? Check out our case studies!`
        : "We have an extensive portfolio of **50+ successful projects!** 🚀\n\nContact us to learn more about our work and how we can help your business!",
      options: generalPortfolioOptions
    }),
    'portfolio': () => ({
      text: projects.length > 0
        ? `**Our project portfolio includes:**\n${projects.map(p => `• **${p.title}** (${p.category})\n  ${p.description}`).join('\n\n')}\n\n📊 **50+ successful projects** with **100% client satisfaction!**`
        : "We have a comprehensive portfolio of **50+ successful projects** across diverse industries! 🌟\n\nGet in touch to see our work and discuss your project!",
      options: generalPortfolioOptions
    }),

    // Enhanced pricing and technology responses
    'pricing': () => ({
      text: `**Our pricing is transparent and competitive:**\n\n💻 **Web Development:** $5,000 - $50,000\n📱 **Mobile Apps:** $10,000 - $100,000\n🤖 **AI Solutions:** $15,000 - $150,000\n☁️ **Cloud Migration:** $20,000 - $200,000\n🏢 **Enterprise Software:** $50,000 - $500,000\n\n✅ **Value-based pricing** with **no hidden costs**\n🎯 Get a **custom quote** for your specific requirements!`,
      options: ["💰 Get Quote", "📞 Contact Us", "🌟 Our Services"]
    }),
    'cost': () => ({
      text: `**Project costs vary based on complexity and requirements.** We offer:\n\n✅ **Value-based pricing** (ROI focused)\n✅ **Transparent costs** (No hidden fees)\n✅ **Flexible payment terms**\n✅ **Multiple pricing models**\n\n💡 **Contact us** for a **free consultation** and custom quote tailored to your needs!`,
      options: ["💰 Get Quote", "📞 Contact Us", "🎯 Our Process"]
    }),
    'technologies used': () => ({
      text: `**We work with cutting-edge technologies:**\n\n🖥️ **Frontend:** React, Vue, Next.js, TypeScript\n⚙️ **Backend:** Node.js, Python, Java, .NET\n📱 **Mobile:** React Native, Flutter, Swift, Kotlin\n☁️ **Cloud:** AWS, Azure, Google Cloud\n🤖 **AI/ML:** TensorFlow, PyTorch, scikit-learn\n\n🚀 **And many more!** Check our full tech stack for comprehensive details.`,
      options: ["💻 Technologies", "🌟 Our Services", "💰 Get Quote"]
    }),
    'tech stack': () => ({
      text: `**Our comprehensive tech stack includes modern technologies across all domains:**\n\n• **Frontend frameworks** and libraries\n• **Backend technologies** and databases\n• **Cloud platforms** and DevOps tools\n• **AI/ML frameworks**\n• **Mobile development** platforms\n\n🛠️ **Explore our complete technology offerings** to see how we can bring your vision to life!`,
      options: ["💻 Technologies", "🌟 Our Services", "📞 Contact Us"]
    }),

    // Additional helpful responses
    'help': () => ({
      text: "**I'm here to help!** 🤝\n\nYou can ask me about:\n• Our services and capabilities\n• Pricing and quotes\n• Contact information\n• Company information\n• Technologies we use\n• Our portfolio and case studies\n• Career opportunities\n\n**What would you like to know?**",
      options: ["🌟 Our Services", "💰 Get Quote", "🏢 About Us", "📞 Contact Us"]
    }),
    'thank you': () => ({
      text: "**You're very welcome!** 😊\n\nWe're always here to help. Is there anything else you'd like to know about AspenCask Solution LLP or how we can assist with your technology needs?",
      options: ["🌟 Our Services", "💰 Get Quote", "📞 Contact Us", "📊 Case Studies"]
    }),
    'thanks': () => ({
      text: "**My pleasure!** ✨\n\nFeel free to ask if you have any other questions. We're excited to potentially work with you on your next project!",
      options: ["💰 Get Quote", "📞 Contact Us", "🌟 Our Services"]
    })
  };

  // Check for specific keyword matches with fuzzy matching
  for (const [keyword, getResponse] of Object.entries(keywordMap)) {
    if (lowerMessage.includes(keyword) || 
        keyword.split(' ').every(word => lowerMessage.includes(word))) {
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

  // Enhanced fallback response for unmatched queries
  return {
    text: "I'd be happy to help! 😊\n\nI didn't quite understand your question, but I can assist you with:\n\n• **Services** we offer\n• **Pricing** and quotes\n• **Contact** information\n• **About** our company\n• **Technologies** we use\n• **Portfolio** and case studies\n\n**What would you like to know more about?**",
    options: ["🌟 Our Services", "💰 Get Quote", "🏢 About Us", "📞 Contact Us", "💻 Technologies", "📊 Case Studies"]
  };
};

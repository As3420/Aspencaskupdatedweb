import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

interface QuickOption {
  text: string;
  response: string;
  options?: string[];
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickOptions: QuickOption[] = [
    {
      text: "Our Services",
      response: "AspenCask Solution LLP offers comprehensive technology solutions:\n\n🌐 Web Development\n• Custom websites & web applications\n• E-commerce platforms\n• Progressive Web Apps (PWAs)\n• API development & integration\n• Responsive design & optimization\n\n🤖 Artificial Intelligence\n• Custom AI model development\n• Machine learning solutions\n• Natural language processing\n• Computer vision systems\n• Chatbot development\n• Predictive analytics\n\n☁️ Cloud Computing\n• AWS/Azure/GCP migration\n• Cloud architecture design\n• DevOps & CI/CD pipelines\n• Serverless computing\n• Cloud security implementation\n• Infrastructure optimization\n\n🏢 Enterprise Software\n• ERP system development\n• CRM solutions\n• Business process automation\n• Data analytics platforms\n• Legacy system modernization\n• System integration\n\nWhich service would you like to explore in detail?",
      options: ["Web Development", "AI Solutions", "Cloud Computing", "Enterprise Software", "Get Quote"]
    },
    {
      text: "About Us",
      response: "About AspenCask Solution LLP 🚀\n\nFounded in 2024, we are a rapidly growing software development company with a mission to transform businesses through innovative digital solutions.\n\nOur Expertise:\n• 50+ successful projects delivered\n• 100% client satisfaction rate\n• Expert team of developers, designers, and consultants\n• Cutting-edge technology stack\n• Agile development methodology\n\nOur Vision:\nTo become the most trusted technology partner for businesses worldwide, known for innovation, reliability, and excellence.\n\nOur Values:\n✅ Innovation-driven solutions\n✅ Client-centric approach\n✅ Quality & reliability\n✅ Transparent communication\n✅ Continuous learning & improvement\n\nWe specialize in helping startups, SMEs, and enterprises leverage technology for competitive advantage.",
      options: ["Our Services", "Our Process", "Technologies", "Contact Us"]
    },
    {
      text: "Contact Information",
      response: "Get in Touch with AspenCask Solution LLP 📞\n\nDirect Contact:\n📞 Phone: +91 9608674820\n📧 Email: support@aspencask.com\n\nBusiness Hours:\n🕒 Monday - Friday: 9:00 AM - 7:00 PM IST\n🕒 Saturday: 10:00 AM - 4:00 PM IST\n\nWhat to Expect:\n✅ Free initial consultation (30 minutes)\n✅ Project assessment & recommendations\n✅ Transparent pricing with no hidden costs\n✅ Detailed project timeline & milestones\n✅ Dedicated project manager assigned\n\nResponse Time:\n• Phone calls: Immediate during business hours\n• Emails: Within 2-4 hours\n• Project quotes: Within 24-48 hours\n\nReady to discuss your project? We're here to help! 🚀",
      options: ["Schedule Call", "Send Email", "Our Services"]
    },
    {
      text: "Get Quote",
      response: "Get Your Project Quote 💰\n\nTo provide you with an accurate quote, we'll need to understand your requirements:\n\nProject Information Needed:\n📋 Type of solution (Web, Mobile, AI, Cloud, Enterprise)\n📋 Project scope & complexity\n📋 Timeline & deadlines\n📋 Budget range\n📋 Specific features & integrations\n📋 Target audience & platforms\n\nOur Pricing Approach:\n✅ Transparent & competitive pricing\n✅ No hidden costs or surprises\n✅ Flexible payment terms\n✅ Value-based pricing model\n✅ Free maintenance period included\n\nQuote Process:\n1️⃣ Initial consultation (FREE)\n2️⃣ Requirement analysis\n3️⃣ Technical proposal & quote\n4️⃣ Project timeline & milestones\n\nReady to get started? Contact us for a detailed discussion!",
      options: ["Contact Information", "Our Process", "Our Services"]
    },
    {
      text: "Our Process",
      response: "AspenCask Development Process 🔄\n\nWe follow a proven 6-step methodology for successful project delivery:\n\n1️⃣ Discovery & Analysis\n• Requirement gathering\n• Stakeholder interviews\n• Market research\n• Technical feasibility study\n\n2️⃣ Planning & Strategy\n• Project roadmap creation\n• Technology stack selection\n• Resource allocation\n• Timeline & milestone planning\n\n3️⃣ Design & Architecture\n• UI/UX design\n• System architecture\n• Database design\n• API specifications\n\n4️⃣ Development & Testing\n• Agile development sprints\n• Code reviews & quality assurance\n• Unit & integration testing\n• Performance optimization\n\n5️⃣ Deployment & Launch\n• Production deployment\n• Performance monitoring\n• Security implementation\n• Go-live support\n\n6️⃣ Support & Maintenance\n• 24/7 monitoring\n• Regular updates\n• Bug fixes & enhancements\n• Ongoing optimization\n\nWhy Our Process Works:\n✅ 100% project success rate\n✅ On-time delivery guarantee\n✅ Regular client communication\n✅ Transparent progress tracking",
      options: ["Our Services", "Technologies", "Get Quote"]
    },
    {
      text: "Technologies",
      response: "Our Technology Stack 💻\n\nWe leverage cutting-edge technologies to build robust, scalable solutions:\n\nFrontend Development:\n⚛️ React.js, Next.js, Vue.js\n📱 React Native, Flutter\n🎨 HTML5, CSS3, TypeScript\n🎯 Tailwind CSS, Material-UI\n\nBackend Development:\n🟢 Node.js, Express.js\n🐍 Python, Django, FastAPI\n☕ Java, Spring Boot\n🔷 .NET Core, C#\n\nDatabases:\n🍃 MongoDB, PostgreSQL\n🔥 Firebase, MySQL\n📊 Redis, Elasticsearch\n\nCloud & DevOps:\n☁️ AWS, Azure, Google Cloud\n🐳 Docker, Kubernetes\n🔄 CI/CD Pipelines\n📊 Monitoring & Analytics\n\nAI & Machine Learning:\n🧠 TensorFlow, PyTorch\n🤖 OpenAI, Hugging Face\n📈 Scikit-learn, Pandas\n🔍 Computer Vision, NLP\n\nMobile Development:\n📱 iOS (Swift), Android (Kotlin)\n⚛️ React Native, Flutter\n🔄 Cross-platform solutions\n\nWhy We Choose These Technologies:\n✅ Industry-leading performance\n✅ Scalability & reliability\n✅ Strong community support\n✅ Future-proof solutions\n✅ Cost-effective development",
      options: ["Our Services", "Our Process", "Get Quote"]
    }
  ];

  const serviceResponses: { [key: string]: string } = {
    "Web Development": "Web Development Excellence 🌐\n\nOur Web Development Services:\n\n🎯 Custom Website Development\n• Responsive & mobile-first design\n• SEO-optimized architecture\n• Fast loading & performance optimized\n• Cross-browser compatibility\n• Accessibility compliance (WCAG)\n\n🛒 E-commerce Solutions\n• Shopify, WooCommerce, Magento\n• Custom e-commerce platforms\n• Payment gateway integration\n• Inventory management systems\n• Multi-vendor marketplaces\n\n📱 Progressive Web Apps (PWAs)\n• App-like experience on web\n• Offline functionality\n• Push notifications\n• Fast loading & caching\n• Cross-platform compatibility\n\n🔗 API Development & Integration\n• RESTful & GraphQL APIs\n• Third-party integrations\n• Microservices architecture\n• Real-time data synchronization\n• Secure authentication systems\n\n💡 Why Choose Our Web Development:\n✅ 99.9% uptime guarantee\n✅ Mobile-first approach\n✅ SEO & performance optimized\n✅ Scalable architecture\n✅ 6 months free maintenance\n\nRecent Projects:\n• E-commerce platform (500K+ users)\n• SaaS application (B2B)\n• Healthcare management system\n• Educational platform\n\nReady to build your digital presence? 🚀",
    "AI Solutions": "Artificial Intelligence & Machine Learning 🤖\n\nOur AI/ML Services:\n\n🧠 Custom AI Model Development\n• Deep learning models\n• Neural network architectures\n• Model training & optimization\n• Performance tuning\n• Deployment & scaling\n\n💬 Natural Language Processing\n• Sentiment analysis\n• Text classification\n• Language translation\n• Content generation\n• Voice recognition systems\n\n👁️ Computer Vision Solutions\n• Image recognition & classification\n• Object detection & tracking\n• Facial recognition systems\n• Medical image analysis\n• Quality control automation\n\n📊 Predictive Analytics\n• Business forecasting\n• Customer behavior analysis\n• Risk assessment models\n• Demand prediction\n• Market trend analysis\n\n🤖 Intelligent Chatbots\n• Conversational AI\n• Multi-language support\n• Integration with existing systems\n• 24/7 customer support automation\n• Advanced NLP capabilities\n\n🔍 AI Consulting & Strategy\n• AI readiness assessment\n• Use case identification\n• ROI analysis\n• Implementation roadmap\n• Team training & support\n\n💡 Industries We Serve:\n• Healthcare & Medical\n• Finance & Banking\n• Retail & E-commerce\n• Manufacturing\n• Education & EdTech\n\nSuccess Metrics:\n✅ 40% average efficiency improvement\n✅ 60% cost reduction in operations\n✅ 95% accuracy in predictions\n✅ 24/7 automated support\n\nReady to harness the power of AI? 🚀",
    "Cloud Computing": "Cloud Computing & Infrastructure ☁️\n\nOur Cloud Services:\n\n🚀 Cloud Migration & Strategy\n• Legacy system modernization\n• Cloud readiness assessment\n• Migration planning & execution\n• Risk mitigation strategies\n• Cost optimization analysis\n\n🏗️ Cloud Architecture Design\n• Scalable infrastructure design\n• Multi-cloud strategies\n• Disaster recovery planning\n• High availability setup\n• Security architecture\n\n⚙️ DevOps & CI/CD Implementation\n• Automated deployment pipelines\n• Infrastructure as Code (IaC)\n• Container orchestration\n• Monitoring & logging\n• Performance optimization\n\n🔒 Cloud Security & Compliance\n• Identity & access management\n• Data encryption & protection\n• Compliance frameworks (SOC2, HIPAA)\n• Security monitoring\n• Vulnerability assessments\n\n📊 Cloud Platforms We Work With:\n\nAmazon Web Services (AWS):\n• EC2, S3, RDS, Lambda\n• EKS, ECS, CloudFormation\n• API Gateway, CloudWatch\n\nMicrosoft Azure:\n• Virtual Machines, Storage\n• Azure Functions, AKS\n• Azure DevOps, Monitor\n\nGoogle Cloud Platform (GCP):\n• Compute Engine, Cloud Storage\n• GKE, Cloud Functions\n• BigQuery, AI/ML services\n\n💡 Cloud Benefits We Deliver:\n✅ 50-70% cost reduction\n✅ 99.99% uptime guarantee\n✅ Auto-scaling capabilities\n✅ Enhanced security\n✅ Global accessibility\n✅ Disaster recovery\n\nRecent Cloud Projects:\n• Enterprise migration (500+ servers)\n• Microservices architecture\n• Data lake implementation\n• Multi-region deployment\n\nReady to transform your infrastructure? ☁️🚀",
    "Enterprise Software": "Enterprise Software Development 🏢\n\nOur Enterprise Solutions:\n\n📊 Enterprise Resource Planning (ERP)\n• Custom ERP development\n• SAP implementation & customization\n• Oracle solutions\n• Inventory management\n• Financial management systems\n• Supply chain optimization\n\n👥 Customer Relationship Management (CRM)\n• Salesforce customization\n• Custom CRM development\n• Lead management systems\n• Customer analytics\n• Sales automation\n• Marketing automation\n\n🔄 Business Process Automation\n• Workflow automation\n• Document management\n• Approval processes\n• Task automation\n• Integration platforms\n• RPA implementation\n\n📈 Data Analytics & Business Intelligence\n• Custom dashboards\n• Real-time reporting\n• Data warehousing\n• ETL processes\n• Predictive analytics\n• KPI monitoring\n\n🔗 System Integration\n• API development & integration\n• Legacy system modernization\n• Third-party integrations\n• Data synchronization\n• Middleware solutions\n• Cloud integration\n\n🏭 Industry-Specific Solutions:\n\nHealthcare:\n• Hospital management systems\n• Electronic health records (EHR)\n• Telemedicine platforms\n• Medical billing systems\n\nFinance & Banking:\n• Core banking systems\n• Payment processing\n• Risk management\n• Compliance reporting\n\nManufacturing:\n• Production planning\n• Quality management\n• Asset management\n• IoT integration\n\nRetail & E-commerce:\n• Inventory management\n• POS systems\n• Customer analytics\n• Omnichannel solutions\n\n💡 Why Choose Our Enterprise Solutions:\n✅ Scalable architecture\n✅ Security & compliance focused\n✅ Integration capabilities\n✅ User-friendly interfaces\n✅ 24/7 support & maintenance\n✅ Training & documentation\n\nSuccess Stories:\n• 40% efficiency improvement\n• 60% reduction in manual tasks\n• 99.9% system uptime\n• ROI within 12 months\n\nReady to streamline your business operations? 🚀"
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hi! Welcome to AspenCask Solution LLP! 👋\n\nI'm your AI assistant, here to help you discover how our innovative technology solutions can transform your business.\n\nWhat we specialize in:\n🌐 Web Development\n🤖 Artificial Intelligence\n☁️ Cloud Computing\n🏢 Enterprise Software\n\nHow can I assist you today?",
        isBot: true,
        timestamp: new Date(),
        options: ["Our Services", "About Us", "Contact Information", "Get Quote"]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const addMessage = (text: string, isBot: boolean, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickOption = (optionText: string) => {
    addMessage(optionText, false);
    
    simulateTyping();
    setTimeout(() => {
      // Check if it's a service-specific query
      if (serviceResponses[optionText]) {
        addMessage(serviceResponses[optionText], true, ["Contact Information", "Get Quote", "Other Services"]);
        return;
      }

      // Handle special actions
      if (optionText === "Schedule Call") {
        window.open(`tel:+919608674820`, '_blank');
        addMessage("📞 Opening phone dialer for +91 9608674820...\n\nOur business hours:\n🕒 Mon-Fri: 9:00 AM - 7:00 PM IST\n🕒 Saturday: 10:00 AM - 4:00 PM IST\n\nFeel free to call us for immediate assistance!", true, ["Our Services", "Send Email", "Get Quote"]);
        return;
      }

      if (optionText === "Send Email") {
        window.open(`mailto:support@aspencask.com?subject=Project Inquiry from Website&body=Hi AspenCask Solution LLP team,%0A%0AI'm interested in learning more about your services and would like to discuss my project requirements.%0A%0AProject Details:%0A- Type of solution needed: %0A- Timeline: %0A- Budget range: %0A- Specific requirements: %0A%0APlease contact me to schedule a consultation.%0A%0AThank you!`, '_blank');
        addMessage("📧 Opening email client for support@aspencask.com...\n\nWe typically respond to emails within 2-4 hours during business hours.\n\nWhat to include in your email:\n• Project type & requirements\n• Timeline & budget\n• Contact preferences\n• Any specific questions\n\nThis helps us provide you with the most relevant information!", true, ["Our Services", "Contact Information", "Schedule Call"]);
        return;
      }

      if (optionText === "Portfolio") {
        addMessage("Our Portfolio & Success Stories 📈\n\nWe've successfully delivered 50+ projects across various industries:\n\nRecent Highlights:\n🏥 Healthcare Management System\n• 10,000+ patients managed\n• 40% efficiency improvement\n• HIPAA compliant\n\n🛒 E-commerce Platform\n• 500K+ active users\n• 99.9% uptime\n• Multi-vendor marketplace\n\n🏦 Fintech Solution\n• Real-time payment processing\n• Advanced security features\n• Regulatory compliance\n\n🎓 EdTech Platform\n• 50K+ students enrolled\n• AI-powered learning\n• Mobile-first design\n\nIndustries We Serve:\n• Healthcare & Medical\n• Finance & Banking\n• E-commerce & Retail\n• Education & Training\n• Manufacturing\n• Real Estate\n• Logistics & Supply Chain\n\nWould you like to discuss a similar project for your business?", true, ["Our Services", "Contact Information", "Get Quote"]);
        return;
      }

      if (optionText === "Other Services") {
        addMessage("Additional Services We Offer 🛠️\n\n📱 Mobile App Development\n• iOS & Android native apps\n• Cross-platform solutions (React Native, Flutter)\n• App Store optimization\n• Mobile app maintenance\n\n🔒 Cybersecurity Solutions\n• Security audits & assessments\n• Penetration testing\n• Compliance implementation\n• Security monitoring\n\n📊 Data Analytics & Visualization\n• Business intelligence dashboards\n• Data warehousing\n• Predictive analytics\n• Real-time reporting\n\n🎨 UI/UX Design Services\n• User experience research\n• Interface design\n• Prototyping & wireframing\n• Usability testing\n\n🛠️ Software Maintenance & Support\n• 24/7 monitoring\n• Regular updates & patches\n• Performance optimization\n• Technical support\n\n🚀 Digital Transformation Consulting\n• Technology strategy\n• Process optimization\n• Change management\n• Training & adoption\n\nWhich service interests you most?", true, ["Contact Information", "Get Quote", "Our Process"]);
        return;
      }

      // Handle predefined quick options
      const option = quickOptions.find(opt => opt.text === optionText);
      if (option) {
        addMessage(option.response, true, option.options);
      }
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, false);
    setInputValue('');

    // Simple keyword matching for responses
    simulateTyping();
    setTimeout(() => {
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offerings')) {
        handleQuickOption("Our Services");
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
        handleQuickOption("Contact Information");
      } else if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('who are you')) {
        handleQuickOption("About Us");
      } else if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        handleQuickOption("Get Quote");
      } else if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('frontend')) {
        handleQuickOption("Web Development");
      } else if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
        handleQuickOption("AI Solutions");
      } else if (lowerMessage.includes('cloud') || lowerMessage.includes('aws') || lowerMessage.includes('azure')) {
        handleQuickOption("Cloud Computing");
      } else if (lowerMessage.includes('enterprise') || lowerMessage.includes('erp') || lowerMessage.includes('crm')) {
        handleQuickOption("Enterprise Software");
      } else if (lowerMessage.includes('process') || lowerMessage.includes('methodology') || lowerMessage.includes('how do you work')) {
        handleQuickOption("Our Process");
      } else if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('tools')) {
        handleQuickOption("Technologies");
      } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('projects') || lowerMessage.includes('work')) {
        handleQuickOption("Portfolio");
      } else if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
        handleQuickOption("Other Services");
      } else {
        addMessage("Thank you for your message! 😊\n\nI'd be happy to help you with information about AspenCask Solution LLP. You can:\n\n• Choose from the quick options below\n• Ask about our services, process, or technologies\n• Request a quote for your project\n• Get our contact information\n\nFor immediate assistance:\n📞 +91 9608674820\n📧 support@aspencask.com\n\nHow can I help you today?", true, ["Our Services", "Contact Information", "Get Quote", "About Us"]);
      }
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 max-h-[32rem] flex flex-col animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-t-2xl text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AspenCask Support</h3>
                  <p className="text-xs text-blue-100">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  message.isBot 
                    ? 'bg-gray-100 text-gray-800 rounded-bl-sm' 
                    : 'bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-br-sm'
                }`}>
                  <div className="whitespace-pre-line">{message.text}</div>
                  
                  {/* Quick Options */}
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickOption(option)}
                          className="block w-full text-left px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-3 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
              </button>
            </div>
            
            {/* Contact Info */}
            <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <a href="tel:+919608674820" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <Phone size={12} />
                <span>+91 9608674820</span>
              </a>
              <a href="mailto:support@aspencask.com" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <Mail size={12} />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? (
          <X size={24} className="transition-transform group-hover:scale-110" />
        ) : (
          <MessageCircle size={24} className="transition-transform group-hover:scale-110" />
        )}
        
        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            💬
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
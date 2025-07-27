import React from 'react';
import { Phone, Mail} from 'lucide-react';

const ChatFooter: React.FC = () => {
  return (
    <div className="px-4 pb-2 bg-gray-50 rounded-b-2xl">
      {/* Contact info */}
      <div className="flex items-center justify-center space-x-4 mb-2 text-xs">
        <a 
          href="tel:+919608674820" 
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Phone size={12} />
          <span>+91 9608674820</span>
        </a>
        <a 
          href="mailto:support@aspencask.com" 
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Mail size={12} />
          <span>Email Us</span>
        </a>
      </div>

      {/* Trust indicators */}
      {/* <div className="flex items-center justify-center space-x-3 text-xs text-gray-500 border-t border-gray-200 pt-2"> */}
        {/* <div className="flex items-center space-x-1">
          <Shield size={10} />
          <span>SOC 2 Certified</span>
        </div> */}
        {/* <div className="flex items-center space-x-1">
          <Award size={10} />
          <span>50+ Projects</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span>99.9% Uptime</span>
        </div>
      </div> */}

      {/* Powered by */}
      {/* <div className="text-center mt-2 text-xs text-gray-400">
        Powered by AspenCask AI • Response time: ~15 sec
      </div> */}
    </div>
  );
};

export default ChatFooter;
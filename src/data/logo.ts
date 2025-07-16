export interface LogoConfig {
  icon: string;
  companyName: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export const logoConfig: LogoConfig = {
  icon: 'Code', // Lucide React icon name
  companyName: 'AspenCask Solution',
  tagline: 'Innovative Digital Solutions',
  colors: {
    primary: 'from-blue-600 to-purple-600',
    secondary: 'from-blue-500 to-purple-500',
    text: 'from-blue-600 to-purple-600'
  }
};

// Alternative logo configurations you can switch to:
export const logoVariants = {
  tech: {
    icon: 'Cpu',
    companyName: 'AspenCask Solution',
    tagline: 'Technology Excellence',
    colors: {
      primary: 'from-blue-600 to-cyan-600',
      secondary: 'from-blue-500 to-cyan-500',
      text: 'from-blue-600 to-cyan-600'
    }
  },
  modern: {
    icon: 'Zap',
    companyName: 'AspenCask Solution',
    tagline: 'Digital Innovation',
    colors: {
      primary: 'from-purple-600 to-pink-600',
      secondary: 'from-purple-500 to-pink-500',
      text: 'from-purple-600 to-pink-600'
    }
  },
  professional: {
    icon: 'Building2',
    companyName: 'AspenCask Solution',
    tagline: 'Enterprise Solutions',
    colors: {
      primary: 'from-slate-700 to-blue-700',
      secondary: 'from-slate-600 to-blue-600',
      text: 'from-slate-700 to-blue-700'
    }
  }
};
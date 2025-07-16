export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/aspencask-solution',
    icon: 'Linkedin',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/aspencask',
    icon: 'Twitter',
    color: 'hover:text-blue-400'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/As3420',
    icon: 'Github',
    color: 'hover:text-gray-900'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/aspencask.solution',
    icon: 'Instagram',
    color: 'hover:text-pink-600'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/aspencask.solution',
    icon: 'Facebook',
    color: 'hover:text-blue-700'
  }
];

// You can easily add more social platforms here:
// {
//   name: 'YouTube',
//   url: 'https://youtube.com/@aspencask',
//   icon: 'Youtube',
//   color: 'hover:text-red-600'
// },
// {
//   name: 'Discord',
//   url: 'https://discord.gg/aspencask',
//   icon: 'MessageCircle',
//   color: 'hover:text-indigo-600'
// }
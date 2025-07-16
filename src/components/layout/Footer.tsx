import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { contactInfo } from "../../data/contact";
import { socialLinks } from "../../data/social";
import { logoConfig } from "../../data/logo";
import * as Icons from "lucide-react";
import { publicImages } from "../../shared/utlis";

export const Footer: React.FC = () => {
  const LogoIcon = Icons[
    logoConfig.icon as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  // Scroll to top handler
  const handleNavClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Link to={"/"} className="flex items-center space-x-2">
                <img
                  src={publicImages.logo}
                  alt="Aspencask Logo"
                  className="w-10 h-10"
                />
                <span
                  className={`text-xl font-bold bg-gradient-to-r ${logoConfig.colors.text} bg-clip-text text-transparent`}
                >
                  {logoConfig.companyName}
                </span>
              </Link>
            </div>
            <p className="text-gray-300 mb-4">
              Leading software development company providing cutting-edge
              digital solutions since 2024.
            </p>
            <div className="flex space-x-4">
              {socialLinks.slice(0, 3).map((social) => {
                const SocialIcon = Icons[
                  social.icon as keyof typeof Icons
                ] as React.ComponentType<{ className?: string }>;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <SocialIcon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Portfolio", "Careers"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${
                        item.toLowerCase() === "home" ? "" : item.toLowerCase()
                      }`}
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={handleNavClick}
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Web Development",
                "AI Solutions",
                "Cloud Computing",
                "Enterprise Software",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={handleNavClick}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  {contactInfo.office.city}, {contactInfo.office.state}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-700 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            © 2024 {logoConfig.companyName} LLP. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

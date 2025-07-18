import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigationItems } from "../../data/navigation";
import { logoConfig } from "../../data/logo";
import * as Icons from "lucide-react";
import { publicImages } from "../../shared/utlis";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      setScrolled(window.scrollY > 50);
    }
  }, []);

  // Resize handler
  const handleResize = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setIsOpen(false);
    }
  }, []);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  // Scroll & resize listeners
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleScroll, handleResize, handleKeyDown]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const LogoIcon = Icons[
    logoConfig.icon as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  // Helper for active link (supports nested routes)
  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300
        bg-white/95 backdrop-blur-md
        ${scrolled ? "shadow-lg" : ""}
      `}
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" tabIndex={0}>
            <img
              src={publicImages.logo}
              alt={`${logoConfig.companyName} Logo`}
              className="w-10 h-10"
              loading="lazy"
            />
            <span
              className={`text-xl md:text-2xl font-serif font-extrabold tracking-wide bg-gradient-to-r ${logoConfig.colors.text} bg-clip-text text-transparent`}
              style={{ fontFamily: "'Playfair Display', 'Inter', serif" }}
            >
              {logoConfig.companyName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Main navigation"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                tabIndex={0}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 relative z-[110]"
            onClick={() => setIsOpen((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden fixed inset-0 top-0 bg-white/95 backdrop-blur-md z-[100]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
            >
              <nav
                className="container mx-auto px-6 py-8"
                aria-label="Mobile navigation"
              >
                <div className="space-y-6">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                          isActive(item.href)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsOpen(false)}
                        tabIndex={0}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

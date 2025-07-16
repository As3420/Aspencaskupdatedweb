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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
+        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" tabIndex={0}>
            <img
              src={publicImages.logo}
              alt={`${logoConfig.companyName} Logo`}
              className="w-12 h-12 rounded-lg shadow-sm border border-gray-200"
              loading="lazy"
            />
            <span
              className={`text-2xl font-extrabold bg-gradient-to-r ${logoConfig.colors.text} bg-clip-text text-transparent tracking-tight`}
            >
              {logoConfig.companyName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-10"
            aria-label="Main navigation"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 font-semibold rounded transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-blue-700 bg-blue-50 shadow"
                    : "text-gray-700 hover:text-blue-700 hover:bg-gray-100"
                }`}
                tabIndex={0}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-2 right-2 h-1 rounded bg-gradient-to-r from-blue-600 to-purple-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 border border-gray-200 shadow-sm relative z-[110]"
            onClick={() => setIsOpen((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden fixed inset-0 top-0 bg-gradient-to-br from-white/95 via-blue-50 to-purple-50 backdrop-blur-lg z-[120] shadow-2xl"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
            >
              <nav
                className="container mx-auto px-6 py-12"
                aria-label="Mobile navigation"
              >
                <div className="space-y-8">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={`block px-6 py-4 text-xl font-semibold rounded-xl transition-all duration-200 ${
                          isActive(item.href)
                            ? "text-blue-700 bg-blue-100 shadow"
                            : "text-gray-700 hover:text-blue-700 hover:bg-gray-100"
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

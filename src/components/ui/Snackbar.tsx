import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface SnackbarProps {
  open: boolean;
  message: string;
  autoHideDuration?: number;
  onClose: () => void;
  type?: "success" | "error" | "warning" | "info";
}

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  autoHideDuration = 6000,
  onClose,
  type = "success",
}) => {
  useEffect(() => {
    if (open && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500",
          border: "border-green-600",
          icon: "text-green-100",
        };
      case "error":
        return {
          bg: "bg-red-500",
          border: "border-red-600",
          icon: "text-red-100",
        };
      case "warning":
        return {
          bg: "bg-yellow-500",
          border: "border-yellow-600",
          icon: "text-yellow-100",
        };
      case "info":
        return {
          bg: "bg-blue-500",
          border: "border-blue-600",
          icon: "text-blue-100",
        };
      default:
        return {
          bg: "bg-green-500",
          border: "border-green-600",
          icon: "text-green-100",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-4 right-4 z-50 max-w-sm"
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div
            className={`${styles.bg} ${styles.border} border rounded-lg shadow-lg p-4 text-white`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-sm font-medium">{message}</p>
              </div>
              <button
                onClick={onClose}
                className={`${styles.icon} hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500 rounded-full p-1`}
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 
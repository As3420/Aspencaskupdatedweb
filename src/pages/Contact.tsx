import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { AnimatedText } from "../components/ui/AnimatedText";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Snackbar } from "../components/ui/Snackbar";
import { ContactForm } from "../types";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { contactInfo } from "../data/contact";
import { socialLinks } from "../data/social";
import * as Icons from "lucide-react";

export const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    try {
      setLoading(true);
      // Use AbortController instead of AbortSignal
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || "",
          message: data.message,
        }),
        signal: controller.signal,
        mode: "cors",
      });
      setLoading(false);

      console.log("Response status:", response.status);
      clearTimeout(timeoutId);

      if (response.ok) {
        await response.json();
        reset();
        setOpen(true);
      } else {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        alert(
          `Something went wrong. Server responded with: ${
            response.status
          } - ${errorText.substring(0, 100)}...`
        );
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      const errorName = error instanceof Error ? error.name : "Unknown";
      const errorStack = error instanceof Error ? error.stack : undefined;

      console.error("Submission error:", {
        message: errorMessage,
        name: errorName,
        stack: errorStack,
        url: "https://script.google.com/macros/s/AKfycbxVYV5Uc4E1BUF3xcUEAr1yumkyLw2UYf8OFe9Eb1aJNhLeuOqZA_fZxj1VwIBidRqf/exec",
      });

      if (errorName === "AbortError") {
        alert("Request timed out. Please try again later.");
      } else if (
        errorMessage.includes("CORS") ||
        errorMessage.includes("cors")
      ) {
        alert(
          "CORS issue detected. The server may not allow cross-origin requests from this origin. Please contact the administrator or try again later."
        );
      } else {
        alert(
          `Network error: ${errorMessage}. Please check the server configuration or try again later.`
        );
      }
    }
  };

  const contactInfoCards = [
    {
      icon: Mail,
      title: "Email Us",
      details: contactInfo.email,
      subtitle: "We reply within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: contactInfo.phone,
      subtitle: contactInfo.businessHours,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: `${contactInfo.office.address}, ${contactInfo.office.city}`,
      subtitle: "Schedule an appointment",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: contactInfo.businessHours,
      subtitle: contactInfo.supportHours,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Thank you! Your message was sent successfully."
        type="success"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedText
              text="Get In Touch"
              className="text-4xl md:text-6xl font-bold mb-6"
            />
            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to transform your business with cutting-edge technology?
              Let's discuss your project and explore how we can help you achieve
              your goals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      {...register("company")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit(onSubmit)}
                    size="lg"
                    icon={Send}
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Get in touch with our team to discuss your project
                  requirements and discover how we can help transform your
                  business.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfoCards.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="p-6 text-center">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <info.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      <p className="text-gray-700 font-medium mb-1">
                        {info.details}
                      </p>
                      <p className="text-sm text-gray-500">{info.subtitle}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const SocialIcon = Icons[
                      social.icon as keyof typeof Icons
                    ] as React.ComponentType<{ className?: string }>;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-400 ${social.color} transition-colors p-2 rounded-lg hover:bg-gray-50`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.name}
                      >
                        <SocialIcon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Work With Us?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Free initial consultation and project assessment",
                    "Transparent pricing with no hidden costs",
                    "Agile development process with regular updates",
                    "Dedicated project manager for your account",
                    "Post-launch support and maintenance included",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 flex-shrink-0"></div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              text="Frequently Asked Questions"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about our services and development process
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is your typical project timeline?",
                answer:
                  "Project timelines vary based on complexity and requirements. Simple websites take 2-4 weeks, while complex enterprise applications can take 3-6 months. We provide detailed timelines during our initial consultation.",
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer:
                  "Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance monitoring, and technical support to ensure your solution continues to perform optimally.",
              },
              {
                question: "What technologies do you specialize in?",
                answer:
                  "We specialize in modern web technologies including React, Node.js, Python, cloud platforms (AWS, Azure), AI/ML frameworks, and enterprise technologies like Java and .NET. We choose the best tech stack for each project.",
              },
              {
                question: "How do you ensure project quality?",
                answer:
                  "We follow rigorous quality assurance processes including code reviews, automated testing, user acceptance testing, and continuous integration. Our agile methodology ensures regular feedback and iterations.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

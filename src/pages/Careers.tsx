import React, { useState, useEffect } from 'react'; // Import useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { AnimatedText } from '../components/ui/AnimatedText';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  Users, 
  Send, 
  ChevronDown, 
  ChevronUp,
  Search,
  Bell,
  Mail,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import * as Icons from 'lucide-react';

// Define the types based on your Google Sheet structure
interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

interface CompanyBenefit {
  icon: string;
  title: string;
  description: string;
}

interface WorkCulture {
  icon: string;
  title: string;
  description: string;
}

interface CareerApplication {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio?: string;
  coverLetter: string;
}

// Dummy data for benefits and culture (you can keep these or fetch from a sheet if preferred)
const companyBenefits: CompanyBenefit[] = [
  { icon: "Heart", title: "Comprehensive Health", description: "Robust health, dental, and vision insurance for you and your family." },
  { icon: "TrendingUp", title: "Career Growth", description: "Opportunities for professional development, workshops, and mentorship." },
  { icon: "Laptop", title: "Flexible Work", description: "Hybrid work models and flexible hours to support work-life balance." },
  { icon: "Award", title: "Recognition Programs", description: "Celebrating achievements and contributions through various recognition initiatives." },
  { icon: "Lightbulb", title: "Innovation Hub", description: "A culture that fosters creativity and encourages new ideas and solutions." },
  { icon: "BookOpen", title: "Continuous Learning", description: "Access to online courses, certifications, and a library of resources." },
];

const workCulture: WorkCulture[] = [
  { icon: "Users", title: "Collaborative Environment", description: "Team-oriented approach where ideas are shared and growth is mutual." },
  { icon: "Star", title: "Impactful Work", description: "Contribute to projects that make a real difference in the tech landscape." },
  { icon: "Zap", title: "Dynamic & Agile", description: "Fast-paced environment with adaptive strategies and quick decision-making." },
  { icon: "Smile", title: "Inclusive Community", description: "A welcoming and diverse workplace where everyone feels valued." },
];


export const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationPosition, setApplicationPosition] = useState('');
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]); // State to store fetched jobs
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobFetchError, setJobFetchError] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CareerApplication>();

  // Fetch job positions on component mount
  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-jobs'); // Your Netlify function endpoint
        const data = await response.json();
        if (response.ok) {
          setJobPositions(data);
        } else {
          setJobFetchError(data.error || 'Failed to fetch job positions');
        }
      } catch (error) {
        console.error('Error fetching job positions:', error);
        setJobFetchError('An error occurred while fetching job positions');
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobPositions();
  }, []); // Empty dependency array means this runs once on mount

  const onSubmit = async (data: CareerApplication) => {
    try {
      const response = await fetch('/.netlify/functions/apply', { // Your Netlify function endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for your application! We\'ll review it and get back to you soon.');
        reset();
        setShowApplication(false);
      } else {
        alert(`Failed to submit application: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert('An error occurred while submitting your application.');
    }
  };

  const handleApply = (jobTitle: string) => {
    setApplicationPosition(jobTitle);
    setShowApplication(true);
  };

  const hasOpenPositions = jobPositions && jobPositions.length > 0;

  return (
    <div>
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
              text="Join Our Team"
              className="text-4xl md:text-6xl font-bold mb-6"
            />
            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Be part of a dynamic team that's shaping the future of technology. We're looking for passionate individuals who want to make a difference.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              text="Why Work With Us?"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer more than just a job - we provide a platform for growth, innovation, and success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyBenefits.map((benefit, index) => {
              const IconComponent = Icons[benefit.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 text-center h-full">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Culture */}
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
              text="Our Work Culture"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a culture that values innovation, collaboration, and continuous growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workCulture.map((culture, index) => {
              const IconComponent = Icons[culture.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center h-full">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{culture.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{culture.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions or Empty State */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              text="Open Positions"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {loadingJobs ? (
                "Loading available positions..."
              ) : jobFetchError ? (
                <span className="text-red-500">{jobFetchError}</span>
              ) : hasOpenPositions ? (
                "Explore exciting opportunities to grow your career with us"
              ) : (
                "We're always growing and looking for amazing talent"
              )}
            </p>
          </motion.div>

          {loadingJobs ? (
            <div className="text-center text-gray-500">
              <p>Loading job positions...</p> {/* You can add a spinner here */}
            </div>
          ) : jobFetchError ? (
            <div className="text-center text-red-600">
              <p>{jobFetchError}</p>
            </div>
          ) : hasOpenPositions ? (
            <div className="space-y-6">
              {jobPositions.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden">
                    <div className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1" />
                              {job.department}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.type}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {job.experience}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4 lg:mt-0">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                            icon={selectedJob === job.id ? ChevronUp : ChevronDown}
                          >
                            Details
                          </Button>
                          <Button
                            onClick={() => handleApply(job.title)}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">{job.description}</p>
                    </div>

                    <AnimatePresence>
                      {selectedJob === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200 bg-gray-50"
                        >
                          <div className="p-8 space-y-6">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h4>
                              <ul className="space-y-2">
                                {job.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Beautiful Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-12 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full"></div>
                  <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-500 rounded-full"></div>
                  <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-indigo-500 rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mb-8"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Search className="w-12 h-12 text-white" />
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    No Open Positions Right Now
                  </motion.h3>

                  <motion.p
                    className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    We're not actively hiring at the moment, but we're always interested in connecting with talented individuals who share our passion for innovation and excellence.
                  </motion.p>

                  {/* Feature Cards */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <motion.div
                        className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Bell className="w-6 h-6 text-white" />
                      </motion.div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h4>
                      <p className="text-sm text-gray-600 text-center">
                        Be the first to know when new opportunities become available
                      </p>
                    </div>

                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <motion.div
                        className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Target className="w-6 h-6 text-white" />
                      </motion.div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Perfect Match</h4>
                      <p className="text-sm text-gray-600 text-center">
                        We'll consider your profile for roles that align with your skills
                      </p>
                    </div>

                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
                      <motion.div
                        className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Zap className="w-6 h-6 text-white" />
                      </motion.div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Fast Response</h4>
                      <p className="text-sm text-gray-600 text-center">
                        Quick turnaround when the right opportunity arises
                      </p>
                    </div>
                  </motion.div>

                  {/* Call to Action */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      onClick={() => {
                        setApplicationPosition('General Application');
                        setShowApplication(true);
                      }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8"
                      icon={Mail}
                    >
                      Send Your Resume
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open('mailto:careers@company.com?subject=Career Interest', '_blank')}
                      icon={Calendar}
                    >
                      Subscribe to Updates
                    </Button>
                  </motion.div>

                  <motion.p
                    className="text-sm text-gray-500 mt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    Follow us on social media for the latest company updates and job postings
                  </motion.p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplication && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowApplication(false)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Apply for Position</h2>
                  <button
                    onClick={() => setShowApplication(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please enter a valid email'
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 9876543210"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                      </label>
                      <input
                        type="text"
                        {...register('position', { required: 'Position is required' })}
                        value={applicationPosition}
                        onChange={(e) => setApplicationPosition(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Position applying for"
                      />
                      {errors.position && (
                        <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience *
                      </label>
                      <select
                        {...register('experience', { required: 'Experience is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-8">5-8 years</option>
                        <option value="8+">8+ years</option>
                      </select>
                      {errors.experience && (
                        <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Portfolio/LinkedIn URL
                      </label>
                      <input
                        type="url"
                        {...register('portfolio')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter *
                    </label>
                    <textarea
                      rows={6}
                      {...register('coverLetter', { required: 'Cover letter is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    />
                    {errors.coverLetter && (
                      <p className="mt-1 text-sm text-red-600">{errors.coverLetter.message}</p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowApplication(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      icon={Send}
                      className="flex-1"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              text="Don't See Your Role?"
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            {/* <Button
              size="lg"
              onClick={() => {
                setApplicationPosition('General Application');
                setShowApplication(true);
              }}
              className="bg-white text-slate-900 hover:bg-gray-100"
            >
              Send General Application
            </Button> */}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
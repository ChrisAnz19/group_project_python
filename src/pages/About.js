import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  Target, 
  TrendingUp, 
  Shield, 
  Zap,
  Users,
  Award
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Our advanced AI technology analyzes your resume using natural language processing to provide intelligent insights and recommendations.'
    },
    {
      icon: Target,
      title: 'Targeted Feedback',
      description: 'Get specific feedback on different sections of your resume including education, experience, and skills to improve your chances.'
    },
    {
      icon: TrendingUp,
      title: 'Optimization Tips',
      description: 'Learn how to optimize your resume for better formatting, clarity, and keyword optimization to pass ATS systems.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is secure and private. We use industry-standard encryption and never store your personal information.'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Get your analysis results in seconds with our optimized processing pipeline and cloud infrastructure.'
    },
    {
      icon: Users,
      title: 'Expert Insights',
      description: 'Our recommendations are based on industry best practices and insights from hiring professionals.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Resumes Analyzed' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '50+', label: 'Industries Covered' },
    { number: '24/7', label: 'Availability' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="gradient-text">Resume Analyzer Pro</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're revolutionizing the way job seekers approach resume optimization with 
          cutting-edge AI technology and industry expertise.
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card mb-16"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            To empower job seekers with intelligent tools and insights that help them 
            create compelling resumes that stand out in today's competitive job market. 
            We believe everyone deserves the opportunity to present their best self to 
            potential employers.
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Resume Analyzer Pro?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="card"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Technology Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="card"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Powered by Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-2">OpenAI GPT-4</h3>
              <p className="text-gray-600 text-sm">
                State-of-the-art language model for intelligent resume analysis and recommendations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">PDF Processing</h3>
              <p className="text-gray-600 text-sm">
                Advanced PDF text extraction using PyMuPDF for accurate content analysis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Modern Web Stack</h3>
              <p className="text-gray-600 text-sm">
                Built with React, Flask, and modern web technologies for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 
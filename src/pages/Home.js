import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload, Edit3, Sparkles, Target, TrendingUp } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import axios from 'axios';

const Home = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('upload');
  // State to manage the resume text input
  const [resumeText, setResumeText] = useState('');
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);
  // Use navigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle file upload
  const handleFileUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    // Send the file to the backend for analysis
    try {
      const response = await axios.post('/analyze_pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Navigate to results page with the response data
      navigate('/results', { 
        state: { 
          analysis: response.data.recommendation,
          uploadMessage: response.data.message 
        } 
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle text submission
  const handleTextSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();
    if (!resumeText.trim()) {
      alert('Please enter your resume text');
      return;
    }
    // Send the resume text to the backend for analysis
    setIsLoading(true);
    try {
      const response = await axios.post('/analyze', {
        resume_text: resumeText
      });
      // Navigate to results page with the response data
      navigate('/results', { 
        state: { 
          analysis: response.data.recommendation 
        } 
      });
    } catch (error) {
      console.error('Error submitting text:', error);
      alert('Error submitting resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Analysis',
      description: 'Get intelligent insights and recommendations powered by advanced AI technology.'
    },
    {
      icon: Target,
      title: 'Targeted Feedback',
      description: 'Receive specific feedback on education, experience, and skills sections.'
    },
    {
      icon: TrendingUp,
      title: 'Optimization Tips',
      description: 'Learn how to improve your resume formatting, clarity, and keyword optimization.'
    }
  ];
  
  // Render the Home page
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">Resume Analyzer Pro</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your resume with AI-powered analysis and get personalized recommendations 
          to help you land your dream job.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Analyze Your Resume</h2>
          <p className="text-gray-600">Choose your preferred method to get started</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
              activeTab === 'text'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Paste Text</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'upload' ? (
          <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
        ) : (
          <form onSubmit={handleTextSubmit} className="space-y-6">
            <div>
              <label htmlFor="resume-text" className="block text-sm font-medium text-gray-700 mb-2">
                Paste your resume text here
              </label>
              <textarea
                id="resume-text"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Copy and paste your resume content here..."
                className="input-field h-64 resize-none"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !resumeText.trim()}
              className="btn-primary w-full disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Resume</span>
                </div>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Home; 
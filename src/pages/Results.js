import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Download, 
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Target
} from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const { analysis, uploadMessage } = location.state || {};

  // If no analysis data, redirect to home
  if (!analysis) {
    return (
      <div className="text-center py-12">
        <div className="card max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Analysis Found</h2>
          <p className="text-gray-600 mb-6">
            Please upload a resume or paste text to get started.
          </p>
          <Link to="/" className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  // Parse the analysis text to extract sections
  const parseAnalysis = (text) => {
    const sections = {
      education: '',
      experience: '',
      skills: '',
      general: ''
    };

    // Simple parsing logic - you can enhance this based on your AI response format
    const lines = text.split('\n');
    let currentSection = 'general';

    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('education')) {
        currentSection = 'education';
      } else if (lowerLine.includes('experience')) {
        currentSection = 'experience';
      } else if (lowerLine.includes('skill')) {
        currentSection = 'skills';
      } else if (line.trim()) {
        sections[currentSection] += line + '\n';
      }
    });

    return sections;
  };

  const sections = parseAnalysis(analysis);

  const sectionIcons = {
    education: <FileText className="w-5 h-5" />,
    experience: <TrendingUp className="w-5 h-5" />,
    skills: <Target className="w-5 h-5" />,
    general: <Sparkles className="w-5 h-5" />
  };

  const sectionColors = {
    education: 'bg-blue-100 text-blue-600',
    experience: 'bg-green-100 text-green-600',
    skills: 'bg-purple-100 text-purple-600',
    general: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
            <p className="text-gray-600">
              Here's your personalized analysis and recommendations
            </p>
          </div>
          <Link to="/" className="inline-flex items-center bg-white hover:bg-gray-50 text-primary-600 font-medium py-2 px-4 rounded-lg border border-primary-200 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Analysis
          </Link>
        </div>

        {uploadMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800">{uploadMessage}</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(sections).map(([key, content], index) => {
          if (!content.trim()) return null;
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-lg mr-3 ${sectionColors[key]}`}>
                  {sectionIcons[key]}
                </div>
                <h3 className="text-lg font-semibold capitalize">
                  {key === 'general' ? 'General Recommendations' : key}
                </h3>
              </div>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {content.trim()}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold mb-2">Download Report</h3>
          <p className="text-gray-600 text-sm mb-4">
            Save your analysis results for future reference
          </p>
          <button className="btn-secondary w-full">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600 text-sm mb-4">
            Monitor your resume improvements over time
          </p>
          <button className="btn-secondary w-full">
            View History
          </button>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Get More Insights</h3>
          <p className="text-gray-600 text-sm mb-4">
            Explore additional optimization tools and tips
          </p>
          <Link to="/about" className="btn-secondary w-full">
            Learn More
          </Link>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card mt-12"
      >
        <h2 className="text-xl font-semibold mb-4">💡 Pro Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Formatting Best Practices</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use consistent font and spacing</li>
              <li>• Keep it to 1-2 pages maximum</li>
              <li>• Use bullet points for readability</li>
              <li>• Include relevant keywords</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">ATS Optimization</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use standard section headings</li>
              <li>• Avoid graphics and tables</li>
              <li>• Include industry-specific keywords</li>
              <li>• Save as PDF format</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Results; 
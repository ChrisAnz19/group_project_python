import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { 
  FileText, 
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
} from 'lucide-react';
import {parseAnalysisIntoSections} from '../components/TextWrangler';

const TrendingJobs = () => {
  // State to manage loading state and trending jobs data
  const [isLoading, setIsLoading] = useState(true);
  // State to store trending jobs data
  const [trendingJobs, setTrendingJobs] = useState(null);
  // Define section patterns and titles
  // These patterns should match the sections in your analysis text
  // Adjust these patterns based on your actual analysis format
  const sectionPatterns = [
    /(?:^|\n)\|\s*\d+\s*\|\s*[^|]+\s*\|\s*\$\d{1,3}(?:,\d{3})*\s*\|\s*[^|]+\|/gmi
  ];
  const title = 'Top Trending Jobs';
  const sectionTitles = [
    'Rank',
    'Job Title',
    'Salary',
    'Description'
  ];
  
  // Fetch trending jobs data from the backend
  useEffect(() => {
    /**
     * Fetch trending jobs data from the backend.
     * This function is called when the component mounts.
     * Returns:
     *     void
     * Throws:
     *     Error: If there is an issue fetching the data.
     */
    const fetchTrendingJobsData = async () => {
      try {
        const response = await axios.get('/trending_jobs');
        setTrendingJobs(response.data.recommendation);
      } catch (error) {
        console.error('Error fetching trending jobs:', error);
        alert('Error fetching trending jobs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingJobsData();
  }, []);
  
  // Parse the trending jobs data into sections
  const sections = parseAnalysisIntoSections(trendingJobs, sectionPatterns, title, sectionTitles);

  const getSectionIcon = (title) => {
    /**
     * Get the appropriate icon for a section based on its title.
     * Args:
     *     title (string): The title of the section.
     * Returns:
     *     JSX Element: The icon component for the section.
     * This function returns different icons based on the section title.
     */
    const lowerTitle = title.toLowerCase();
    // Return specific icons based on section title
    if (lowerTitle.includes('Rank')) return <TrendingUp className="w-5 h-5" />;
    if (lowerTitle.includes('Job Title')) return <Target className="w-5 h-5" />;
    if (lowerTitle.includes('Salary')) return <FileText className="w-5 h-5" />;
    if (lowerTitle.includes('Description')) return <BookOpen className="w-5 h-5" />;
    // Default icon for other sections
    return <Sparkles className="w-5 h-5" />;
  };
  
  const getSectionColor = (title) => {
    /**
     * Get the appropriate color for a section based on its title.
     * Args:
     *     title (string): The title of the section.
     * Returns:
     *     string: The CSS class for the section color.
     * This function returns different colors based on the section title.
     */
    const lowerTitle = title.toLowerCase();
    // Return specific colors based on section title
    if (lowerTitle.includes('Rank')) return 'bg-blue-100 text-blue-600';
    if (lowerTitle.includes('Job Title')) return 'bg-green-100 text-green-600';
    if (lowerTitle.includes('Salary')) return 'bg-purple-100 text-purple-600';
    if (lowerTitle.includes('Description')) return 'bg-gray-100 text-gray-600';
    // Default color for other sections
    return 'bg-orange-100 text-orange-600';
  };
  
  // Render the TrendingJobs component
  return (
    <div className="max-w-6xl mx-auto">
      {/* Analysis Sections */}
      <div className={`grid gap-6 ${sections.length === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-1'}`}>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="card"
          >
            <h2 className="text-3xl font-bold text-center mb-12">10 Jobs that are Currently Trending</h2>
            {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Fetching Latest Information...</span>
            </div>
            ) : (
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Results Fetched!</span>
            </div>
             )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${getSectionColor(section.title)}`}>
                  {getSectionIcon(section.title)}
                </div>
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-3">
                {section.content.split('\n').map((line, pIndex) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  
                  // Skip lines that are just numbers or section markers
                  if (trimmed.match(/^\d+\.?\s*$/) || trimmed.match(/^---+$/)) return null;
                  
                  // Format numbered items (like "1. Something:")
                  if (trimmed.match(/^\d+\.\s*[A-Z][^:]*:?\s*$/)) {
                    return (
                      <h4 key={pIndex} className="font-semibold text-gray-900 mt-4 mb-2">
                        {trimmed}
                      </h4>
                    );
                  }
                  
                  // Format bullet points
                  if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                    return (
                      <div key={pIndex} className="flex items-start ml-2">
                        <span className="text-primary-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <span className="flex-1">{trimmed.substring(2).trim()}</span>
                      </div>
                    );
                  }
                  
                  // Format sub-bullets (indented)
                  if (trimmed.match(/^\s*[-•]\s/)) {
                    return (
                      <div key={pIndex} className="flex items-start ml-6">
                        <span className="text-primary-400 mr-3 mt-1 flex-shrink-0">◦</span>
                        <span className="flex-1">{trimmed.replace(/^\s*[-•]\s*/, '').trim()}</span>
                      </div>
                    );
                  }
                  
                  // Regular paragraphs
                  return (
                    <p key={pIndex} className="mb-2 leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div> 
  );
};

export default TrendingJobs;
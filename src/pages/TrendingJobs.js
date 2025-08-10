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

const TrendingJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trendingJobs, setTrendingJobs] = useState(null);

  // Fetch trending jobs data from the backend
  useEffect(() => {
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

  // Format the analysis text to remove markdown and improve readability
  const formatAnalysis = (text) => {
    if (!text) return '';
    
    return text
      // Remove markdown headers (### ## #)
      .replace(/^#{1,6}\s*/gm, '')
      // Remove markdown bold (**text** or __text__)
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      // Remove markdown italic (*text* or _text_)
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      // Clean up multiple newlines
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Clean up multiple dashes and underscores
      .replace(/[-_]{1,}/g, '')
      // Remove leading/trailing whitespace
      .trim();
  };

  // Parse the analysis text into clean, organized sections
  const parseAnalysisIntoSections = (text) => {
    const formatted = formatAnalysis(text);
    
    // Try to find clear section breaks first
    const sectionPatterns = [
      /(?:^|\n)\|\s*\d+\s*\|\s*[^|]+\s*\|\s*\$\d{1,3}(?:,\d{3})*\s*\|\s*[^|]+\|/gmi
    ];

    // Check if we have clear section indicators
    let hasClearSections = false;
    sectionPatterns.forEach(pattern => {
      if (pattern.test(formatted)) {
        hasClearSections = true;
      }
    });

    // If no clear sections found, return everything as one section
    if (!hasClearSections) {
      return [{
        title: 'Top Trending Jobs',
        content: formatted
      }];
    }
    
    // Try to parse sections
    const sectionTitles = [
      'Rank',
      'Job Title',
      'Salary',
      'Description'
    ];

    let sections = [];
    let workingText = formatted;

    // Split by each pattern
    sectionPatterns.forEach((pattern, index) => {
      const parts = workingText.split(pattern);
      if (parts.length > 1) {
        // Found this section - take everything until the next section or end
        let content = parts[1];
        
        // Remove content that belongs to subsequent sections
        for (let j = index + 1; j < sectionPatterns.length; j++) {
          const nextSectionMatch = content.match(sectionPatterns[j]);
          if (nextSectionMatch) {
            content = content.substring(0, nextSectionMatch.index);
            break;
          }
        }
        
        if (content.trim()) {
          sections.push({
            title: sectionTitles[index],
            content: content.trim()
          });
        }
      }
    });

    // Remove duplicates and empty sections
    const uniqueSections = [];
    const seenTitles = new Set();
    
    sections.forEach(section => {
      if (section.content.trim() && !seenTitles.has(section.title)) {
        seenTitles.add(section.title);
        uniqueSections.push(section);
      }
    });

    // If we still don't have good sections after trying to parse, default to single section
    if (uniqueSections.length === 0 || uniqueSections.some(s => s.content.length < 10)) {
      return [{
        title: 'Top Jobs',
        content: formatted
      }];
    }

    return uniqueSections;
  };

  const sections = parseAnalysisIntoSections(trendingJobs);
  
  const getSectionIcon = (title) => {
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
    const lowerTitle = title.toLowerCase();
    // Return specific colors based on section title
    if (lowerTitle.includes('Rank')) return 'bg-blue-100 text-blue-600';
    if (lowerTitle.includes('Job Title')) return 'bg-green-100 text-green-600';
    if (lowerTitle.includes('Salary')) return 'bg-purple-100 text-purple-600';
    if (lowerTitle.includes('Description')) return 'bg-gray-100 text-gray-600';
    // Default color for other sections
    return 'bg-orange-100 text-orange-600';
  };

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
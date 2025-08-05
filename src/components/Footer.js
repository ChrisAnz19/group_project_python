import React from 'react';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">Resume Analyzer Pro</span>
            </div>
            <p className="text-gray-600 text-sm">
              AI-powered resume analysis and optimization to help you land your dream job.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a href="/" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                Home
              </a>
              <a href="/about" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                About
              </a>
              <a href="/results" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                Results
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="font-semibold text-gray-900">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@resumeanalyzer.com"
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Resume Analyzer Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
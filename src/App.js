import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Results from './pages/Results';
import TrendingJobs from './pages/TrendingJobs';
import Leadership from './pages/Leadership';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              {/* Add more routes as needed */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/results" element={<Results />} />
              <Route path="/trending-jobs" element={<TrendingJobs />} />
              <Route path="/leadership" element={<Leadership />} />
            </Routes>
          </motion.div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 
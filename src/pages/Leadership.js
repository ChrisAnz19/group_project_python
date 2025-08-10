import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const Leadership = () => {
  // This component displays the leadership team with their roles and descriptions.
  const features = [
    {
      icon: Users,
      name: 'Errol Elbasan - Founder',
      description: "Currently pursuing a Master's degree at NYU Tandon with a focus on artificial intelligence. I am passionate about solving technology problems and developing innovative solutions. I am keen to discuss technology trends and participate in AI explorations."
    },
    {
      icon: Users,
      name: 'Chris Anzalone - Founder',
      description: "We're not another tool. We're infrastructure for anyone trying to understand people at scale. Before this, I built, scaled, and exited a top-performing outbound agency that set over 10,000 meetings per year for clients across tech, finance, and healthcare. I've also served as a researcher on an NSF-funded grant studying algorithmic bias and human-AI interaction."
    },
    {
      icon: Users,
      name: 'Anirudh Nagaraj - Founder',
      description: 'Analysed company business models and financial statements to assign credit ratings for privately held and publicly traded companies, while collaborating with “Large and Medium Enterprises.”'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Who is our Leadership?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="card"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Leadership; 
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Scroll, Sword } from 'lucide-react';
import ParticleBackground from '../components/common/ParticleBackground';

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-dark-bg">
      <ParticleBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="pt-12 pb-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-serif text-gold mb-4 tracking-wider"
          >
            TRIPLE TRIAD
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-light-gray text-xl font-serif italic"
          >
            Master the Cards, Claim Your Destiny
          </motion.p>
        </header>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
          {[
            {
              icon: <Sword className="w-8 h-8 text-gold" />,
              title: "Strategic Combat",
              description: "Face opponents in tactical card battles where every move shapes your destiny."
            },
            {
              icon: <Shield className="w-8 h-8 text-gold" />,
              title: "Rise to Glory",
              description: "Climb the ranks, earn precious souls, and become a legendary card master."
            },
            {
              icon: <Scroll className="w-8 h-8 text-gold" />,
              title: "Rare Collection",
              description: "Discover and collect powerful cards with unique abilities and histories."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-dark-gray/50 border border-medium-gray/30 rounded-xl p-6
                         backdrop-blur-sm shadow-inner-dark group"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-gold font-serif text-xl">{feature.title}</h3>
                <p className="text-light-gray/80">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6 mt-12">
          <Link
            to="/auth"
            className="px-8 py-4 bg-ember hover:bg-gold text-dark-bg font-serif text-lg
                     rounded-full transform hover:scale-105 transition-all duration-300
                     shadow-glow-gold hover:shadow-lg"
          >
            Begin Your Journey
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 border-2 border-medium-gray hover:border-gold
                     text-off-white font-serif text-lg rounded-full
                     transform hover:scale-105 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
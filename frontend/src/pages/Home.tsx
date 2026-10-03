import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Video, ShieldCheck, Zap } from 'lucide-react';
import ServicesSection from '../components/Home/ServicesSection';
import CoursesSection from '../components/Home/CoursesSection';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
            >
              Elevate Your Vision with <span className="text-blue-600">DroneTV</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto mb-10"
            >
              Professional drone services, commercial certifications, and industry-leading training. Powered by AI support to get you flying faster.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <a href="#services" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Explore Services
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </a>
              <a href="#courses" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md">
                View Courses
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 -translate-y-12 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cinematic Aerials</h3>
              <p className="text-gray-500 text-sm">Stunning 4K resolution drone videography for commercial and creative projects.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified Training</h3>
              <p className="text-gray-500 text-sm">Industry-recognized certification programs led by veteran drone pilots.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Support</h3>
              <p className="text-gray-500 text-sm">Get immediate answers and submit service enquiries through our smart assistant.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Courses Section */}
      <CoursesSection />
    </div>
  );
};

export default Home;

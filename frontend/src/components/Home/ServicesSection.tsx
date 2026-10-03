import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Building2, Map, Shield } from 'lucide-react';

const services = [
  {
    title: 'Aerial Photography',
    description: 'High-resolution cinematic shots for real estate, events, and marketing campaigns.',
    icon: <Camera className="w-6 h-6 text-blue-600" />
  },
  {
    title: 'Industrial Inspections',
    description: 'Safe and precise aerial inspections for cell towers, bridges, and solar farms.',
    icon: <Building2 className="w-6 h-6 text-blue-600" />
  },
  {
    title: 'Topographic Mapping',
    description: 'Accurate 3D modeling and surveying for construction and agriculture.',
    icon: <Map className="w-6 h-6 text-blue-600" />
  },
  {
    title: 'Security & Surveillance',
    description: 'Rapid response aerial monitoring for large events and private properties.',
    icon: <Shield className="w-6 h-6 text-blue-600" />
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Professional Services</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            State-of-the-art drone solutions designed to save you time, reduce risk, and deliver stunning results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm border border-gray-100 mr-4">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

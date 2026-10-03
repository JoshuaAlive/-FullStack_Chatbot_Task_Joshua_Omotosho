import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock } from 'lucide-react';

const courses = [
  {
    title: 'Beginner Pilot Masterclass',
    level: 'Beginner',
    duration: '2 Weeks',
    description: 'Learn the fundamentals of flight mechanics, basic maneuvers, and safety regulations.',
    price: '$299'
  },
  {
    title: 'Commercial Part 107 License Prep',
    level: 'Intermediate',
    duration: '4 Weeks',
    description: 'Comprehensive study guide and practice exams to guarantee you pass your commercial license test.',
    price: '$499'
  },
  {
    title: 'Advanced Cinematic Videography',
    level: 'Advanced',
    duration: '3 Weeks',
    description: 'Master complex camera movements, color grading, and professional video editing workflows.',
    price: '$699'
  }
];

const CoursesSection = () => {
  return (
    <section id="courses" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Training & Certification Courses</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Turn your passion into a profession with our industry-leading drone pilot academies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 flex flex-col h-full hover:border-blue-500 transition-colors"
            >
              <div className="mb-4 flex justify-between items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                  {course.level}
                </span>
                <span className="text-2xl font-bold text-white">{course.price}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
              <p className="text-gray-400 mb-6 flex-grow">{course.description}</p>
              
              <div className="flex items-center text-sm text-gray-300 pt-6 border-t border-gray-700 mt-auto">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                <span>{course.duration}</span>
                <BookOpen className="w-4 h-4 ml-6 mr-2 text-blue-400" />
                <span>Online & Field</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;

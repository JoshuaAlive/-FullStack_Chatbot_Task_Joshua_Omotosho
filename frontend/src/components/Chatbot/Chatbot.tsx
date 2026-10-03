import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, RefreshCw, Loader2 } from 'lucide-react';
import { getBotResponse } from '../../utils/chatbotRules';
import axios from 'axios';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  isForm?: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: 'init-1',
  sender: 'bot',
  text: 'Hello! I am the DroneTV Assistant. You can ask me about our services, courses, or request to speak with someone!'
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'Customer',
    serviceOfInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 150);
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      const match = getBotResponse(userText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: match.response,
        isForm: match.triggerForm
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Send data to our local backend REST API
      await axios.post('http://localhost:5000/api/enquiries', formData);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: '✅ Thank you! Your enquiry has been successfully submitted. Our team will contact you shortly.'
      }]);
      // Reset form
      setFormData({ name: '', email: '', phone: '', userType: 'Customer', serviceOfInterest: '', message: '' });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Failed to submit enquiry. Please try again.';
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: `❌ Error: ${errorMsg}`
      }]);
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-50 flex items-center justify-center"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200"
          >
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md z-10 shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <h3 className="font-semibold">DroneTV Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleReset} title="Reset Conversation" className="p-1.5 hover:bg-blue-700 rounded transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-blue-700 rounded transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                  
                  {/* Embedded Lead/Enquiry Form */}
                  {msg.isForm && (
                    <div className="mt-2 w-full max-w-[95%] bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 text-sm">
                        <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-2 rounded focus:border-blue-500 outline-none" />
                        <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="border p-2 rounded focus:border-blue-500 outline-none" />
                        <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="border p-2 rounded focus:border-blue-500 outline-none" />
                        <select required value={formData.userType} onChange={e => setFormData({...formData, userType: e.target.value})} className="border p-2 rounded focus:border-blue-500 outline-none bg-white">
                          <option value="Customer">Customer</option>
                          <option value="Student">Student</option>
                          <option value="Other">Other</option>
                        </select>
                        <input required type="text" placeholder="Service/Course of Interest" value={formData.serviceOfInterest} onChange={e => setFormData({...formData, serviceOfInterest: e.target.value})} className="border p-2 rounded focus:border-blue-500 outline-none" />
                        <textarea required placeholder="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="border p-2 rounded focus:border-blue-500 outline-none resize-none h-20" />
                        <button type="submit" disabled={isSubmitting} className="mt-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center font-medium">
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Enquiry'}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-500 border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a question..."
                  className="flex-1 bg-gray-100 text-sm border-transparent focus:bg-white focus:border-blue-500 focus:ring-0 rounded-full px-4 py-2 transition-all outline-none border"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

export const CHATBOT_RULES = [
  {
    keywords: ['services', 'provide', 'do you do', 'offer'],
    response: "DroneTV offers a wide range of services including aerial photography, videography, industrial inspections, and custom drone solutions tailored to your business needs. Would you like to submit an enquiry?"
  },
  {
    keywords: ['courses', 'training', 'learn', 'teach', 'academy'],
    response: "We offer comprehensive training programmes ranging from beginner drone piloting to advanced commercial certification. You can view our full list in the Courses section. Are you interested in enrolling?"
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'support'],
    response: "You can contact us via the enquiry form right here in the chat, or reach out to us at support@dronetv.in."
  },
  {
    keywords: ['register', 'enroll', 'sign up'],
    response: "To register for a course or request a service, please fill out our quick enquiry form, and our team will get back to you shortly.",
    triggerForm: true
  },
  {
    keywords: ['interested in a service', 'want a service', 'hire'],
    response: "Great! We'd love to help. Please provide your details so we can discuss the perfect drone solution for you.",
    triggerForm: true
  },
  {
    keywords: ['student', 'university', 'college'],
    response: "Welcome! We offer specialized courses perfect for students looking to start a career in drone technology. Please provide your details so we can guide you.",
    triggerForm: true
  },
  {
    keywords: ['speak with someone', 'human', 'representative', 'talk to someone'],
    response: "I can connect you with our support team. Please fill out your contact details below, and a representative will call you back.",
    triggerForm: true
  },
  {
    keywords: ['form', 'enquiry', 'lead', 'submit'],
    response: "Please fill out the form below:",
    triggerForm: true
  }
];

export const getBotResponse = (input: string) => {
  const lowerInput = input.toLowerCase();
  
  // Exact match from PDF requirements for strict compliance
  if (lowerInput === 'what services does dronetv provide?') return CHATBOT_RULES[0];
  if (lowerInput === 'what courses / training are available?') return CHATBOT_RULES[1];
  if (lowerInput === 'how can i contact dronetv?') return CHATBOT_RULES[2];
  if (lowerInput === 'how can i register?') return CHATBOT_RULES[3];
  if (lowerInput === 'i am interested in a service.') return CHATBOT_RULES[4];
  if (lowerInput === 'i am a student.') return CHATBOT_RULES[5];
  if (lowerInput === 'i want to speak with someone.') return CHATBOT_RULES[6];

  // Fuzzy match based on keywords
  for (const rule of CHATBOT_RULES) {
    if (rule.keywords.some(kw => lowerInput.includes(kw))) {
      return rule;
    }
  }
  
  // PDF Requirement: Handle unknown / unmatched questions with a graceful fallback response
  return {
    response: "I'm not quite sure how to answer that. You can ask me about our services, training courses, or request to speak with someone!",
    triggerForm: false
  };
};

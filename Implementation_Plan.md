# Project Implementation Plan: DroneTV AI Support & Lead Assistant

## 1. Project Overview
A responsive full-stack web application for DroneTV, featuring a landing page, a rule-based chatbot for customer support, and an admin dashboard for lead management.

## 2. Architecture & Tech Stack
*   **Frontend**: React.js, TypeScript, Vite
*   **Styling & UI**: Tailwind CSS (for strict responsiveness), Framer Motion (for smooth animations, page transitions, and interactive elements)
*   **Backend**: Node.js, Express.js, TypeScript
*   **Database**: MongoDB (with Mongoose)
*   **Architecture Pattern**: Client-Server RESTful architecture.

## 3. UI/UX Guidelines
*   **Responsiveness**: Mobile-first approach ensuring perfect rendering on desktop, tablet, and mobile via Tailwind breakpoints.
*   **Animations**: 
    *   Smooth fade-ins and slide-ups for landing page sections on scroll.
    *   Typing indicators and smooth message pop-ins for the chatbot.
    *   Hover effects on interactive elements.
*   **Interactions**: Automatic scrolling to the newest message in the chatbot, sticky navigation for easy access.

## 4. Database Schema (MongoDB)
**Collection: `Enquiries`**
*   `name`: String (Required)
*   `email`: String (Required, Validated)
*   `phone`: String (Required)
*   `userType`: Enum ['Student', 'Customer', 'Other'] (Required)
*   `serviceOfInterest`: String (Required)
*   `message`: String (Required)
*   `status`: Enum ['New', 'Contacted', 'In Progress', 'Closed'] (Default: 'New')
*   *Timestamps (createdAt, updatedAt)* automatically managed by Mongoose.

## 5. Folder Structures
### Frontend (`/frontend`)
```
src/
├── assets/             # Images, global CSS
├── components/         # Reusable UI (Chatbot, Dashboard, Layout, Animations)
├── pages/              # Home.tsx, Admin.tsx
├── services/           # API handlers (Axios/Fetch)
├── types/              # TS Interfaces
├── utils/              # Helper logic (Chatbot rules)
└── App.tsx & main.tsx
```

### Backend (`/backend`)
```
src/
├── config/             # DB & Env setup
├── controllers/        # Request handlers (enquiryController.ts)
├── middleware/         # Error & Validation handling
├── models/             # Mongoose schemas (Enquiry.ts)
├── routes/             # API routes (enquiryRoutes.ts)
├── types/              # TS Types
└── index.ts            # Server entry point
```

## 6. Implementation Phases

**Phase 1: Project Initialization**
*   [ ] Initialize `/frontend` with React, Vite, TS, Tailwind, and Framer Motion.
*   [ ] Initialize `/backend` with Node, Express, TS, Mongoose, and dotenv.

**Phase 2: Backend Development**
*   [ ] Setup MongoDB connection.
*   [ ] Create the `Enquiry` model.
*   [ ] Build REST endpoints (GET, POST, PATCH, DELETE).
*   [ ] Implement backend validation and error handling.

**Phase 3: Frontend - Main UI & Landing Page**
*   [ ] Build responsive Navbar and Footer.
*   [ ] Build Home, Services, and Courses sections.
*   [ ] Add scroll animations and hover effects using Framer Motion.

**Phase 4: Frontend - Chatbot**
*   [ ] Build the Chatbot UI (toggleable window).
*   [ ] Implement rule-based Q&A logic and automatic scrolling.
*   [ ] Integrate the Lead/Enquiry collection form into the chat flow.
*   [ ] Connect chatbot form submission to the Backend API.

**Phase 5: Frontend - Admin Dashboard**
*   [ ] Build the dashboard UI (table view).
*   [ ] Implement data fetching, filtering, and search functionality.
*   [ ] Add controls to update enquiry status and delete records.

**Phase 6: Final Review & Submission Prep**
*   [ ] Security audit (input sanitization, hidden errors).
*   [ ] Prepare the GitHub repository and README.
*   [ ] Organize the required Google Drive folder structure (Code, Screenshots, API Docs, DB).

## 7. Chatbot Predefined Q&A
**1. What services does DroneTV provide?**
*Response:* DroneTV offers a wide range of services including aerial photography, videography, industrial inspections, and custom drone solutions tailored to your business needs. Would you like to submit an enquiry?

**2. What courses / training are available?**
*Response:* We offer comprehensive training programmes ranging from beginner drone piloting to advanced commercial certification. You can view our full list in the Courses section. Are you interested in enrolling?

**3. How can I contact DroneTV?**
*Response:* You can contact us via the enquiry form right here in the chat, or reach out to us at support@dronetv.in.

**4. How can I register?**
*Response:* To register for a course or request a service, please fill out our quick enquiry form and our team will get back to you shortly.

**5. I am interested in a service.**
*Response:* Great! We'd love to help. Please provide your details so we can discuss the perfect drone solution for you. *(Triggers Lead Form)*

**6. I am a student.**
*Response:* Welcome! We offer specialized courses perfect for students looking to start a career in drone technology. Please provide your details so we can guide you. *(Triggers Lead Form)*

**7. I want to speak with someone.**
*Response:* I can connect you with our support team. Please fill out your contact details below, and a representative will call you back. *(Triggers Lead Form)*

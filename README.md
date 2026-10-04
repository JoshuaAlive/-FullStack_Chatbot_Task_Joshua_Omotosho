# DroneTV AI Support & Lead Assistant

## 📖 Project Description
DroneTV AI Support & Lead Assistant is a responsive, full-stack web application designed for a professional drone services and training company. It features a modern landing page, a rule-based intelligent chatbot for customer support, and a secure admin dashboard for managing student and customer enquiries. 

This project was built as a practical technical assignment for the Full Stack Developer Internship at IPAGE Group.

## ✨ Features
*   **Modern Landing Page**: Fully responsive design with Framer Motion scroll animations.
*   **Intelligent Chatbot**: Rule-based matching engine that answers predefined questions and gracefully handles unknown inputs.
*   **Lead Generation**: In-chat form collection that seamlessly posts data to the backend.
*   **Admin Dashboard**: Secure panel to view, search, filter, update statuses, and delete enquiries.
*   **Security Built-in**: Robust backend validation, environment variable secrets, and sanitized error handling preventing stack-trace leaks.

## 🛠️ Technologies Used
**Frontend:**
*   React.js & TypeScript (via Vite)
*   Tailwind CSS v4
*   Framer Motion (Animations)
*   React Router DOM (Routing)
*   Lucide React (Icons)
*   Axios (HTTP Client)

**Backend:**
*   Node.js & Express.js
*   TypeScript (via `tsx`)
*   MongoDB & Mongoose (Database & ODM)
*   CORS & dotenv

## 📁 Project Structure
```text
📦 FullStack_Chatbot_Task
 ┣ 📂 frontend/               # React Vite Application
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 components/         # Layout, Chatbot, and Home UI components
 ┃ ┃ ┣ 📂 pages/              # Home and Admin Dashboard pages
 ┃ ┃ ┗ 📂 utils/              # Chatbot rule engine logic
 ┣ 📂 backend/                # Node.js Express API
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 config/             # MongoDB connection setup
 ┃ ┃ ┣ 📂 controllers/        # API business logic
 ┃ ┃ ┣ 📂 middleware/         # Global error handling
 ┃ ┃ ┣ 📂 models/             # Mongoose schemas
 ┃ ┃ ┗ 📂 routes/             # REST API endpoints
 ┗ 📜 README.md
```

## ⚙️ Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file inside the `backend` folder:

`backend/.env`
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/dronetv  # Or your MongoDB Atlas URI
```

## 🗄️ Database Setup
This project uses **MongoDB**. 
1. Ensure you have MongoDB Community Server running locally, or create a free cluster on MongoDB Atlas.
2. If using Atlas, ensure your current IP Address is whitelisted in the Network Access tab.
3. Replace the `MONGO_URI` in your `.env` file with your connection string. The application will automatically create the `dronetv` database and the `enquiries` collection upon the first insertion.

## 🚀 Setup & Run Instructions

### 1. Backend API (Node.js)
Open a terminal and run the following commands:
```bash
cd backend
npm install
npm run dev
```
*The backend will run on `http://localhost:5000`.*

### 2. Frontend Client (React)
Open a **second** terminal and run the following commands:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`.*

## 📡 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/enquiries` | Fetch all enquiries |
| `GET` | `/api/enquiries/:id` | Fetch a single enquiry by ID |
| `POST` | `/api/enquiries` | Create a new lead/enquiry |
| `PATCH`| `/api/enquiries/:id` | Update an enquiry's status |
| `DELETE`| `/api/enquiries/:id` | Delete an enquiry |



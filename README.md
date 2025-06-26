# AI-Powered Feedback App

A full-stack web application that analyzes user text responses using AI and provides feedback. Built with React frontend and Node.js/Express backend, with optional MongoDB integration for storing feedback history.

---

🚀 **Live Demo:**  
[[Insert Your Live Demo Link Here](https://feedback-system-1-hquk.onrender.com/)]

---

## 📋 Table of Contents

- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Project Structure](#-project-structure)  
- [Prerequisites](#-prerequisites)  
- [Installation & Setup](#-installation--setup)  
- [Environment Variables](#-environment-variables)  
- [Usage](#-usage)  
- [API Documentation](#-api-documentation)  
- [Deployment](#-deployment)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Acknowledgments](#-acknowledgments)  

---

## ✨ Features

- AI-Powered Analysis: Get feedback on your text responses using AI  
- Response History: Optional MongoDB integration to store past submissions  
- Clean Interface: Simple, user-friendly form with feedback display  
- RESTful API: Backend endpoint for processing feedback requests  
- Real-time Processing: Immediate AI feedback generation  
- Responsive Design: Works across desktop and mobile devices  

---

## 🛠 Tech Stack

### Frontend

- React - User interface library  
- Tailwind CSS - Styling framework (or your chosen CSS framework)  
- Axios - HTTP client for API requests  

### Backend

- Node.js - JavaScript runtime environment  
- Express.js - Web application framework  
- MongoDB (Optional) - Database for storing feedback history  
- OpenAI API/Mock API - For generating AI feedback  

---

## 📁 Project Structure
ai-feedback-app/
├── client/ # React frontend application
│ ├── public/ # Static files
│ ├── src/ # React components
│ │ ├── components/ # Reusable components
│ │ ├── App.js # Main application component
│ │ └── ... # Other source files
│ ├── package.json # Frontend dependencies
│ └── .env # Frontend environment variables
├── server/ # Node.js backend server
│ ├── models/ # MongoDB models (optional)
│ ├── routes/ # API routes
│ ├── server.js # Main server file
│ ├── package.json # Backend dependencies
│ └── .env # Backend environment variables
├── .gitignore # Git ignore file
└── README.md # Project documentation

---

## 📋 Prerequisites

Before running the application, ensure you have installed:

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)  
- [npm](https://www.npmjs.com/) (v7.0.0 or higher)  
- [MongoDB](https://www.mongodb.com/) (Optional, if using database)  
- [Git](https://git-scm.com/) (for cloning the repository)  

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone [git@github.com:rohitkumar4826/feedback_system.git]
cd ai_feedback
```
```bash
cd server
npm install
```
```bash
cd ../client
npm install
```

## Environment Variables

### Server(.env)

```bash
PORT=4000
MONGODB_URI=mongodb://localhost:27017/feedback-app (optional)
OPENAI_API_KEY=your_openai_key (or MOCK_API=true)
```

### Client(.env)

```bash
REACT_APP_API_URL=http://localhost:4000
```

## Usage

### Start the backend server:

```bash
cd server
node server.js
```

### Start the frontend server:

```bash
cd client
npm start
```

## Images

![im1](https://github.com/user-attachments/assets/f0105f9e-b5b5-4451-bc26-4f96f35917b2)

![im2](https://github.com/user-attachments/assets/3bbf8111-10e3-4f8b-9282-f1447c6a1301)

![im3](https://github.com/user-attachments/assets/5ccc8bf7-0367-4cf3-b31e-e7f2b12d05fd)

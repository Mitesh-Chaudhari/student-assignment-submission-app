### Student Assignment Submission System

A React-based web application that simulates a student assignment submission system. The application allows students to view a list of assignments, submit their work, and view submission details. This system provides a user-friendly interface for managing assignment workflows in an educational setting.

## Features

- **Assignment Listing**: View all assignments in a responsive grid layout with basic details
- **Search & Filter**: Search assignments by title/description and filter by course
- **Assignment Details**: View comprehensive information about each assignment
- **Submission Form**: Submit assignments with student information, file upload, and comments
- **Status Tracking**: Track submission status (pending/submitted) for each assignment
- **Responsive Design**: Fully responsive interface that works on mobile, tablet, and desktop
- **Error Handling**: User-friendly error messages and loading states


## Technologies Used

- **React**: Frontend library for building the user interface
- **React Router**: For navigation between views
- **CSS Modules**: For component-scoped styling
- **Context API**: For state management across components

## Installation and Setup

1. **Clone the repository**
git clone https://github.com/yourusername/student-assignment-system.git
cd student-assignment-system

2. **Install dependencies**
   npm install

3. **Start the development server**
   npm start

4. **Build for productio**
   npm run build

## Project Structure

src/
├── components/           # Reusable UI components
│   ├── AssignmentCard.jsx
│   ├── AssignmentCard.module.css
│   ├── ErrorMessage.jsx
│   ├── Header.jsx
│   ├── Header.module.css
│   ├── LoadingSpinner.jsx
│   ├── SubmissionForm.jsx
│   ├── SubmissionForm.module.css
│   └── SuccessMessage.jsx
├── context/              # Context for state management
│   └── AssignmentContext.jsx
├── data/                 # Mock data
│   └── assignments.json
├── pages/                # Main page components
│   ├── AssignmentDetail.jsx
│   ├── AssignmentDetail.module.css
│   ├── AssignmentList.jsx
│   └── AssignmentList.module.css
├── services/             # API services
│   └── api.js
├── styles/               # Global styles
│   ├── App.css
│   └── index.css
├── App.jsx               # Main App component
└── index.jsx             # Entry point

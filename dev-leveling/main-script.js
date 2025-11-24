// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-content')) {
        navLinks.classList.remove('active');
    }
});

// Your provided JavaScript code goes here
// Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyA94TXINfS7X96N_28qOv6z2osIbd9Fzz4",
authDomain: "solo-leveling-88381.firebaseapp.com",
projectId: "solo-leveling-88381",
storageBucket: "solo-leveling-88381.appspot.com",
messagingSenderId: "242279025138",
appId: "1:242279025138:web:a09b16db869a067ce2c36b",
measurementId: "G-02RESFZT2B"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Global user data
let currentUser = null;
let userData = {
level: 1,
createdAt: new Date(),  // Should be set once during sign-up
tasksCompleted: 0,
totalTasks: 0,
username: "",
type: ""
};


// For evidence submission
let currentTaskIdForVerification = null;
let currentTaskDataForVerification = null;

// Helper functions for date comparisons
function isSameDay(date1, date2) {
return date1.toDateString() === date2.toDateString();
}
function getWeekNumber(d) {
let date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
let dayNum = date.getUTCDay() || 7;
date.setUTCDate(date.getUTCDate() + 4 - dayNum);
let yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}
function isSameWeek(date1, date2) {
return date1.getFullYear() === date2.getFullYear() && getWeekNumber(date1) === getWeekNumber(date2);
}

// Timer functions
function getTimeUntilMidnight() {
const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);
return tomorrow - now;
}
function getTimeUntilSunday() {
const now = new Date();
let day = now.getDay(); // Sunday = 0
let daysUntilSunday = day === 0 ? 7 : 7 - day;
const nextSunday = new Date(now);
nextSunday.setDate(now.getDate() + daysUntilSunday);
nextSunday.setHours(0, 0, 0, 0);
return nextSunday - now;
}
function formatTime(ms) {
let totalSeconds = Math.floor(ms / 1000);
let hours = Math.floor(totalSeconds / 3600);
let minutes = Math.floor((totalSeconds % 3600) / 60);
let seconds = totalSeconds % 60;
return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}
function updateTimers() {
document.getElementById("tasks-timer").textContent = "Resets in: " + formatTime(getTimeUntilMidnight());
document.getElementById("quests-timer").textContent = "Resets in: " + formatTime(getTimeUntilSunday());
}
setInterval(updateTimers, 1000);

const tasksByDifficulty = {
"Frontend": {
"easy": [
{ title: "Build a React Component", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Fix CSS Bugs", goal: 3, category: "Bug Fixes", evidenceType: "screenshot" },
{ title: "Learn Tailwind CSS", goal: 1, category: "Learning", evidenceType: "none" },
{ title: "Implement Dark Mode Toggle", goal: 1, category: "Enhancement", evidenceType: "screenshot" },
{ title: "Refactor CSS to Sass", goal: 2, category: "Refactoring", evidenceType: "screenshot" },
{ title: "Optimize Browser Rendering", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement a Simple Animation", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Responsive Footer", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build a Static Landing Page", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Debug JavaScript Errors", goal: 2, category: "Bug Fixes", evidenceType: "code" },
{ title: "Create a CSS Grid Layout", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Basic Form Validation", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Learn Flexbox Basics", goal: 1, category: "Learning", evidenceType: "none" },
{ title: "Build a Simple To-Do App", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Basic Carousel", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Modal Dialog", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Learn Basic JavaScript ES6 Features", goal: 1, category: "Learning", evidenceType: "none" },
{ title: "Implement a Basic Pagination Component", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Simple Accordion", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Learn Basic React Hooks", goal: 1, category: "Learning", evidenceType: "none" }
],
"medium": [
{ title: "Build a Responsive Navigation Bar", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Custom Hook", goal: 2, category: "Learning", evidenceType: "code" },
{ title: "Optimize CSS Performance", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Create a CSS Grid Layout", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop a Component Library", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Integrate a UI Framework", goal: 1, category: "Learning", evidenceType: "screenshot" },
{ title: "Develop a Custom Form Component", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Enhance Accessibility", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Lazy Loading", goal: 1, category: "Performance", evidenceType: "screenshot" },
{ title: "Use Intersection Observer API", goal: 1, category: "Learning", evidenceType: "code" },
{ title: "Build a Multi-Step Form", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Drag-and-Drop Feature", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Custom Dropdown Menu", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop a Theme Switcher", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Search Bar with Autocomplete", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build a Responsive Image Gallery", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Custom Scrollbar", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Loading Spinner", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop a Custom Tooltip", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build a Responsive Dashboard Layout", goal: 1, category: "Projects", evidenceType: "screenshot" }
],
"hard": [
{ title: "Develop a Progressive Web App", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement Redux in a Complex App", goal: 2, category: "State Management", evidenceType: "code" },
{ title: "Optimize Bundle Size", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Create a High-Performance Carousel", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement Server-Side Rendering", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build a Real-Time Chat Interface", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Integrate with GraphQL", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build Custom Animations with GSAP", goal: 1, category: "Projects", evidenceType: "code" },
{ title: "Implement Code Splitting", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Optimize React Re-Renders", goal: 1, category: "Optimization", evidenceType: "code" },
{ title: "Develop a Custom Data Visualization", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Complex State Management System", goal: 1, category: "State Management", evidenceType: "code" },
{ title: "Build a Custom Video Player", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Custom Charting Library", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Complex Drag-and-Drop Interface", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop a Custom Rich Text Editor", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build a Custom Calendar Component", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Complex Form Validation System", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop a Custom Map Component", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build a Custom Audio Player", goal: 1, category: "Projects", evidenceType: "screenshot" }
],
"expert": [
{ title: "Design a Custom Design System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Implement Micro-Frontends", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Lead a Frontend Overhaul", goal: 1, category: "Leadership", evidenceType: "none" },
{ title: "Architect a Scalable Component Library", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Optimize Critical Rendering Path", goal: 1, category: "Optimization", evidenceType: "code" },
{ title: "Integrate Serverless Functions", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build an AI-Powered UI", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Mentor Junior Developers in Advanced React", goal: 1, category: "Mentoring", evidenceType: "none" },
{ title: "Implement Advanced State Management", goal: 1, category: "State Management", evidenceType: "code" },
{ title: "Innovate with WebAssembly in Frontend", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Design a Custom Animation Library", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Implement a Custom Rendering Engine", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Develop a Custom UI Framework", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Build a Custom Data Grid", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement a Custom Virtual DOM", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Develop a Custom State Management Library", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Build a Custom Testing Framework", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Implement a Custom Build Tool", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Develop a Custom Performance Monitoring Tool", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Build a Custom Accessibility Tool", goal: 1, category: "Innovation", evidenceType: "screenshot" }
]
},
"Backend": {
"easy": [
{ title: "Create a REST API", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Optimize Database Queries", goal: 2, category: "Bug Fixes", evidenceType: "screenshot" },
{ title: "Learn GraphQL Basics", goal: 1, category: "Learning", evidenceType: "none" },
{ title: "Set Up a Basic Node.js Server", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Write Unit Tests", goal: 1, category: "Testing", evidenceType: "code" },
{ title: "Create a Simple CRUD App", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Debug API Endpoints", goal: 1, category: "Bug Fixes", evidenceType: "screenshot" },
{ title: "Implement a Simple Caching Layer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Document API Endpoints", goal: 1, category: "Documentation", evidenceType: "code" },
{ title: "Monitor API Performance", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Set Up a Basic Express Server", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement Basic Error Handling", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Create a Simple Authentication System", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Implement Basic Logging", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Set Up a Basic Database Connection", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Simple API Documentation", goal: 1, category: "Documentation", evidenceType: "code" },
{ title: "Implement Basic Rate Limiting", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Basic CI/CD Pipeline", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Create a Simple Load Balancer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Basic Data Validation", goal: 1, category: "Security", evidenceType: "screenshot" }
],
"medium": [
{ title: "Implement Authentication", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up Redis Cache", goal: 2, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a GraphQL API", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Integrate with a Payment Gateway", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Design a Scalable Database Schema", goal: 1, category: "Architecture", evidenceType: "code" },
{ title: "Implement API Rate Limiting", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Establish an API Versioning Strategy", goal: 1, category: "Maintenance", evidenceType: "screenshot" },
{ title: "Optimize Complex Joins", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Build a Notification Microservice", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Set Up Log Aggregation", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement JWT Authentication", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Message Queue", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop a Custom Middleware", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement API Pagination", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Set Up a Reverse Proxy", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement API Caching", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom Error Handling System", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Set Up a Basic Monitoring Dashboard", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement API Throttling", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Develop a Custom Logging System", goal: 1, category: "Monitoring", evidenceType: "screenshot" }
],
"hard": [
{ title: "Design a Microservice Architecture", goal: 1, category: "Architecture", evidenceType: "none" },
{ title: "Optimize Complex Database Operations", goal: 2, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Advanced Security Features", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Build a Scalable Message Queue System", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Integrate with Multiple Third-Party APIs", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop Real-Time Data Processing", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Architect a Fault-Tolerant System", goal: 1, category: "Architecture", evidenceType: "none" },
{ title: "Optimize Database Indexing", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Event-Driven Design", goal: 1, category: "Projects", evidenceType: "code" },
{ title: "Create a Distributed Caching Mechanism", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom ORM", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Implement a Custom API Gateway", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Build a Custom Load Balancer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom Authentication System", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Implement a Custom Rate Limiting System", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Build a Custom Logging Framework", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Develop a Custom Monitoring Tool", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement a Custom Caching Layer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Build a Custom API Documentation Tool", goal: 1, category: "Documentation", evidenceType: "screenshot" },
{ title: "Develop a Custom Testing Framework", goal: 1, category: "Testing", evidenceType: "screenshot" }
],
"expert": [
{ title: "Lead a Backend System Redesign", goal: 1, category: "Leadership", evidenceType: "none" },
{ title: "Scale Services for High Load", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Integrate Multi-Region Deployments", goal: 1, category: "Cloud", evidenceType: "screenshot" },
{ title: "Architect a Global Data Replication System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Design a Zero-Downtime Deployment Strategy", goal: 1, category: "DevOps", evidenceType: "code" },
{ title: "Innovate with Serverless Architectures", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Mentor the Team on Backend Best Practices", goal: 1, category: "Mentoring", evidenceType: "none" },
{ title: "Implement Machine Learning in Backend Processing", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Create an Autonomous Scaling System", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Lead a Containerization Overhaul", goal: 1, category: "Leadership", evidenceType: "screenshot" },
{ title: "Develop a Custom Distributed System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Implement a Custom Data Replication System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Build a Custom API Gateway", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Develop a Custom Load Balancing Algorithm", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement a Custom Security Framework", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Build a Custom Monitoring System", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Develop a Custom Logging Framework", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement a Custom Caching Mechanism", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Build a Custom API Documentation Tool", goal: 1, category: "Documentation", evidenceType: "screenshot" },
{ title: "Develop a Custom Testing Framework", goal: 1, category: "Testing", evidenceType: "screenshot" }
]
},
"Full Stack": {
"easy": [
{ title: "Build a Full Stack App", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Debug API Integration", goal: 2, category: "Bug Fixes", evidenceType: "screenshot" },
{ title: "Solve 5 LeetCode Problems", goal: 5, category: "Practice", evidenceType: "code" },
{ title: "Create a Simple CRUD App", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop a Basic MERN Project", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement Basic User Authentication", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Integrate a Payment Gateway", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Deploy on Heroku", goal: 1, category: "Deployment", evidenceType: "screenshot" },
{ title: "Write Integration Tests", goal: 1, category: "Testing", evidenceType: "code" },
{ title: "Optimize Full Stack Performance", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Set Up a Basic Full Stack Project", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement Basic Error Handling", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Create a Simple Full Stack App", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement Basic Logging", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Set Up a Basic Database Connection", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Simple API Documentation", goal: 1, category: "Documentation", evidenceType: "code" },
{ title: "Implement Basic Rate Limiting", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Basic CI/CD Pipeline", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Create a Simple Load Balancer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Basic Data Validation", goal: 1, category: "Security", evidenceType: "screenshot" }
],
"medium": [
{ title: "Implement User Registration/Login", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Create a Dockerized App", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Develop a MERN App with Authentication", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Build a Real-Time Chat App", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement API Security", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Integrate Third-Party OAuth", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Develop a RESTful API", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Optimize Data Flow Across Stack", goal: 1, category: "Optimization", evidenceType: "code" },
{ title: "Implement Global Error Handling", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Use WebSockets for Real-Time Updates", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement JWT Authentication", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Message Queue", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Develop a Custom Middleware", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Implement API Pagination", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Set Up a Reverse Proxy", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement API Caching", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom Error Handling System", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Set Up a Basic Monitoring Dashboard", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement API Throttling", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Develop a Custom Logging System", goal: 1, category: "Monitoring", evidenceType: "screenshot" }
],
"hard": [
{ title: "Build a Scalable Microservices App", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Integrate Advanced Caching Mechanisms", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement a CI/CD Pipeline for Full Stack", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Architect a Multi-Tenant System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Design a Distributed System Architecture", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Optimize Both Frontend and Backend Performance", goal: 1, category: "Optimization", evidenceType: "code" },
{ title: "Implement Real-Time Analytics", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Deploy using Kubernetes", goal: 1, category: "Deployment", evidenceType: "screenshot" },
{ title: "Integrate Advanced Security Features", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Implement Server-Side Rendering", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom ORM", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Implement a Custom API Gateway", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Build a Custom Load Balancer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom Authentication System", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Implement a Custom Rate Limiting System", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Build a Custom Logging Framework", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Develop a Custom Monitoring Tool", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement a Custom Caching Layer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Build a Custom API Documentation Tool", goal: 1, category: "Documentation", evidenceType: "screenshot" },
{ title: "Develop a Custom Testing Framework", goal: 1, category: "Testing", evidenceType: "screenshot" }
],
"expert": [
{ title: "Lead a Full-Stack Architecture Overhaul", goal: 1, category: "Leadership", evidenceType: "none" },
{ title: "Design Real-Time Data Synchronization", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Mentor Team on Advanced Full Stack Patterns", goal: 1, category: "Mentoring", evidenceType: "none" },
{ title: "Architect a Highly Scalable Solution", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Innovate with Serverless Full Stack Architecture", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Implement Advanced State Management", goal: 1, category: "State Management", evidenceType: "code" },
{ title: "Develop a Custom Full-Stack Framework", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Optimize End-to-End Performance", goal: 1, category: "Optimization", evidenceType: "code" },
{ title: "Integrate AI-Based Features", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Lead Cross-Functional Projects", goal: 1, category: "Leadership", evidenceType: "none" },
{ title: "Develop a Custom Distributed System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Implement a Custom Data Replication System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Build a Custom API Gateway", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Develop a Custom Load Balancing Algorithm", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement a Custom Security Framework", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Build a Custom Monitoring System", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Develop a Custom Logging Framework", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement a Custom Caching Mechanism", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Build a Custom API Documentation Tool", goal: 1, category: "Documentation", evidenceType: "screenshot" },
{ title: "Develop a Custom Testing Framework", goal: 1, category: "Testing", evidenceType: "screenshot" }
]
},
"DevOps": {
"easy": [
{ title: "Set Up CI/CD Pipeline", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Monitor Server Logs", goal: 3, category: "Bug Fixes", evidenceType: "screenshot" },
{ title: "Learn Kubernetes Basics", goal: 1, category: "Learning", evidenceType: "none" },
{ title: "Deploy a Simple Docker Container", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Configure a Basic Nginx Server", goal: 1, category: "Projects", evidenceType: "screenshot" },
{ title: "Write a Simple Bash Script", goal: 1, category: "Scripting", evidenceType: "code" },
{ title: "Create a Deployment Script", goal: 1, category: "Automation", evidenceType: "screenshot" },
{ title: "Set Up a Basic Logging System", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Document the Deployment Process", goal: 1, category: "Documentation", evidenceType: "code" },
{ title: "Perform a System Health Check", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Set Up a Basic CI/CD Pipeline", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Implement Basic Error Handling", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Create a Simple Load Balancer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Basic Data Validation", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Basic Monitoring Dashboard", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement Basic Rate Limiting", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Basic Reverse Proxy", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Basic API Caching", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom Error Handling System", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Set Up a Basic Logging System", goal: 1, category: "Monitoring", evidenceType: "screenshot" }
],
"medium": [
{ title: "Configure AWS EC2", goal: 1, category: "Cloud", evidenceType: "screenshot" },
{ title: "Automate Deployments with Ansible", goal: 1, category: "Automation", evidenceType: "screenshot" },
{ title: "Set Up Container Orchestration with Docker Swarm", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Create a Custom Monitoring Dashboard", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Automate Backup Processes", goal: 1, category: "Automation", evidenceType: "screenshot" },
{ title: "Implement Log Aggregation with ELK", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Optimize Deployment Processes", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Use Terraform for Infrastructure", goal: 1, category: "Cloud", evidenceType: "screenshot" },
{ title: "Integrate Continuous Deployment", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Implement Basic Security Automation", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Basic CI/CD Pipeline", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Implement Basic Error Handling", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Create a Simple Load Balancer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Basic Data Validation", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Basic Monitoring Dashboard", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement Basic Rate Limiting", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Set Up a Basic Reverse Proxy", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Basic API Caching", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom Error Handling System", goal: 1, category: "Maintenance", evidenceType: "code" },
{ title: "Set Up a Basic Logging System", goal: 1, category: "Monitoring", evidenceType: "screenshot" }
],
"hard": [
{ title: "Design Infrastructure as Code", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Optimize Deployment Pipelines", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement Advanced Monitoring Solutions", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Build a Scalable Container Orchestration System", goal: 1, category: "DevOps", evidenceType: "screenshot" },
{ title: "Integrate Multi-Cloud Deployments", goal: 1, category: "Cloud", evidenceType: "screenshot" },
{ title: "Automate Complex Scaling Strategies", goal: 1, category: "Automation", evidenceType: "screenshot" },
{ title: "Develop Custom Deployment Tools", goal: 1, category: "Automation", evidenceType: "code" },
{ title: "Architect a Robust Disaster Recovery Plan", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Optimize Cloud Resource Allocation", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Integrate Security Best Practices in DevOps", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Develop a Custom ORM", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Implement a Custom API Gateway", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Build a Custom Load Balancer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Develop a Custom Authentication System", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Implement a Custom Rate Limiting System", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Build a Custom Logging Framework", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Develop a Custom Monitoring Tool", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement a Custom Caching Layer", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Build a Custom API Documentation Tool", goal: 1, category: "Documentation", evidenceType: "screenshot" },
{ title: "Develop a Custom Testing Framework", goal: 1, category: "Testing", evidenceType: "screenshot" }
],
"expert": [
{ title: "Lead Cloud Infrastructure Redesign", goal: 1, category: "Leadership", evidenceType: "none" },
{ title: "Integrate Multi-Cloud Deployments", goal: 1, category: "Cloud", evidenceType: "screenshot" },
{ title: "Automate Complex Scaling Strategies", goal: 1, category: "Automation", evidenceType: "screenshot" },
{ title: "Architect a Global Infrastructure Solution", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Design a Zero-Downtime Deployment Strategy", goal: 1, category: "DevOps", evidenceType: "code" },
{ title: "Innovate with Serverless Architectures", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Mentor the Team on DevOps Best Practices", goal: 1, category: "Mentoring", evidenceType: "none" },
{ title: "Implement AI-Driven Monitoring Solutions", goal: 1, category: "Innovation", evidenceType: "screenshot" },
{ title: "Create an Autonomous Deployment System", goal: 1, category: "Automation", evidenceType: "screenshot" },
{ title: "Lead a Containerization Overhaul", goal: 1, category: "Leadership", evidenceType: "screenshot" },
{ title: "Develop a Custom Distributed System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Implement a Custom Data Replication System", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Build a Custom API Gateway", goal: 1, category: "Architecture", evidenceType: "screenshot" },
{ title: "Develop a Custom Load Balancing Algorithm", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Implement a Custom Security Framework", goal: 1, category: "Security", evidenceType: "screenshot" },
{ title: "Build a Custom Monitoring System", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Develop a Custom Logging Framework", goal: 1, category: "Monitoring", evidenceType: "screenshot" },
{ title: "Implement a Custom Caching Mechanism", goal: 1, category: "Optimization", evidenceType: "screenshot" },
{ title: "Build a Custom API Documentation Tool", goal: 1, category: "Documentation", evidenceType: "screenshot" },
{ title: "Develop a Custom Testing Framework", goal: 1, category: "Testing", evidenceType: "screenshot" }
]
}
};

// Determine difficulty based on days active
function getDifficulty() {
const createdAtDate = userData.createdAt ? new Date(userData.createdAt) : new Date();
const daysActive = Math.floor((new Date() - createdAtDate) / (1000 * 60 * 60 * 24));
if (daysActive <= 30) return "easy";
else if (daysActive <= 60) return "medium";
else if (daysActive <= 90) return "hard";
else return "expert";
}

// Auth state listener
auth.onAuthStateChanged(async (user) => {
if (!user) {
window.location.href = 'index.html';
} else {
currentUser = user;
await loadUserData();
renderUserData();
renderTasks();
renderQuests();
checkWeeklyQuests();
}
});

// Load user data from Firestore
async function loadUserData() {
const userDoc = await db.collection('users').doc(currentUser.uid).get();
if (userDoc.exists) {
userData = userDoc.data();
} else {
await db.collection('users').doc(currentUser.uid).set(userData);
}
}

// Save user data to Firestore
async function saveUserData() {
await db.collection('users').doc(currentUser.uid).set(userData);
}

// Render user data
function renderUserData() {
const createdAtDate = userData.createdAt ? new Date(userData.createdAt) : new Date();
const daysActive = Math.floor((new Date() - createdAtDate) / (1000 * 60 * 60 * 24));
document.getElementById('days-active').textContent = daysActive < 0 ? 0 : daysActive;

const rate = userData.totalTasks === 0
? 0
: (userData.tasksCompleted / userData.totalTasks) * 100;
const clampedRate = Math.min(Math.round(rate), 100);

document.getElementById('player-name').textContent = userData.username || 'Developer';
document.getElementById('player-level').textContent = userData.level;
document.getElementById('task-rate').textContent = clampedRate + '%';
document.getElementById('player-type').textContent = userData.type || 'N/A';
}

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', () => {
auth.signOut().then(() => {
window.location.href = 'index.html';
});
});

// Edit Profile modal
document.getElementById('editProfileBtn').addEventListener('click', () => {
document.getElementById('profile-username').value = userData.username || '';
document.getElementById('profile-type').value = userData.type || '';
document.getElementById('profile-modal').style.display = 'block';
});
document.getElementById('profile-form').addEventListener('submit', (e) => {
e.preventDefault();
userData.username = document.getElementById('profile-username').value;
userData.type = document.getElementById('profile-type').value;
saveUserData();
renderUserData();
document.getElementById('profile-modal').style.display = 'none';
});

// Evidence modal submission
document.getElementById('evidence-form').addEventListener('submit', (e) => {
e.preventDefault();
let evidenceValue = null;
if (currentTaskDataForVerification.evidenceType === "screenshot") {
evidenceValue = document.getElementById('screenshot-url').value;
if (!evidenceValue) {
  alert("Screenshot URL is required.");
  return;
}
} else if (currentTaskDataForVerification.evidenceType === "code") {
evidenceValue = document.getElementById('code-snippet').value;
if (!evidenceValue) {
  alert("Code snippet is required.");
  return;
}
}
currentTaskDataForVerification.progress = currentTaskDataForVerification.goal;
currentTaskDataForVerification.completed = true;
currentTaskDataForVerification.evidence = evidenceValue || null;
db.collection('users').doc(currentUser.uid)
.collection('tasks')
.doc(currentTaskIdForVerification)
.update(currentTaskDataForVerification)
.then(() => {
  userData.tasksCompleted++;
  userData.level++;
  saveUserData();
  document.getElementById('evidence-modal').style.display = 'none';
  document.getElementById('screenshot-url').value = '';
  document.getElementById('code-snippet').value = '';
  renderTasks();
  renderUserData();
});
});
document.getElementById('closeEvidenceModal').addEventListener('click', () => {
document.getElementById('evidence-modal').style.display = 'none';
});

// Add Random Task (max 5 per day) based on account age/difficulty
document.getElementById('add-task-btn').addEventListener('click', async () => {
const tasksRef = db.collection('users').doc(currentUser.uid).collection('tasks');
const snapshot = await tasksRef.get();
let todayCount = 0;
snapshot.forEach((doc) => {
const t = doc.data();
const createdAt = t.createdAt && t.createdAt.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
if (isSameDay(createdAt, new Date())) todayCount++;
});
if (todayCount >= 5) {
alert("Maximum 5 tasks per day reached.");
return;
}

const difficulty = getDifficulty();
const playerType = userData.type;
if (playerType && tasksByDifficulty[playerType] && tasksByDifficulty[playerType][difficulty]) {
const availableTasks = tasksByDifficulty[playerType][difficulty];
const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
tasksRef.add({
  ...randomTask,
  progress: 0,
  completed: false,
  createdAt: new Date()
}).then(() => {
  userData.totalTasks++;
  saveUserData();
  renderTasks();
});
} else {
alert("Please set your developer type in the profile first.");
}
});

// Render Tasks (only those created today)
function renderTasks() {
const taskList = document.getElementById('task-list');
taskList.innerHTML = '';
db.collection('users').doc(currentUser.uid).collection('tasks')
.onSnapshot((snapshot) => {
  taskList.innerHTML = '';
  snapshot.forEach((doc) => {
    const task = doc.data();
    const createdAt = task.createdAt && task.createdAt.toDate
      ? task.createdAt.toDate()
      : new Date(task.createdAt);
    if (!isSameDay(createdAt, new Date())) return;
    const taskId = doc.id;
    const taskItem = document.createElement('li');
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <small>${task.progress}/${task.goal} (${task.category})</small>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${(task.progress / task.goal) * 100}%"></div>
      </div>
    `;
    taskItem.addEventListener('click', () => {
      if (task.completed) return;
      if (task.evidenceType !== "none" && (task.progress + 1 >= task.goal)) {
        currentTaskIdForVerification = taskId;
        currentTaskDataForVerification = task;
        if (task.evidenceType === "screenshot") {
          document.getElementById('evidence-screenshot').style.display = 'block';
          document.getElementById('evidence-code').style.display = 'none';
          document.getElementById('screenshot-url').value = '';
        } else if (task.evidenceType === "code") {
          document.getElementById('evidence-code').style.display = 'block';
          document.getElementById('evidence-screenshot').style.display = 'none';
          document.getElementById('code-snippet').value = '';
        }
        document.getElementById('evidence-modal').style.display = 'block';
      } else {
        task.progress++;
        db.collection('users').doc(currentUser.uid).collection('tasks').doc(taskId)
          .update(task)
          .then(() => { renderTasks(); });
      }
    });
    taskList.appendChild(taskItem);
  });
});
}

// Render Quests (only from current week)
function renderQuests() {
const questList = document.getElementById('quest-list');
questList.innerHTML = '';
db.collection('users').doc(currentUser.uid).collection('quests')
.onSnapshot((snapshot) => {
  questList.innerHTML = '';
  snapshot.forEach((doc) => {
    const quest = doc.data();
    const createdAt = quest.createdAt && quest.createdAt.toDate
      ? quest.createdAt.toDate()
      : new Date(quest.createdAt);
    if (!isSameWeek(createdAt, new Date())) return;
    const questItem = document.createElement('li');
    questItem.className = "task-item";
    questItem.innerHTML = `
      <h3>${quest.title}</h3>
      <small>${quest.progress}/${quest.goal}</small>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${(quest.progress / quest.goal) * 100}%"></div>
      </div>
    `;
    questList.appendChild(questItem);
  });
});
}

// Check and add up to 2 quests per week
async function checkWeeklyQuests() {
if (new Date().getDay() === 0) return;
const questsRef = db.collection('users').doc(currentUser.uid).collection('quests');
const snapshot = await questsRef.get();
let currentWeekQuests = [];
snapshot.forEach(doc => {
const quest = doc.data();
const createdAt = quest.createdAt && quest.createdAt.toDate
  ? quest.createdAt.toDate()
  : new Date(quest.createdAt);
if (isSameWeek(createdAt, new Date())) currentWeekQuests.push(doc);
});
if (currentWeekQuests.length < 2) {
const randomQuests = [
  {
    title: "Solve 5 LeetCode Problems",
    description: "Improve your problem-solving skills by solving 5 LeetCode problems.",
    progress: 0,
    goal: 5,
    reward: { xp: 100, items: ["Skill Point"] },
    completed: false,
  },
  {
    title: "Build a REST API",
    description: "Create a REST API using Node.js and Express.",
    progress: 0,
    goal: 1,
    reward: { xp: 200, items: ["Project Badge"] },
    completed: false,
  }
];
const questsToAdd = 2 - currentWeekQuests.length;
for (let i = 0; i < questsToAdd; i++) {
  const randomQuest = randomQuests[Math.floor(Math.random() * randomQuests.length)];
  questsRef.add({
    ...randomQuest,
    createdAt: new Date()
  });
}
}
}
// Status Button Functionality
document.getElementById('nav-status').addEventListener('click', () => {
// Scroll to the top of the page to show the status section (sidebar)
window.scrollTo({ top: 0, behavior: 'smooth' });
// Highlight the Status button
highlightNavButton('nav-status');
});

// Tasks Button Functionality
document.getElementById('nav-tasks').addEventListener('click', () => {
// Scroll to the Tasks section in the main content
const tasksSection = document.querySelector('.card:first-child');
tasksSection.scrollIntoView({ behavior: 'smooth' });
// Highlight the Tasks button
highlightNavButton('nav-tasks');
});

// Quests Button Functionality
document.getElementById('nav-quests').addEventListener('click', () => {
// Scroll to the Quests section in the main content
const questsSection = document.querySelector('.card:last-child');
questsSection.scrollIntoView({ behavior: 'smooth' });
// Highlight the Quests button
highlightNavButton('nav-quests');
});

// Helper function to highlight the active navigation button
function highlightNavButton(activeButtonId) {
// Remove the active class from all navigation buttons
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => link.classList.remove('active'));

// Add the active class to the clicked button
const activeButton = document.getElementById(activeButtonId);
activeButton.classList.add('active');
}

// Close modals when clicking the close buttons
document.getElementById('closeProfileModal').addEventListener('click', () => {
document.getElementById('profile-modal').style.display = 'none';
});
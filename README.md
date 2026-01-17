Edusphere – School Website Platform
📘 Project Overview

Edusphere is a modern, secure, and responsive school website platform designed to manage user authentication, profiles, and dashboard-based content. The application demonstrates full-stack development principles with a focus on security, scalability, and clean architecture.

This project is suitable for academic evaluation, internships, and real-world school management use cases.

🚀 Features
🔐 User Authentication

User Signup with form validation

User Login using JWT-based authentication

Password hashing for enhanced security

Secure Logout functionality

👤 User Profile Management

View user profile details

Update profile information

Profile data fetched securely from backend APIs

📊 Dashboard Functionalities

Protected routes (accessible only after login)

CRUD operations on a sample entity (Tasks / Notes / Posts)

Search functionality

Filter UI for content management

✅ Form Validation & Error Handling

Client-side validation (frontend)

Server-side validation (backend)

User-friendly error messages and validation feedback

🛠️ Tech Stack
Frontend

Responsive UI design

Form validation

Protected route implementation

Dashboard interface

Reusable and modular components

Backend

RESTful APIs for:

Signup & Login

Profile Fetch & Update

CRUD operations

JWT authentication middleware

Password hashing

Centralized error handling

Database

User authentication data

User profile information

Sample entity data (tasks / notes / posts)

🔒 Security Features

Password hashing

JWT-based authentication

Protected API endpoints

Input validation on both client & server

🧩 Application Pages
🌐 Public Pages

Homepage

Login Page

Signup Page

🔐 Protected Pages

User Dashboard

Profile Page

Content Management Interface

## Project Info

## Project Directory

```
├── README.md # Documentation
├── components.json # Component library configuration
├── index.html # Entry file
├── package.json # Package management
├── postcss.config.js # PostCSS configuration
├── public # Static resources directory
│   ├── favicon.png # Icon
│   └── images # Image resources
├── src # Source code directory
│   ├── App.tsx # Entry file
│   ├── components # Components directory
│   ├── context # Context directory
│   ├── db # Database configuration directory
│   ├── hooks # Common hooks directory
│   ├── index.css # Global styles
│   ├── layout # Layout directory
│   ├── lib # Utility library directory
│   ├── main.tsx # Entry file
│   ├── routes.tsx # Routing configuration
│   ├── pages # Pages directory
│   ├── services # Database interaction directory
│   ├── types # Type definitions directory
├── tsconfig.app.json # TypeScript frontend configuration file
├── tsconfig.json # TypeScript configuration file
├── tsconfig.node.json # TypeScript Node.js configuration file
└── vite.config.ts # Vite configuration file
```

## Tech Stack

Vite, TypeScript, React, Supabase

## Development Guidelines


⚙️ Installation & Setup
Prerequisites

Node.js

Database (MongoDB / MySQL / PostgreSQL – as per implementation)

Steps

Clone the repository

Install frontend and backend dependencies

Configure database connection

Run backend server

Run frontend application

# How to develop backend services?

Configure environment variables and install relevant dependencies.If you need to use a database, please use the official version of Supabase.

application

📌 Additional Notes

Designed with scalability in mind

Follows best practices for authentication and security

Suitable for academic projects, demos, and real-world school platforms

📄 License

This project is developed for educational and demonstration purposes.

🔗 Live Project: https://tinyurl.com/Edusphereeee

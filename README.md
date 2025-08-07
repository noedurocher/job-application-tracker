# Job Application Tracker

A full-stack web application for tracking job applications. Users can log in, create, update, delete, and view a paginated list of their job submissions, all in a responsive and user-friendly interface.

## ✨ Features

- User authentication (login/logout)
- Create, read, update, delete (CRUD) job applications
- Filter and sort jobs by title, company, status and dateApplied
- Paginated job list display
- Responsive layout: job form on the left, paginated list on the right
- Secure password storage using BCrypt
- Integrated with backend RESTful API (Spring Boot + PostgreSQL)

## 🖥️ Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS Modules 
  
### Backend
- Java + Spring Boot
- Spring Security
- PH2 for testing
- JPA/Hibernate

### Deployment
- Frontend: Netlify
- Backend: Render

## 🚀 Getting Started

### Prerequisites

- Node.js + npm
- Java 17+
- H2 in dev
### Backend

./mvnw spring-boot:run

### Frontend

```bash
cd frontend
npm install
npm start




# Online Exam Portal

## Overview
Online Exam Portal is a full-stack web application developed to conduct online examinations.  
It allows administrators to create and manage exams and questions, while students can attend exams and view their results.

The backend is implemented using **Spring Boot REST APIs**, and the frontend is built with **HTML, CSS, and JavaScript**.

---

## Tech Stack
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MySQL 
- **Build Tool:** Maven
- **Tools:** Git, VS Code

---

## Key Features
- Exam creation and management
- Question management per exam
- Student exam submission
- Result storage and retrieval
- RESTful API based communication

---

## Project Structure

online-exam-portal/
│
├── calm/                      # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/example/calm/
│   │       │       ├── Controller/
│   │       │       ├── Service/
│   │       │       ├── Repository/
│   │       │       ├── Model/
│   │       │       └── CalmApplication.java
│   │       └── resources/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/                  # Frontend (HTML, CSS, JS)
│   ├── CSS/
│   ├── IMAGES/
│   ├── JS/
│   ├── admin.html
│   ├── attend-exam.html
│   ├── dashboard.html
│   ├── exam.html
│   ├── list-exams.html
│   ├── result.html
│   ├── view-questions.html
│   └── view-results.html
│
├── README.md
└── .gitignore

---

## How to Run

### Backend
```bash
cd calm
mvn spring-boot:run



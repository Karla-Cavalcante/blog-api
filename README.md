# #Blog Tech - Backend
This is the backend of the Blog Tech project, responsible for handling authentication, database operations, and API requests. It provides a RESTful API that allows users to view posts and comments, while administrators can create, edit, and delete posts.

## Technologies Used
- Node.js – JavaScript runtime for backend development
- Express.js – Web framework for handling API routes
- PostgreSQL – Database for storing posts, users, and comments (can be replaced with another DB)
- JWT (JSON Web Tokens) – Used for user authentication
- Bcrypt – For hashing user passwords

## Features
- ✅ User Authentication – Login system with JWT authentication
- ✅ Post Management – Admins can create, edit, and delete posts
- ✅ Comment System – Users can add comments without authentication
- ✅ Secure Passwords – Passwords are hashed using Bcrypt
- ✅ REST API – Fully functional API with structured routes

## Prerequisites
Before running the project, ensure you have the following installed:

- Node.js (Latest version recommended)
- PostgreSQL (or another relational database)

## Project Structure
The project is divided into two separate repositories:

Frontend: [[Frontend Repository Link](https://github.com/Karla-Cavalcante/frontend-blog-api)] (React + Vite)
Backend: [[Backend Repository Link](https://github.com/Karla-Cavalcante/blog-api)] (Node.js + Express)

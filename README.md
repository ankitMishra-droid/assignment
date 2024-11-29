# Node.js API with Hapi.js, Sequelize, MySQL, JWT Authentication, and Bcrypt

## Overview
This project is a **Node.js-based RESTful API** built using the following technologies:

- **Hapi.js**: A robust and flexible framework for creating APIs.
- **Sequelize**: An ORM for managing and interacting with a MySQL database.
- **MySQL**: Relational database for data storage.
- **JWT**: For secure authentication and authorization.
- **Bcrypt**: For hashing passwords securely.

The API supports essential CRUD operations for user management and includes features for **authentication**, **authorization**, and **data security**.

---

## Features

### 1. **User Management:**
- Create, read, update, and delete users.
- Store **Personally Identifiable Information (PII)** securely.

### 2. **Authentication and Authorization:**
- **JWT-based authentication** for user login.
- **Role-based access control** for sensitive routes (admin vs user).

### 3. **Password Security:**
- **bcrypt** is used to hash user passwords before storing them in the database.

### 4. **Validation and Error Handling:**
- **Joi** for input validation.
- Graceful error handling with descriptive messages.

### 5. **Database:**
- Use of **Sequelize ORM** for defining models and managing a **MySQL** database.

---

## Installation

### **Prerequisites**

1. **Node.js** (v20 recommended)
   - Download and install from: [Node.js official website](https://nodejs.org/).
   
2. **MySQL** (latest version)
   - Ensure that MySQL is installed and running locally or use a cloud-based MySQL service.
   
3. **Docker** (Optional, for containerization)
   - Install Docker from: [Docker official website](https://www.docker.com/get-started).

### **Steps to Install the Project**

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd my-project

2. **Install dependencies:**:
   ```bash
   npm install

3. **Set up environment variables:**:
   ```bash
**Create a .env file in the root directory and add the following:**:
    DB_NAME=my_database
    DB_USERNAME=my_user
    DB_PASSWORD=my_password
    DB_HOST=localhost
    DB_DIALECT=mysql
    JWT_SECRET=my_jwt_secret
    PORT=5000

4. **Start the server:**:
    ```bash
    npm start

### Usage ###
***API Endpoints:***
| Method | Endpoint             | Description                         | Authorization Required |
|--------|----------------------|-------------------------------------|------------------------|
| POST   | /api/users/register  | Register a new user                 | No                     |
| POST   | /api/users/login     | Log in and receive a JWT            | No                     |
| GET    | /api/users/all-users | Get all users                       | Yes (Admin)            |
| GET    | /api/users/logout    | logout user                         | Yes (need header token)|

### Authentication: ###
**When registering or logging in, a JWT token is generated and must be included in the Authorization header for protected routes:**:
    ```bash
    Authorization: Bearer <your-token-here>

### Security Features ###

**JWT Authentication:**
Ensures that only authenticated users can access protected routes.
JWT tokens are signed using a secret key (JWT_SECRET), which should be stored securely in the .env file.

**Password Hashing:**
User passwords are hashed with bcrypt before storing them in the database. This ensures that even if the database is compromised, passwords cannot be easily recovered.

**Input Validation:**
User input is validated using Joi to ensure that only valid data is processed by the API.

**Error Handling:**
Clear, descriptive error messages are returned when validation or other errors occur.
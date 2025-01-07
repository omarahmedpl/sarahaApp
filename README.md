# Saraha App - Anonymous Messaging Platform

## Overview

**Saraha App** is a secure anonymous messaging platform that enables users to send and receive messages without revealing their identity. The application integrates advanced security features such as JWT-based authentication, password hashing, and encryption. It also ensures reliable email verification with OTP using NodeMailer.

---

## Features

- **Anonymous Messaging**: Users can send and receive messages while remaining anonymous.
- **Secure Authentication**: 
  - JWT tokens for session management and API authorization.
  - Passwords stored securely using bcrypt hashing.
- **Email Verification**: 
  - OTP-based email verification to activate accounts.
  - NodeMailer integration for reliable email delivery.
- **Validation**: 
  - Input validation using Joi to ensure data integrity.
- **Encryption**: AES encryption for sensitive data.
- **User Roles**: Admin and user roles managed with distinct JWT signatures.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Encryption**: AES and bcrypt.js
- **Validation**: Joi for environment variables and user input
- **Email Services**: NodeMailer for sending OTP emails
- **Environment Management**: `.env` for secure configuration

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/omarahmedpl/sarahaApp
   ```
2. Navigate to the project directory:
   ```bash
   cd sarahaApp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the project root and configure the following variables:
   ```env
   PORT=3000
   TOKEN_SIGNATUER=LOLAWYBGD
   TOKEN_SIGNATUER_ADMIN=LOLAWYBGDADMIN
   AES_KEY="hamada hambozo"
   DB_URL=mongodb+srv://username:password@cluster0.mongodb.net/sarahaApp
   SALT_ROUNDS=8
   EMAIL_USER="your-email@example.com"
   EMAIL_PASS="your-email-password"
   EMAIL_TOKEN="@!$FEWRTRWE%$"
   FE_URL="http://localhost:3000"
   ```
   **Note**: Replace sensitive values with your own secure credentials.

5. Run the server:
   ```bash
   npm run dev
   ```
---
# Project Folder Structure

Here is the folder structure of the project:

```
src/
├── DB/
│   ├── models/
│   └── dbConnections.js
├── middleware/
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── modules/
│   ├── auth/
│   ├── message/
│   └── user/
├── utils/
│   ├── crypto/
│   ├── email/
│   ├── error/
│ 
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

--- 

This README is comprehensive and follows best practices, covering features, setup, security, and contributions. Let me know if you’d like to add or modify anything!  ├── hash/
│   ├── response/
│   └── token/
├── app.controller.js
├── .env
```

## Explanation of Directories

### DB
- **models/**: Contains database models.
- **dbConnections.js**: Handles database connections.

### middleware
- **auth.middleware.js**: Middleware for authentication.
- **validation.middleware.js**: Middleware for validation.

### modules
- **auth/**: Contains authentication-related functionalities.
- **message/**: Handles messaging-related features.
- **user/**: Manages user-related operations.

### utils
- **crypto/**: Utilities for cryptographic operations.
- **email/**: Handles email-related tasks.
- **error/**: Error handling utilities.
- **hash/**: Hashing utilities.
- **response/**: Standardized response handling.
- **token/**: Token generation and management.

## Root Files
- **app.controller.js**: The main controller of the application.
- **.env**: Environment configuration file.

## Security Features

1. **JWT Authorization**:
   - Separate signatures for admin and user tokens.
   - Tokens include user-specific claims for access control.

2. **Password Hashing**:
   - Bcrypt with configurable salt rounds.

3. **Email Verification**:
   - Secure OTP generation and email transmission.

4. **Environment Management**:
   - Sensitive credentials stored securely in `.env`.
   - Validation ensures completeness and correctness.

---

# Authentication and User Management API Documentation

## Base URL
All requests should be made to:
```
http://ec2-51-21-139-149.eu-north-1.compute.amazonaws.com
```

---

## Authentication

### **Sign Up**
**Endpoint:**
```
POST /auth/signup
```
**Request Headers:**
```
Accept-Language: en
```
**Request Body (JSON):**
```json
{
    "username": "0omarahmed732",
    "email": "@plementus.com",
    "password": "Oo123456@",
    "confirmationPassword": "Oo123456@",
    "phone": "01024197972"
}
```

### **Login**
**Endpoint:**
```
POST /auth/login
```
**Request Body (JSON):**
```json
{
    "email": "0omarahmed73@gmail.com",
    "password": "Oo123456@OO"
}
```

### **Confirm Email**
**Endpoint:**
```
PATCH /auth/confirm-email
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```

### **Forgot Password**
**Endpoint:**
```
PATCH /auth/forget-passowrd
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Request Body (JSON):**
```json
{
    "email": "0omarahmed73@gmail.com"
}
```

### **Reset Password**
**Endpoint:**
```
PATCH /auth/reset-password
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Request Body (JSON):**
```json
{
    "email": "0omarahmed73@gmail.com",
    "password": "Oo123456@OO",
    "confirmationPassword": "Oo123456@OO",
    "otp": 245569
}
```

---

## User Management

### **Find All Users**
**Endpoint:**
```
GET /user/:userId/shareProfile
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Path Variables:**
```
userId: 67741a10a12502ca19a2f193
```

### **Find Profile**
**Endpoint:**
```
GET /user/profile
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```

### **Update Profile**
**Endpoint:**
```
PATCH /user/profile
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Request Body (JSON):**
```json
{
    "username": "0omarahmed73",
    "phone": "01155669988",
    "gender": "male",
    "dob": "09-28-2001"
}
```

### **Update Email**
**Endpoint:**
```
PUT /user/profile/updateEmail
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Request Body (JSON):**
```json
{
    "email": "0omarahmed73@gmail.com"
}
```

### **Update Password**
**Endpoint:**
```
PATCH /user/profile/updatePassword
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Request Body (JSON):**
```json
{
    "oldPassword": "Oo123456@@@",
    "password": "Oo123456@@",
    "confirmationPassword": "Oo123456@@"
}
```

### **Confirm Email Update**
**Endpoint:**
```
PUT /user/profile/confirmEmailUpdate
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Request Body (JSON):**
```json
{
    "email": "omar19055@gmail.com"
}
```

### **Freeze Account**
**Endpoint:**
```
DELETE /user/profile/freeze
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Request Body (JSON):**
```json
{
    "email": "omar19055@gmail.com"
}
```

---

## Messages

### **Send Message**
**Endpoint:**
```
POST /message
```
**Request Body (JSON):**
```json
{
    "message": "Hello Omar شيشسيشس",
    "accountId": "67741a10a12502ca19a2f193"
}
```

### **Delete Message**
**Endpoint:**
```
DELETE /message/:messageId
```
**Request Headers:**
```
Authorization: <JWT_TOKEN>
```
**Path Variables:**
```
messageId: <Message_ID>
```

---

## Notes
- Replace `<JWT_TOKEN>` with the actual token obtained during the authentication process.
- Use appropriate HTTP methods for each endpoint.
- Ensure proper error handling in your requests.
- Provide valid and accurate data in the request body to avoid validation errors.



## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

---

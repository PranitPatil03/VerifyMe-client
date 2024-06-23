# VerifyMe Application

## Overview

This project is a full-stack application designed to manage user sign-up, login, and password reset processes with email OTP verification. The application includes error handling, secure password hashing, and a responsive UI as per the provided Figma design.

## Tech Stack

### Frontend
- **Typescript**
- **React**
- **Tailwind CSS**
- **Shadcn**
- **React Hook Form**
- **React Router**

### Backend
- **Typescript**
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT (JSON Web Tokens)**
- **Nodemailer**
- **OTPLib**

## Features
1. **Signup Flow with Email OTP Verification**
2. **Error Handling**
3. **Welcome Page After Signup**
4. **Login Flow with Password Verification**
5. **UI Design as per Figma**
6. **Password Hashing and Security**
7. **Password Reset Option**

## Project Structure

- **Client repository:** [VerifyMe-client](https://github.com/PranitPatil03/VerifyMe-client)

- **Server repository :** [VerifyMe-server](https://github.com/PranitPatil03/VerifyMe-server)

## Setup and Local Run Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local instance or MongoDB Atlas)
- **Git**

### Frontend Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/PranitPatil03/VerifyMe-client.git
   cd VerifyMe-client
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

### Backend Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/PranitPatil03/VerifyMe-server.git
   cd VerifyMe-server
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory with the following content:
   ```env
   PORT=3000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```

4. **Run the Application**
   ```sh
   npm start
   ```

   The backend will be available at `http://localhost:3000`.

## Deployment

Both the frontend and backend have been deployed to the cloud and can be accessed via the following URLs:

- **Frontend Deployment:** [VerifyMe Frontend](https://verifyme-client.vercel.app)
- **Backend Deployment:** [VerifyMe Backend](https://verifyme-server.vercel.app)

## Contact

For any queries, feel free to reach out:

- **Portfolio:** [Pranit Patil](https://patilpranit.vercel.app/)
- **Email:** patilpranit3112@gmail.com

Thank you for the opportunity to work on this assignment!

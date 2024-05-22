# TheHomeVoyage - MERN Booking App

This repository contains the source code for a full-stack booking app named HomeVoyage, built using the MERN stack (MongoDB, Express.js, React, Node.js). The app allow users to create accounts, list places for rent, and make bookings.

## Introduction

TheHomeVoyage is a project that guides you through the process of building a full-stack booking system app using the MERN stack. It covers the development of key features such as user authentication, listing places, uploading photos, managing bookings, and more.

## Features

- User authentication (Login, Register and Google Oauth)
- Account management
- Listing places/accommodations
- Uploading photos from a device or a link
- Editing and deleting existing places
- Homepage with a list of available places
- Single place page with details
- Booking functionality
- User bookings history
- Responsive design for various screen sizes

## Dependencies

- MongoDB: Database for storing user accounts, places, and bookings.
- Express.js: Backend framework for handling HTTP requests.
- React: Frontend library for building user interfaces.
- Node.js: JavaScript runtime for server-side development.
- Other dependencies are listed in the `package.json` file.

## Setup Instructions

1. Clone the repository: `https://github.com/sgoyalsmvj/TheHomeVoyage`
2. Navigate to the project folder: `cd TheHomeVoyage`
3. Install dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

## Authentication Feature

### Overview

This project includes a robust authentication system supporting user registration, login, logout, and Google OAuth. The system ensures secure and seamless user management.

### Backend

- **User Model**: Stores user details (email, hashed password, Google ID, name) using MongoDB.

- **Routes**:
  - **Register**: Validates and registers new users. Hashes passwords before storing them.
  - **Login**: Authenticates users and issues JWT tokens.
  - **Logout**: Clears the authentication token.
  - **Google OAuth**: Uses Passport.js to handle Google sign-ins and account creation for new users.

- **Middleware**:
  - `validatePassword`: Ensures that passwords meet certain criteria (length, inclusion of letters, symbols, and numbers).
  - `authenticateUser`:Protects routes by ensuring the presence and validity of a JWT token.

### Frontend

- **User Context**: Manages and provides user state across the application using React Context API.

- **Login Page**:
  - Supports email/password and Google login.
  - Updates user context and redirects upon successful login.
  - Displays error messages for failed login attempts.

- **Register Page**:
  - Registers new users and handles errors.
  - Supports Google OAuth for registration.



## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.


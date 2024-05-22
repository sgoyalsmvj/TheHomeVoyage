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

### Backend

- **User Model**:
  Stores user details (email, hashed password, Google ID, name) using MongoDB.

- **Routes**:
  - **Register**: Validates and registers new users. Hashes passwords before storing them.
  - **Login**: Authenticates users and issues JWT tokens.
  - **Logout**: Clears the authentication token.
  - **Google OAuth**: Uses Passport.js to handle Google sign-ins and account creation for new users.
  - **User Profile**: Retrieves user profile information for authenticated users.

### Frontend

- **User Context**: Manages and provides user state across the application using React Context API.

- **Login Page**:

  - Supports email/password and Google login.
  - Updates user context and redirects upon successful login.
  - Displays error messages for failed login attempts.

- **Register Page**:
  - Registers new users and handles errors.
  - Supports Google OAuth for registration.

## Places Management

### Backend

- **Place Model**: Stores place details (owner, title, address, photos, description, perks, extra info, check-in/check-out times, max guests, price).

- **Routes**:
  - **Get All Places**: Fetches all listed places.
  - **Get Place**: Fetches a single place by ID.
  - **Add Place**: Allows authenticated users to add new places.
  - **Edit Place**: Allows owners to edit their places.
  - **Delete Place**: Allows owners to delete their places.
  - **User Places**: Fetches all places owned by the authenticated user.

### Frontend

- **PlacesFormPage**: A reusable form component for adding and editing places.

  - Pre-fills form fields when editing a place.
  - Handles form submission for both adding and editing places.

- **Place List and Details**: Displays a list of all available places and detailed information for each place.

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

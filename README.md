# The HomeVoyage

This repository contains the source code for a full-stack booking app named HomeVoyage, built using the MERN stack (MongoDB, Express.js, React, Node.js). The app allows users to create accounts, list places for rent, and make bookings.

## Introduction

The HomeVoyage is a project that guides you through the process of building a full-stack booking system app using the MERN stack. It covers the development of key features such as user authentication, listing places, uploading photos, managing bookings, and more.

## Features

- User authentication (Login, Register, and Google OAuth)
- Account management
- Listing places/accommodations
- Uploading photos from a device or a link (Amazon S3)
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

- **Image Deletion**:
  - Ensures that images are deleted from the S3 bucket if the wrong image is uploaded.
  - Deletes images of a place from the S3 bucket when deleting the place from the database.

### Frontend

- **PlacesFormPage**: A reusable form component for adding and editing places.

  - Pre-fills form fields when editing a place.
  - Handles form submission for both adding and editing places.

- **Place List and Details**: Displays a list of all available places and detailed information for each place.

## Photo Uploading Feature

### Backend

- **Upload Controllers**:
  - Implemented endpoints for uploading photos both from a device and from a link.
  - Utilized AWS S3 for storing uploaded photos.

- **Upload Router**:
  - Created routes for handling photo upload requests.

### Frontend

- **PhotoUploader Component**: 
  - Added functionality to upload photos both by link and by file upload.
  - Implemented a function to remove photos.
  - Implemented a function to select a main photo.
  - Displayed uploaded photos with options to remove and set as the main photo.
  - Used Axios for making API requests to upload and delete photos.

### Place Page and Gallery

- **PlacePage Component**: 
  - Displays detailed information about a selected place, including title, address, description, check-in/check-out times, max guests, and extra info.
  - Utilizes the `PlaceGallery` component to show the photos of the place.
  - Uses the `BookingWidget` component for booking the place.

- **PlaceGallery Component**: 
  - Displays the first five photos of a place in a grid layout.
  - Provides an option to view all photos in a full-screen modal.
  - Photos are displayed in a specific layout: the first photo takes up two rows, and the next four photos each occupy one row and one column.

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

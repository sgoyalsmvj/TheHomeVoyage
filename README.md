# The HomeVoyage

This repository contains the source code for a full-stack booking app named HomeVoyage, built using the MERN stack (MongoDB, Express.js, React, Node.js). The app allows users to create accounts, list places for rent, and make bookings.

## Introduction

HomeVoyage is a project that guides you through the process of building a full-stack booking system app using the MERN stack. It covers the development of key features such as user authentication, listing places, uploading photos, managing bookings, and more.

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

- **Backend**:
  - MongoDB: Database for storing user accounts, places, and bookings.
  - Express.js: Backend framework for handling HTTP requests.
  - Node.js: JavaScript runtime for server-side development.
  - Mongoose: MongoDB object modeling for Node.js.
  - Passport.js: Authentication middleware for Node.js.
  - JWT (jsonwebtoken): Library for creating and verifying JSON Web Tokens.
  - Bcrypt: Library for hashing passwords.
  - AWS SDK: Amazon Web Services SDK for integrating with S3.
  - Multer: Middleware for handling `multipart/form-data`, used for file uploads.
  
- **Frontend**:
  - React: Frontend library for building user interfaces.
  - React Router: Library for routing in React applications.
  - Axios: Promise-based HTTP client for making API requests.
  - Context API: React's solution for state management across the app.
  - Tailwind CSS: Utility-first CSS framework for styling.

Additional dependencies are listed in the `package.json` files within the `client` and `server` directories.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/sgoyalsmvj/TheHomeVoyage
   ```
2. Navigate to the project folder:
   ```bash
   cd TheHomeVoyage
   ```
3. Install dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     AWS_ACCESS_KEY_ID=your_aws_access_key_id
     AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
     S3_BUCKET_NAME=your_s3_bucket_name
     ```

5. Start the development servers:
   - In the `server` directory, run:
     ```bash
     npm start
     ```
   - In the `client` directory, run:
     ```bash
     npm start
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

## Booking Feature

### Backend

- **Booking Model**: Stores booking details (user, place, check-in date, check-out date, total price).

- **Routes**:
  - **Add Booking**: Allows users to create a new booking.
  - **Get User Bookings**: Fetches all bookings made by the authenticated user.
  - **Get Booking**: Fetches a single booking by ID.

### Frontend

- **BookingWidget Component**:
  - Displays booking form with check-in and check-out dates, number of guests.
  - Calculates and displays total price based on selected dates.
  - Handles form submission to create a new booking.

- **UserBookingsPage Component**:
  - Displays a list of all bookings made by the authenticated user.
  - Provides details for each booking including place, dates, and total price.

## Responsive Design

- The app uses a responsive design to ensure a seamless user experience across various screen sizes.
- Utilizes Tailwind CSS for styling, enabling flexibility and consistency in the design.

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests. Follow the standard Git workflow for contributions:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.


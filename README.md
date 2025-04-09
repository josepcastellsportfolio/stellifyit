# StellifyIt

StellifyIt is a full-stack web application designed to provide a seamless user experience for managing tasks and exploring various features. The project is divided into two main parts: the backend and the frontend.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Backend Overview](#backend-overview)
- [Frontend Overview](#frontend-overview)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization.
- Task management with CRUD operations.
- Responsive and user-friendly interface.
- Multi-language support (English and Spanish).
- Theming and animations for enhanced user experience.

## Technologies Used
### Backend
- Node.js
- TypeScript
- Express.js
- PostgreSQL

### Frontend
- React
- TypeScript
- Vite
- CSS Modules

## Project Structure
The project is organized into the following directories:

### Backend
- `src/config`: Configuration files for the application and database.
- `src/controllers`: Handles the logic for various routes.
- `src/middlewares`: Middleware functions for authentication and request validation.
- `src/models`: Database models.
- `src/routes`: API route definitions.
- `src/services`: Business logic and service layer.
- `src/utils`: Utility functions such as logging.
- `tests`: Unit tests for backend functionality.

### Frontend
- `src/components`: Reusable React components organized by feature.
- `src/locales`: Localization files for multi-language support.
- `src/services`: API service functions.
- `src/theme`: Theming and CSS variable management.
- `public/assets/images`: Static assets such as images.

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- PostgreSQL

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database in `src/config/db.ts`.
4. Run database migrations:
   ```bash
   node dbactions/createtables.js
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Backend Overview
The backend is built with Node.js and Express.js, providing a RESTful API for the frontend. It includes features like authentication, task management, and database interactions.

## Frontend Overview
The frontend is a React application powered by Vite for fast development. It includes a responsive design, multi-language support, and a clean user interface.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
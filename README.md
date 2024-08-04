# Course Rating Web App

## Introduction

The Course Rating Web App is a platform that allows students from across New Zealand to view and rate courses from various universities. This web application provides detailed information about the courses offered by different universities, including course descriptions and ratings (with dummy data). The application is built with a React frontend using TypeScript and a .NET backend with C#.

## Features

### Basic Features
- **React Project using TypeScript**: The frontend is built using React and TypeScript, providing a robust and scalable user interface.
- **Styling Library**: Utilizes Material-UI (MUI) for styling, ensuring a visually appealing and responsive design.
- **Responsive UI**: The web app displays nicely on both computer and mobile screens.
- **Routing**: Implemented using React Router for smooth navigation between different pages.
- **Git Usage**: Version control managed using Git, with regular commits reflecting the development process.

### Advanced Features
- **Dark/Light Mode Switching**: The application supports theme switching between dark and light modes based on user preferences.
- **Dynamic Content Loading**: Data is fetched dynamically from the backend, displaying universities, departments, and courses.
- **Detailed Course View**: Provides a detailed view of each course, including ratings and user reviews (dummy data).

## Prerequisites

Ensure you have the following software installed on your machine:
- [Node.js](https://nodejs.org/) (which includes npm)
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Git](https://git-scm.com/)

## Getting Started

### Backend Setup

1. **Clone the Repository**: Clone the project repository to your local machine using the following command:
    ```sh
    git clone https://github.com/your-username/course-rating-web-app.git
    cd course-rating-web-app
    ```

2. **Navigate to Backend Folder**: 
    ```sh
    cd backend
    ```

3. **Restore .NET Packages**: Restore the necessary .NET packages.
    ```sh
    dotnet restore
    ```

4. **Run the Backend**: Start the backend server.
    ```sh
    dotnet run
    ```
   The backend server should now be running at `http://localhost:5151`.

### Frontend Setup

1. **Navigate to Frontend Folder**:
    ```sh
    cd ../frontend
    ```

2. **Install Node Packages**: Install the necessary Node.js packages.
    ```sh
    npm install
    ```

3. **Run the Frontend**: Start the frontend development server.
    ```sh
    npm run dev
    ```
   The frontend should now be running at `http://localhost:5173`.

## Usage

### Viewing Universities
- **Landing Page**: The home page displays a list of universities. You can search for universities using the search bar.

### Viewing Departments
- **University Page**: Click on a university to view its departments. The departments page lists all departments for the selected university.

### Viewing Courses
- **Department Page**: Click on a department to view its courses. The courses page lists all courses for the selected department, along with course ratings and detailed descriptions.

## Project Highlights

- **Dark/Light Mode Switching**: Automatically switches themes based on the user's system preferences.
- **Dynamic Data Loading**: Efficiently fetches and displays data for universities, departments, and courses.
- **User-Friendly Interface**: Provides a clean and responsive UI that works seamlessly across devices.

## Future Enhancements

- **User Ratings**: Implement functionality to allow users to rate and review courses.
- **Course Details**: Provide more detailed information about each course, including prerequisites, credits, etc.
- **User Authentication**: Add user authentication and authorization to manage ratings and reviews.

## Conclusion

This Course Rating Web App demonstrates the use of modern web development technologies to create a responsive and user-friendly application. The project showcases the integration of a React frontend with a .NET backend, leveraging advanced features such as theme switching and dynamic data loading.

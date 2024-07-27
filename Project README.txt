
Overview
This project is a web application with a backend API built using Node.js and Express, and a frontend application built with React. The backend handles data management with MongoDB, while the frontend presents various charts and insights based on the data provided by the backend.

Table of Contents
Backend
Dependencies
Installation
Commands
File Descriptions
Frontend
Dependencies
Installation
Commands
File Descriptions
Running the Project
Backend
Dependencies
The backend uses the following dependencies:

Express: A web framework for Node.js that simplifies routing and handling HTTP requests.
Mongoose: An object modeling tool for MongoDB and Node.js, which provides a schema-based solution to model data.
Body-Parser: Middleware to parse incoming request bodies and make them available under req.body.
Cors: Middleware to enable Cross-Origin Resource Sharing, allowing the frontend to communicate with the backend.
Installation
To install the backend dependencies, navigate to the backend directory and run:

bash
Copy code
npm install
Commands
Start the server: Runs the backend server on the specified port.
bash
Copy code
npm start
File Descriptions
server.js: The entry point for the backend application. Sets up Express, connects to MongoDB, and configures routes.
routes/datas.js: Defines routes for fetching data from the MongoDB database. Includes endpoints for retrieving all data, distinct values of a filter, and filtered data based on specific criteria.
config.js: Contains configuration details such as the MongoDB connection URI.
Frontend
Dependencies
The frontend uses the following dependencies:

React: A library for building user interfaces with components.
React-DOM: Provides DOM-specific methods that can be used with React.
CSS Modules: For applying styles to React components in a modular fashion.
Installation
To install the frontend dependencies, navigate to the frontend directory and run:

bash
Copy code
npm install
Commands
Start the development server: Runs the frontend development server, providing hot-reloading and live updates.
bash
Copy code
npm start
File Descriptions
App.js: The main component that includes the Sidebar and Content components, serving as the root of the application’s component tree.
Main.js: A component responsible for rendering various chart components within a structured layout.
Running the Project
To run the project, you need to start both the backend server and the frontend development server:

Backend:

Navigate to the backend directory.
Install dependencies: npm install
Start the server: npm start
Frontend:

Navigate to the frontend directory.
Install dependencies: npm install
Start the development server: npm start
Make sure MongoDB is running and accessible via the URI specified in config.js before starting the backend server.
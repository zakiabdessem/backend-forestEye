<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Technology

this project was developed using NestJS due to its robust architecture and versatility in building efficient, reliable, and scalable server-side applications. NestJS's comprehensive documentation and strong TypeScript support streamline development, ensuring a maintainable and secure codebase.

# ForestGuard API Documentation

Welcome to the ForestGuard API! This API is the backbone of our web application, designed to enhance forest safety through real-time fire detection using the advanced YOLO (You Only Look Once) object detection algorithm. It enables seamless integration between our web application and the YOLO-based fire detection system. The API's main functions include processing image uploads, analyzing live camera feeds for fire detection, and communicating with the YOLO detection service.

## Prerequisites

Before you start, make sure you have the following installed:

- Node.js (version 20.10.x)
- npm (version 10.5.x)
- MongoDB (optional, if your API uses a database for storing detection logs or user data)

## Getting Started

Follow these steps to set up the project:

### 1. Clone the Repository

Clone the ForestGuard API repository to your local machine:

```
git clone https://github.com/zakiabdessem/backend-forestEye
```

### 2. Navigate to the Project Folder

Change directory to the project folder:

```
cd backend-forestEye
```

### 3. Install Dependencies

Install the necessary Node.js packages:

```
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root of your project and populate it with the necessary environment variables:

```
PORT=8080
NODE_ENV="development" or "production"
MONGO_URI=mongodb://<your_mongodb_url>
COOKIE_URL="http://localhost:3000" //This will be for cookie settings
GOOGLE_CLIENT_ID= //Get from google cloud api
SECRET=<your_jwt_secret>
```

### 5. Start the Server

Launch the ForestGuard API server:

```
npm run start:dev
```

Your API will now be running, accessible via the configured port (default: `http://localhost:8080`).

## Main Use Cases

The ForestGuard API is designed for the following primary functionalities:

- **Fire Detection in Images**: Users can upload images manually through the web application. The API processes these uploads and uses the YOLO object detection algorithm to identify potential fires.
- **Live Camera Feed Analysis**: The API can connect to live camera feeds, analyze the incoming video stream in real-time, and detect any signs of fire, enhancing forest safety through early detection.
- **Integration with Detection Service**: Serves as an intermediary between the web application and the YOLO-based fire detection service, managing requests and responses for fire detection.
- **Storing Detection Logs**: Save detection logs or user data in MongoDB for historical analysis and future reference.

## Web Application Integration

For integrating the fire detection feature in your web application, send a request with an image upload or live camera feed URL to the API. The API processes the request using the YOLO detection service and returns the detection results. The application can then display these results to the user for immediate action.

Enjoy building and enhancing forest safety experiences with the ForestGuard API!

## Encryption and Decryption

In this project, we employ a combination of JWT (JSON Web Tokens) and RSA encryption to secure user data and ensure its integrity throughout the authentication process. This multi-layered approach to security leverages the strengths of both symmetric and asymmetric encryption methods to provide a robust defense against unauthorized data access and manipulation.

<img src="https://github.com/user-attachments/assets/9545cd1d-6092-4cab-a7ce-7f484c4f82a5" alt="logo" width="130"/>

# Let's get Quizzical!

<details>
<summary><h2><strong>Table of Contents</strong></h2></summary>
  
  - [About the project](#about-the-project)
  - [Features](#features)
  - [Built with](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
  - [Usage](#usage)
  - [Contributors](#contributors)
  
</details>

## About the project

Quizzical is a quiz game that lets users choose from various categories and difficulty levels, then play a maximum 10-question challenge. 

 ## Tech Stack 🚀

This project is built using the MERN stack with a focus on type safety and scalable architecture:

## Frontend:

**React** (Functional Components, Hooks, Context API)

**TypeScript** – Provides static typing for predictable and bug-free UI development.

**Axios** – A promise-based HTTP client for making clean, interceptable API requests to the backend.

**React** Router Dom – Handles client-side routing and protected navigation.

### Backend:

**Node.js** & **Express.js** – Robust server-side logic and RESTful API endpoints.

**TypeScript** (Server-side) – Ensures data structures are consistent from the database to the client.

**JSON Web Tokens (JWT)** – Secure authentication and authorization.

### Database:

**MongoDB** & **Mongoose** – **NoSQL** database with schema-based modeling.

The entire application is containerized using **Docker Compose**, enabling seamless **deployment** and **scalability**.

This is the home page:

  <img width="773" alt="home" src="https://github.com/user-attachments/assets/06030c77-b455-40e1-87fa-5493201a2a68" />


## Features

- **User authentication and authorization**
- Quiz generation based on **selected category and difficulty**
- **Score tracking**
- Profile **update** and account **deletion**
- **Dockerized setup** for easy local development

## Built with

- **Backend:**  
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)  
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  
  [![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]([https://nodejs.org/](https://www.typescriptlang.org/))

  


- **Frontend:**  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)  
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  
  [![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]([https://nodejs.org/](https://www.typescriptlang.org/))


- **Database:**  
  [![MongoDB](https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

- **Containerization:**  
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)  
  [![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://www.nginx.com/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Install and run [Docker Desktop](https://www.docker.com/)

### Installation Steps

1. **Clone the repository**:
   ```sh
   git clone https://github.com/CodecoolGlobal/freestyle-mern-project-react-macesz
   ```

2. Configure **environment variables**
   
   To manage sensitive configuration details securely, create a `.env` file in the root directory of the project.
   An `example.env` file is provided as a template — copy its contents into the new .env file and update the values with your own credentials (MongoDB connection URI and       JWT Secret Key).
   
3. **Start the application**
   
    You can start the app by entering the following command into your terminal:
     ```sh
     docker compose up --build
     ```
     This will:

       - Start the Express.js backend
       - Start the React frontend
       - Start the MongoDB database
       - Populate the database with the questions and answers

4. **Access the Application**

   Open your browser and visit:
   http://localhost:8080

5. **Stop the application**
   
   Press `Ctrl + C` in your terminal.
   
   To **remove the containers**, enter the following command into your terminal:
   ```sh
   docker-compose down
   ```
   
## Usage

1. **Register** a new account and **sign in**.

2. Click **Play** to start a new game.

3. Select the **category, difficulty level** and **number of questions** from the pop-up menu.

4. Click **Play** again to begin the quiz! Good luck!
    
    <img width="773" alt="game" src="https://github.com/user-attachments/assets/60aaecb8-959f-4199-937b-1839843b3829" />


5. After finishing, you can start another quiz anytime by clicking **Play**.

6. Go to your **Profile** page to:
    - View or update your profile
    - Delete your account if needed

## Contributors

| Name          | GitHub Profile |
|--------------|---------------|
| Éva Gömbös-Jeczuska  | [Vica1921](https://github.com/Vica1921) |
| Mónika Marsó | [MonikaMarso](https://github.com/MarsoMonika) |
| Kata Sugár | [KataSugar](https://github.com/KataSugar) |
| Orsolya Szabó | [macesz/Orshi](https://github.com/macesz) |

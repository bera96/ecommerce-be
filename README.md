# Micro Frontend E-Commerce Application

This project is a micro frontend e-commerce application developed using Module Federation. The project consists of multiple independent frontend applications and a backend service.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Running the Application](#running-the-application)

## Technologies

### Frontend
- **Core Application**: Vite, React, TypeScript
- **Auth Application**: Vite, React, TypeScript
- **Products Application**: Vite, React, TypeScript
- **Cart Application**: Vite, React, TypeScript
- **Order Application**: Vite, React, TypeScript
- **Shared Libraries**: 
  - Redux Toolkit (State Management)
  - React Router (Routing)
  - Tailwind CSS (Styling)
  - i18next (Internationalization)
  - vite-plugin-federation (Micro Frontend)

### Backend
- **Framework**: NestJS
- **Database**: MongoDB
- **Authentication**: JWT
- **API Documentation**: Swagger

### DevOps
- **Containerization**: Docker, Docker Compose
- **Version Control**: Git
- **Package Management**: npm

## Setup

To set up the project, make sure you have Docker and Docker Compose installed on your machine. Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
``` 

## Running the Application

To run the application, execute the following command in the root directory of the project:

```bash
docker-compose up --build -d
```

This command will build the services defined in the docker-compose.yml file and start them.

The app will be running on http://localhost:4174


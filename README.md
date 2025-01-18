# Task Management API

Task Management API is a RESTful API that allows users to create, read, update, and delete tasks securely. The API is built using NodeJS (Express) and PostgresSQL and JWT for authentication.

## Features

- User can create an account & login with email and password
- Logged User can create, view, update, and delete tasks
- Only owner of the task can view, update, and delete respective tasks

## [Database Design](https://drawsql.app/teams/me-453/diagrams/task-api)

![drawSQL-image-export-2025-01-18](https://private-user-images.githubusercontent.com/34623568/404543498-85b36c4e-945f-4ccd-bfda-be36dcf36199.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzcyMTM4MjcsIm5iZiI6MTczNzIxMzUyNywicGF0aCI6Ii8zNDYyMzU2OC80MDQ1NDM0OTgtODViMzZjNGUtOTQ1Zi00Y2NkLWJmZGEtYmUzNmRjZjM2MTk5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTE4VDE1MTg0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThkNTZmNDA5MjgwYTdiNDg3NWQ5NWFhOWM3YTY1ZjczZDI2NzI1MTNhYmQ4MWRkODZkM2FmMDM0NWMxMTk4OTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.akbn8BfGTaOrP005Bihx--9fkoQRZOgv-yE5Rpmp2lw)

## How to run the project

1. Clone the repository

```bash
https://github.com/rohit1kumar/task-api.git && cd task-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in root dir and update the credentials

```bash
cp .env.example .env
```

4. Run the server

```bash
npm start
```

### Deployed URL [https://task-api-iujt.onrender.com](https://task-api-iujt.onrender.com)

### [Postman collection](/tasks_api.postman_collection.json) is given, import it and use to try endpoints

## API Endpoints

### Auth

- POST `/api/v1/auth/register` - Register a new user
- POST `/api/v1/auth/login` - Login user

### Tasks

- POST `/api/v1/tasks` - Create a new task
- GET `/api/v1/tasks` - Get all tasks of logged in user
- PATCH `/api/v1/tasks/:id` - Update a task
- DELETE `/api/v1/tasks/:id` - Delete a task

### Health check

- GET `/health` - Check server health

# Task Management API

Task Management API is a RESTful API that allows users to create, read, update, and delete tasks securely. The API is built using NodeJS (Express) and PostgresSQL and JWT for authentication.

## Features

- User can create an account & login with email and password
- Logged User can create, view, update, and delete tasks
- Only owner of the task can view, update, and delete respective tasks

## [Database Design](https://drawsql.app/teams/me-453/diagrams/task-api)
![drawSQL-image-export-2025-01-18](https://github.com/user-attachments/assets/b31ee45c-07d6-49e5-8289-6ef625998830)


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

4. Run migrations (make sure database `task_db` exist after step 3)
```bash
npm run db:migrate
```

5. Run the server

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

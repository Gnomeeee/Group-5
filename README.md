# Group-5 API

A REST API for managing student records, with JWT-based authentication and interactive Swagger documentation.

## Tech Stack

- **Node.js** + **Express 5** — server and routing
- **PostgreSQL** (`pg`) — database
- **JWT** (`jsonwebtoken`) — authentication tokens
- **bcrypt** — password hashing
- **Swagger** (`swagger-jsdoc` + `swagger-ui-express`) — API documentation
- **dotenv** — environment variable management
- **nodemon** — dev auto-reload
- **supertest** — testing

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run the server

```bash
npm run dev     # development, with auto-reload
npm start        # production
```

The server runs at `http://localhost:3000` (or your configured `PORT`).

## API Documentation (Swagger)

Once the server is running, open:

```
http://localhost:3000/api-docs
```

This gives you an interactive UI to view and test every endpoint. For protected routes, click **Authorize** and paste a token as `Bearer <your_token>` (obtained from `/auth/login`).

## Authentication Flow

1. **Register** — `POST /auth/register` with `{ username, password }`. Password is hashed with bcrypt before being stored.
2. **Login** — `POST /auth/login` with the same credentials. Returns a signed JWT.
3. **Use the token** — include it on protected requests as a header:
   ```
   Authorization: Bearer <token>
   ```
4. **Logout** — `POST /auth/logout` revokes the current token (stored in a `revoked_tokens` table), so it can no longer be used even before it expires.
5. **Me** — `GET /auth/me` returns the currently authenticated user's info, based on the token.

`requireAuth` middleware handles steps 3–5: it checks the header for a valid, non-revoked token before letting the request through.

## Endpoints

### Auth (`/auth`)

| Method | Endpoint         | Auth required | Description                 |
| ------ | ---------------- | ------------- | --------------------------- |
| POST   | `/auth/register` | No            | Create a new user account   |
| POST   | `/auth/login`    | No            | Log in and receive a JWT    |
| POST   | `/auth/logout`   | Yes           | Revoke the current token    |
| GET    | `/auth/me`       | Yes           | Get the current user's info |

### Students (`/students`)

| Method | Endpoint        | Auth required | Description                |
| ------ | --------------- | ------------- | -------------------------- |
| GET    | `/students`     | Yes           | List all students          |
| GET    | `/students/:id` | Yes           | Get a single student by ID |
| POST   | `/students`     | Yes           | Create a new student       |
| PATCH  | `/students/:id` | Yes           | Update a student's fields  |
| DELETE | `/students/:id` | Yes           | Delete a student           |

All `/students` routes require a valid `Authorization: Bearer <token>` header.

## Notes

- `users` (login accounts) and `students` (roster records) are **separate, unrelated tables**. A username and a student name can look similar without being connected — there's no foreign key between them in the current schema.
- Passwords are never stored or returned in plain text.
- Revoked tokens are tracked in the database so logout takes effect immediately, even though the JWT itself remains technically valid until it expires.

## Testing

Manual endpoint testing can be done via:

- The Swagger UI (`/api-docs`)
- The `tests/requests.http` file
- `npm test` (using `supertest` for automated tests)

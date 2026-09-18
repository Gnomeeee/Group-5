# How the System Works

This is a backend-only API (no frontend). Test it with Postman or any REST client.

The system now uses **JWT authentication** — `/students` routes are locked behind a login. You can't fetch, add, edit, or delete students without a valid token first.

## The flow

**1. Register** (one-time, creates an account)
```
POST /auth/register
Body: { "username": "...", "password": "..." }
```

**2. Log in** (returns a token)
```
POST /auth/login
Body: { "username": "...", "password": "..." }
```
Response includes a `token` — copy it.

**3. Use the token on any students request**

In Postman: Authorization tab → Type: **Bearer Token** → paste the token.

```
GET    /students
GET    /students/:id
POST   /students
PATCH  /students/:id
DELETE /students/:id
```

No token → `401 Unauthorized`. Wrong or expired token → `401` as well.

**4. Log out** (invalidates the token)
```
POST /auth/logout
Authorization: Bearer <token>
```
Once logged out, that same token stops working on `/students` — a fresh login is needed to get a new one.

## Endpoint summary

| Method | Route | Token needed? |
|---|---|:---:|
| POST | `/auth/register` | No |
| POST | `/auth/login` | No |
| POST | `/auth/logout` | Yes |
| GET | `/students` | Yes |
| GET | `/students/:id` | Yes |
| POST | `/students` | Yes |
| PATCH | `/students/:id` | Yes |
| DELETE | `/students/:id` | Yes |

Register → log in → paste the token into Authorization → everything under `/students` works. Log out and the token is immediately dead.

# Finance Tracker API

Backend API for the full-stack finance tracker. It handles user signup/login,
JWT authentication, and authenticated transaction CRUD.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs password hashing
- CORS

## Setup

Install dependencies:

```bash
yarn install
```

Create an `.env` file in `ft-api`:

```env
JWT_SECRET=your_secret_key_here
```

The API currently connects to local MongoDB:

```txt
mongodb://localhost:27017/FT-DB
```

Make sure MongoDB is running before starting the server.

## Run

Development:

```bash
yarn dev
```

Production:

```bash
yarn start
```

Default server URL:

```txt
http://localhost:8000
```

## Main Files

- `server.js` - Express app setup, middleware, routes, error handling
- `config/mongodbConfig.js` - MongoDB connection
- `routers/userRouter.js` - signup, login, profile
- `routers/transactionRouter.js` - transaction CRUD
- `middlewares/authMiddleware.js` - JWT verification and `req.userInfo`
- `middlewares/errorHandlerMiddleware.js` - global error handler
- `models/user/*` - user schema/model helpers
- `models/transaction/*` - transaction schema/model helpers
- `utils/bcryptjs.js` - password hashing and compare helpers
- `utils/jwt.js` - JWT sign/verify helpers
- `rest.http` - manual API testing requests

## Auth Flow

1. User signs up with name, email, and password.
2. Password is validated and hashed with bcryptjs.
3. User logs in with email/password.
4. Server returns `accessJWT`.
5. Client sends the token in the `Authorization` header.
6. `authMiddleware` verifies the token and stores the logged-in user in:

```js
req.userInfo
```

Routes after the auth middleware can then use:

```js
const { _id } = req.userInfo;
```

## Password Rules

Signup password must include:

- minimum 5 characters
- at least 1 uppercase letter
- at least 1 special character

Valid example:

```txt
Hello!
```

## API Endpoints

### Health Check

```http
GET /
```

### Create User

```http
POST /api/v1/users
```

Body:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "Hello!"
}
```

### Login User

```http
POST /api/v1/users/login
```

Body:

```json
{
  "email": "john@example.com",
  "password": "Hello!"
}
```

Returns:

```json
{
  "status": "Success",
  "message": "Login successful",
  "user": {},
  "accessJWT": "token_here"
}
```

### Get User Profile

```http
GET /api/v1/users
```

Header:

```txt
Authorization: accessJWT
```

### Create Transaction

```http
POST /api/v1/transactions
```

Header:

```txt
Authorization: accessJWT
```

Body:

```json
{
  "type": "income",
  "title": "Salary",
  "amount": 1200,
  "tdate": "2026-06-05"
}
```

### Get Transactions

```http
GET /api/v1/transactions
```

Header:

```txt
Authorization: accessJWT
```

Returns only transactions belonging to the logged-in user.

### Edit Transaction

```http
PUT /api/v1/transactions/:id
```

Header:

```txt
Authorization: accessJWT
```

Body:

```json
{
  "type": "expenses",
  "title": "Groceries",
  "amount": 95,
  "tdate": "2026-06-05"
}
```

Only the owner of the transaction can update it.

### Delete Selected Transactions

```http
DELETE /api/v1/transactions
```

Header:

```txt
Authorization: accessJWT
```

Body:

```json
{
  "ids": ["transaction_id_1", "transaction_id_2"]
}
```

Only transactions belonging to the logged-in user are deleted.

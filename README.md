# REST API With Node, Express, TypeScript & MongoDB

A simple REST API built with Node.js using the Express framework, TypeScript, and MongoDB.

## Installation

1. Open project file
2. npm install
3. Prepare .env file and include settings:

| ENV |
|------------|
PORT="YOUR_PORT"
MONGO_URL="YOUR_URL"
SECRET="YOUR_SECRET"

4. npm run start

## API Routes

| API ROUTES | Description |
|------------|------------|
| POST /auth/register | Register a new user. |
| POST /auth/login | Login user after register. |
| GET /users | Fetches a list of all users. |
| GET /users/:id | Fetches information about a user with a specific ID. |
| POST /users | Adds a new user. |
| PUT  /users/:id | Updates information about a user with a specific ID.|
| DELETE /users/:id| Deletes a user with a specific ID.|

## Technologies Used

Node.js
Express
TypeScript
MongoDB

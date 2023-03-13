POST-IT

This is a Social Media RESTful API built with Node.js and MongoDB to create and manage social media posts and users. It uses JSON Web Tokens (JWT) for authentication and authorization.

Features
Create ,read, update and delete posts by authenticated users.
Get posts by userId and Userhandles
Create(register, login), read, update and delete users.
Get a user by their handles
Create, read, update and delete comments based on a user(s) post(s) (authenticated user)
A user does not have the ability to delete other people's comment, only theirs
Follow and unfollow users.
Authentication and authorization using JWT.
Generate random avatar as profile picture from DiceBear API

Prerequisites
Node.js 14 or higher installed on your machine.
latest version of the following
NodeJS 
ExpressJs
Mongoose
MongoDB Atlas account.
Download Postman or Thunder Client to simulate running the code as a user on the client side

Installation
Clone the repository:
git clone https://github.com/JulietYew/POST-IT.git

Install the dependencies:
cd POST-IT
npm install
Create a .env file in the root directory and set the following environment variables:

PORT=9090
DATABASE_URI= mongodb+srv://<username>:<password>@<clustername>.gzq9nld.mongodb.net/?retryWrites=true&w=majority
SECRET_JWT= your-secret-key
JWT_EXPIRES_IN = "5m"
Note: Replace your-secret-key with a secret key of your choice.

Start the server:
npm start
Usage
Authentication
To use the API, you need to obtain a JWT token by sending a POST request to /api/auth/login with a valid email and password:

SAMPLE REQUESTS AND RESPONSES
Creating a user:
Endpoint: localhost:90900/api/v1/users
POST /api/auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "mypassword"
}
If the credentials are valid, you will receive a JWT token in the response:

http
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Include the token in the Authorization header of subsequent requests:

http
Copy code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Posts
Get all posts:

http
Copy code
GET /api/posts HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Create a post:

http
Copy code
POST /api/posts HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "text": "Hello world!"
}
Get a post by ID:

http
Copy code
GET /api/posts/:id HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Update a post by ID:

http
Copy code
PUT /api/posts/:id HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "text": "Updated post"



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

RENDER LIVE URL
https://post-it-8hj9.onrender.com/api/v1/docs

SAMPLE REQUESTS AND RESPONSES
Creating a user:
Endpoint: localhost:90900/api/v1/users
POST /api/v1/users/login 
POST /api/v1/users/register 


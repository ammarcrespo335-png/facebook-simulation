
🌐 Social Media Backend – Node.js + TypeScript

A clean, modular, and scalable backend that simulates the core features of a modern social media platform.
Built with Node.js, Express, TypeScript, MongoDB, and Socket.IO, following clean architecture principles designed for real-world backend development.

🚀 Overview

This project implements essential social media functionalities, including:

🔐 Authentication & Authorization (JWT)

👤 User system (Profile, Update, Search)

📝 Posts (Create, Update, Delete)

💬 Comments System

👍 Likes System

🤝 Friend Requests

⚡ Real-Time Private Chat (Socket.IO)

🌍 Modular folder structure built for scalability

🧩 Centralized error handler + validation middleware

🧩 Features
🔐 Authentication

Register new users

Login using JWT

Password hashing using bcrypt

Protected routes using authentication middleware

👤 Users

Get your own profile

Update user info

Search for users

View other user profiles

📝 Posts

Create posts

Update your posts

Delete posts

Retrieve user posts

Attach and manage comments

Like / Unlike posts

💬 Comments

Add a comment to a post

Edit your comment

Delete your comment

👍 Likes

Like a post

Unlike a post

Prevent duplicate likes

🤝 Friend Requests

Send a friend request

Accept a friend request

Cancel a friend request

Check friendship status

⚡ Real-Time Chat (Socket.IO)

Private messages between two users

Track online users

Send & receive messages instantly

Auto disconnection handling

Real-time event logging

🏗️ Project Architecture
src/
 ├── index.ts               # Entry point
 ├── bootstrap.ts           # Express + Socket.IO setup
 ├── DB/
 │    ├── connection.ts
 │    ├── models/
 │    └── repositories/
 ├── middleware/
 │    ├── auth.ts
 │    ├── validation.ts
 │    └── errorHandler.ts
 ├── modules/
 │    ├── auth/
 │    ├── users/
 │    ├── posts/
 │    ├── comments/
 │    ├── likes/
 │    └── friends/
 ├── utils/
      ├── SuccessHandler.ts
      ├── ErrorTypes.ts
      └── helpers.ts


✨ Clean, decoupled, and production-ready architecture.

🛠 Tech Stack
Layer	Technology
Runtime	Node.js
Framework	Express.js
Language	TypeScript
Database	MongoDB + Mongoose
Real-Time	Socket.IO
Authentication	JWT
Hashing	bcrypt
Validation	express-validator
Environment	dotenv
📦 Installation
1️⃣ Clone the repository
git clone https://github.com/ammarcrespo335-png/facebook-simulation.git

2️⃣ Install dependencies
npm install

3️⃣ Create your .env file
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret

4️⃣ Run the project
npm run dev

📸 Screenshots
Dashboard	Chat System
<img src="https://github.com/user-attachments/assets/eb35d996-cf06-48ef-af79-5ab3255d6d90" width="450"/>	<img src="https://github.com/user-attachments/assets/40430115-3ec6-4386-9c83-483bf3cb1cc7" width="450"/>
🧱 Future Improvements

🔔 Notifications system

🟦 Stories module

💬 Chat history + pagination

🛠 Admin dashboard

🛡 Rate limiting & security hardening

🧪 Jest test coverage

📁 Better documentation for each module

📜 License

Open-source — free to use, modify, and learn from.


🌐 Social Media Backend – Node.js + TypeScript

A clean, modular, and scalable backend that simulates the core features of a modern social media platform.
Built with Node.js, Express, TypeScript, MongoDB, and Socket.IO, following clean architecture principles suitable for real-world backend development.


---

🚀 Overview

This backend implements essential social media functionalities:

🔐 Authentication & Authorization (JWT)

👤 User system (Profile, Update, Search)

📝 Posts (Create, Update, Delete)

💬 Comments System

👍 Likes System

🤝 Friend Requests

⚡ Real-Time Private Chat (Socket.IO)

🌍 Modular folder structure for scalability

🧩 Centralized error handling and validation middleware



---

🧩 Features

🔐 Authentication

Register new users

Login using JWT

Password hashing with bcrypt

Protected routes using authentication middleware


👤 Users

Get your own profile

Update user info

Search for users

View other user profiles


📝 Posts

Create, update, delete posts

Retrieve user posts

Attach and manage comments

Like / Unlike posts


💬 Comments

Add, edit, delete comments


👍 Likes

Like / Unlike posts

Prevent duplicate likes


🤝 Friend Requests

Send / accept / cancel friend requests

Check friendship status


⚡ Real-Time Chat (Socket.IO)

Private messaging

Online user tracking

Instant send/receive messages

Auto disconnection handling

Real-time event logging



---

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


---

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



---

📦 Installation & Run

1️⃣ Clone the repository

git clone https://github.com/ammarcrespo335-png/facebook-simulation.git

2️⃣ Install dependencies

npm install

3️⃣ Create your .env file

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret

4️⃣ Run the project in development mode

npm run start:dev


---

🧱 Future Improvements

🔔 Notifications system

🟦 Stories module

💬 Chat history + pagination

🛠 Admin dashboard

🛡 Rate limiting & security hardening

🧪 Jest test coverage

📁 Better documentation for each module



---

📜 License

Open-source — free to use, modify, and learn from.

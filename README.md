# ChatterUp

**ChatterUp** is a real-time chat application built using **Socket.IO**, **Express.js**, and **Node.js**, with a responsive frontend interface. It supports multiple users chatting simultaneously, with real-time typing indicators, online/offline status updates, and persistent chat history.

---

## 🔗 GitHub Repository

**GitHub:** [https://github.com/rwtabhii/ChatterUp.git](https://github.com/rwtabhii/ChatterUp.git)
**Developer Contact:** [devabhishekrawat@gmail.com](mailto:devabhishekrawat@gmail.com)

---

## 📁 Project Structure

```
ChatterUp/
├── frontend/
│   ├── images/              # Profile and background images
│   ├── index.html           # Main frontend HTML
│   ├── index.css            # Styling (responsive design)
│   └── index.js             # Frontend socket logic and UI events
│
├── backend/
│   ├── server.js            # Express server setup and Socket.IO logic
│   ├──.env                  #here you have to add your DB URL 
│   ├── src/                 # Source folder
│   │   ├── dbconfig/        # Database configuration
│   │   │   ├── connection.js     # MongoDB connection setup
│   │   │   └── dotenv.js         # Environment variable handling
│   │   └── userschema/      # MongoDB models
│   │       ├── chatterSchema.js     # Schema for user messages
│   │       └── onlineUserSchema.js  # Schema for tracking online users
│   └── package.json         # Project dependencies and scripts
│
└── README.md               # Project documentation
```

---

## 🚀 Features

* 🔌 **WebSocket Real-Time Chat** with Socket.IO
* 👤 **User Connection Tracking** (join/leave broadcasted to all clients)
* 💬 **Load Past Messages** from MongoDB
* 👀 **Typing Indicator** when user is typing
* ✅ **Welcome Message** for joining user
* 📱 **Responsive UI** for mobile and desktop
* 🔔 **Online User Count and List**
* 🌓 **User Profiles with Avatars and Names**

---

## ⚙️ Technologies Used

* **Frontend:** HTML, CSS, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js, Socket.IO
* **Database:** MongoDB with Mongoose
* **Other:** Dotenv, UUID, Custom Schema Design

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/rwtabhii/ChatterUp.git
cd ChatterUp
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create `.env` file

Inside `backend/` create a `.env` file:

```env
MONGO_URL=mongodb://localhost:27017/chatterup
PORT=3000
```

### 4. Start the backend server

```bash
node server.js
```

### 5. Open the frontend

Open `frontend/index.html` in your browser (use Live Server in VS Code or serve statically).

---

## 📸 Screenshots

*User joins with a prompt → Sees online users → Chats in real time → Gets feedback when others are typing.*

---

## 🛠 Future Improvements

* ✅ Authentication via JWT
* 🗂 Group Chats / Rooms
* 📱 React-based frontend
* 📥 File sharing support

---

## 📧 Author

**Abhishek Rawat**
📧 [devabhishekrawat@gmail.com](mailto:devabhishekrawat@gmail.com)
🌐 [https://github.com/rwtabhii](https://github.com/rwtabhii)

---

Feel free to ⭐ this project if you find it useful!

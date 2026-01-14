# 🚀 Project Manager Application

A full-stack web application built using **React** for the frontend and **Node.js + Express** for the backend.  
This project uses **MongoDB** as the database and implements **JWT authentication using HTTP-only cookies**.

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Cookie Parser
- CORS
- dotenv

---

## 📁 Folder Structure

# 🚀 Project Manager Application

A full-stack web application built using **React** for the frontend and **Node.js + Express** for the backend.  
This project uses **MongoDB** as the database and implements **JWT authentication using HTTP-only cookies**.

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Cookie Parser
- CORS
- dotenv

---

## 📁 Project Structure

```bash
ProjectManager/
├── Frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
└── README.md



---

## ⚙️ Prerequisites

- Node.js (v16 or above)
- MongoDB (Local or MongoDB Atlas)
- npm / yarn / bun

---

## 🔧 Backend Setup

### 1️⃣ Go to backend directory

```bash
cd Backend

2️⃣ Install dependencies
npm install


or

bun install

3️⃣ Create .env file

Create a .env file inside the backend folder and add the following:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Example:
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/projectmanager
JWT_SECRET=superSecretJwtKey


⚠️ Do NOT commit the .env file. Add it to .gitignore.

4️⃣ Start backend server
node app.js


Backend runs on:

http://localhost:3000

🎨 Frontend Setup
1️⃣ Go to frontend directory
cd Frontend

2️⃣ Install dependencies
npm install


or

bun install

3️⃣ Start frontend server
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Authentication Flow

User registers or logs in

Backend generates a JWT token

Token is stored in an HTTP-only cookie

Cookie is automatically sent with every request

Protected routes verify JWT on the backend

🔄 CORS & Cookies Configuration
Backend (Express)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

Frontend (Axios)
axios.defaults.withCredentials = true;




### 🗂 Auth APIs
|Method	| Endpoint |	Description |
POST	| `/register`	| Register user |
POST	| `/login`	| Login user |
POST	| `/logout`	| Logout user |

## 📌 API Endpoints

### 🗂 Project APIs

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/addProject` | Create a new project |
| GET | `/getProjects` | Get all projects |
| PUT | `/updateProject/:id` | Update a project by Project ID |
| DELETE | `/deleteProject/:id` | Delete a project by Project ID |

---

### ✅ Task APIs

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/addTask` | Create a new task |
| GET | `/getUserTasks/:id` | Get all tasks of a specific user |
| GET | `/getTaskByProject/:id` | Get all tasks of a specific project |
| PUT | `/updateTask/:id` | Update a task by Task ID |
| DELETE | `/deleteTask/:id` | Delete a task by Task ID |

---



🛡 Security Features

JWT stored in HTTP-only cookies

Environment variables for secrets

Password hashing with bcrypt

MongoDB ObjectId validation

🚀 Future Improvements

Role-based access control

Refresh tokens

Deployment to production


👨‍💻 Author

Arpit Khandelwal
Full Stack Developer




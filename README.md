# ⚡ TrackIt — Interview Prep Tracker

> Track every problem you solve, build unstoppable streaks, and land your dream job.

A full-stack web app to help engineers prepare for product-based company interviews by logging solved problems, tracking daily streaks, and visualising progress topic-by-topic — with a built-in curated sheet of the **Top 50 must-know DSA problems**.

---

## 🚀 Features

- **Problem Logging** — Log LeetCode / GFG problems with difficulty, platform, and topic tags
- **Streak Tracking** — Current & longest streak; resets if you miss a day (accountability!)
- **Topic Progress** — Visual progress bars for every DSA topic
- **Top 50 DSA Sheet** — Curated, filterable reference list with direct links, difficulty, and priority ratings
- **Dark / Light Mode** — Persistent theme toggle
- **JWT Authentication** — Secure login & registration with hashed passwords
- **Responsive UI** — Works on desktop and mobile

---

## 🖼️ Screenshots

| Login | Dashboard | DSA Sheet |
|---|---|---|
| Split-screen marketing panel + form | Gradient hero, stat cards, activity feed | Filterable table with 50 problems |

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | React 19, Vite, React Router v7, Lucide Icons |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT + bcrypt |
| **Styling** | Pure CSS (custom design system, dark mode) |

---

## 📁 Project Structure

```
interview-prep-tracker/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification
│   ├── models/
│   │   ├── Problem.js
│   │   ├── Topic.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js             # Register / Login
│   │   ├── problems.js         # CRUD + streak logic
│   │   ├── topics.js           # Topic progress
│   │   └── user.js             # Profile & stats
│   └── server.js
└── frontend/
    └── src/
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── DSASheet.jsx    # Top 50 DSA reference
        │   ├── Problems.jsx
        │   ├── Topics.jsx
        │   ├── TopicDetail.jsx
        │   ├── Profile.jsx
        │   ├── Login.jsx
        │   └── Register.jsx
        ├── components/
        │   └── Sidebar.jsx
        ├── context/
        │   └── AuthContext.jsx
        └── index.css           # Full design system
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interview-prep-tracker.git
cd interview-prep-tracker
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interview-prep
JWT_SECRET=your_super_secret_key_here
```

Start the backend server:

```bash
npm run dev      # development (nodemon)
# or
npm start        # production
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The app will be running at **http://localhost:5173**

> Make sure the backend is running on port `5000` (or update `frontend/src/utils/api.js` to match).

---

## 📚 Top 50 DSA Sheet

The built-in DSA Sheet covers **11 topics** curated for product-based company interviews:

| Topic | Problems |
|---|---|
| Arrays | 7 |
| Strings | 5 |
| Linked Lists | 5 |
| Stack | 4 |
| Queue | 1 |
| Trees | 6 |
| Graphs | 5 |
| Dynamic Programming | 7 |
| Backtracking | 3 |
| Greedy | 3 |
| Binary Search | 4 |

Each problem includes difficulty (Easy / Medium / Hard), interview priority (High / Medium / Low), and a direct link to LeetCode or GeeksforGeeks.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

> Built with ❤️ to help engineers crack their dream interviews.

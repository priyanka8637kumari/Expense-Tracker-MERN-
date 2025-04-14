# 💰 MoneyMate

**MoneyMate** is a full-stack expense tracker application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It helps users securely log in, view their transaction history, add new transactions, and delete existing ones — all in a clean, intuitive interface.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: js-token


## 🛠️ Setup Instructions

### 1. Clone the Repository and change directory

```bash
git clone https://github.com/priyanka8637kumari/Expense-Tracker-MERN-.git

cd Expense-Tracker-MERN-
```

### 2. Backend 
  #### setting up backend

```bash
cd backend

npm install
```
  #### create .env file

```bash
PORT=5001

MONGODB_URI=mongodb://localhost:27017/expense-tracker-2
```
  #### Start the server
  ```bash
npm start
```

### 3. Frontend
  #### setting up frontend

```bash
cd frontend

npm install
```
  #### create .env file

```bash
VITE_API_BASE_URL=http://localhost:5001/api
```  

  #### Start the server
  ```bash
npm run dev
```
Now visit: http://localhost:5173





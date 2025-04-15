# 💰 MoneyMate

**MoneyMate** is a full-stack expense tracker application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It helps users securely log in, view their transaction history, add new transactions, and delete existing ones — all in a clean, intuitive interface.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: js-token

## Features

- Add, edit, and delete transactions.
- View income and expense summaries.
- Visualize financial data through charts.
- Accessible (A11y) and optimized for screen readers.
- Secure data handling.
- Analytics tracking for user interactions.


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



# ♿ A11y and SEO
 ## Accessibility and SEO at Moneymate website:
- I have used **semantic html** to define proper structure
- Added **ARIA attributes** and provided alternative text for images with alt attribute
- Ensured **keyboard navigation** and provided visible **focus indicators** (focus:outline-none focus:ring-2 focus:ring-orange-500)
- Provided **label** elements for form inputs to make accessible forms
- Used **responsive design** to adapt website to different screen sizes
- Added **meta description** for search engines: <meta name="description" content="Track your income and expenses effortlessly with our Expense Tracker app. Manage your finances with ease." />
- Meets WCAG 2.1 AA standards for color contrast


# 📊 Tracking
 ## Tracking at Moneymate website:
 
I have used **Google Analytics** for tracking. I am **tracking frontend** for **page views** and **form submission**. I am using **react-ga4** to add GA to my website. 
### Why: 

Since I have built a React **Single Page App** (SPA) using React Router, react-ga4 is a better choice. Because react-ga4 helps track page views on route changes.
Let’s say if a user goes from /login to /home: without react-ga4 no page view is tracked, but with react-ga4, I can send a pageview manually when the route changes.

### Privacy:

Tracking is implemented in compliance with **GDPR** and other privacy regulations. No personally identifiable information (PII) is collected.


# 🔐 Security




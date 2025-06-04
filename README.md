 🧑‍💻 User Profile App

A full-stack app that aggregates a user profile using a single **username**, pulling data from:

- [JSONPlaceholder](https://jsonplaceholder.typicode.com) (mock user info)
- [GitHub API](https://api.github.com) (developer info)

Secured with JWT authentication.


** 🛠️ Tech Stack**

- **Frontend**: React + Tailwind CSS (via Vite)
- **Backend**: Node.js + Express
- **Auth**: JWT (JSON Web Token)



****⚙️ Full Installation (Frontend + Backend)**

**📦 Requirements****

- Node.js (v16+)
- npm (v8+)
- Git


**🧱 Project Structure**
user-profile-app/
├── client/               # Frontend (React + Tailwind)
│   └── src/
│       └── ProfilePage.jsx
├── server/               # Backend (Express)
│   ├── routes/
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   └── app.js
├── README.md


** 📁 Clone Project**

git clone https://github.com/your-username/user-profile-aggregator.git
cd user-profile-aggregator

cd server
npm install

Create .env file inside /server:
env
PORT=5000
JWT_SECRET=your_jwt_secret_here
**To start server: nodemon app.js**

**💻 Frontend Setup (/client)**
Open a new terminal window/tab:
cd client
npm install
npm start


**🔍 How It Works**
User inputs a username (must exist on both GitHub & JSONPlaceholder)
App fetches:
Personal info from JSONPlaceholder
GitHub bio, avatar, repo stats

JWT is used to authorize the API call
Aggregated profile is displayed in the UI

**🧪 Sample Usernames**
Use these to test (they exist on both platforms):
Bret
Antonette
Samantha
Delphine (check GitHub match)


**Sample Response**
{
  "username": "Samantha",
  "name": "Clementine Bauch",
  "email": "Nathan@yesenia.net",
  "role": "developer",
  "city": "McKenziehaven",
  "companyName": "Romaguera-Jacobson",
  "github": {
    "avatarUrl": "https://avatars.githubusercontent.com/u/31223891?v=4",
    "profile": "https://github.com/samantha",
    "bio": null,
    "publicRepos": 16
  }
}


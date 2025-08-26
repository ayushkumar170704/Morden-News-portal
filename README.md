# 📰 Modern News Portal

A **modern, responsive news portal** built with the latest web development technologies, providing real-time news updates and a seamless user experience.

---

## 🚀 Features

- **Responsive Design** – Optimized for desktop, tablet, and mobile devices.
- **Live News Updates** – Pulls articles from trusted sources via APIs.
- **Category Filtering** – Browse by Politics, Sports, Technology, Entertainment, etc.
- **Powerful Search** – Find news articles using keywords.
- **User Authentication** – Secure login & registration.
- **Article Bookmarking** – Save favorite articles for later.
- **Social Media Sharing** – Share articles on platforms like Twitter & Facebook.
- **Dark / Light Mode** – Toggle themes for personal preference.
- **Admin Panel** – Manage content and monitor activity.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap or Tailwind CSS
- jQuery (DOM manipulation)

**Backend:**
- Node.js, Express.js
- MongoDB / MySQL
- JWT Authentication
- Multer (file uploads)

**APIs:**
- **News API** (for fetching news content)
- **Social Media APIs** (for article sharing)

---

## 📦 Installation

### 1. Clone the Repository
git clone https://github.com/yourusername/modern-news-portal.git
cd modern-news-portal

text

### 2. Install Dependencies
npm install

text

### 3. Create Environment File
In the project root, create `.env`:
PORT=3000
DB_CONNECTION_STRING=your_database_connection_string
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key

text

### 4. Setup Database
- **For MongoDB**
npm run db:seed

text
- **For MySQL**
npm run migrate

text

### 5. Run the Development Server
npm run dev

text
Your app will be running at:  
`http://localhost:3000`

---

## 📂 Project Structure
modern-news-portal/
│
├── public/ # Static files (CSS, JS, images)
├── src/ # App source code
│ ├── components/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── middleware/
├── config/ # Configurations
├── tests/ # Unit and integration tests
├── .env.example
├── package.json
├── server.js
└── README.md

text

---

## 🎯 Usage

**For Users:**
1. Browse categories and read latest news.
2. Search for articles using keywords.
3. Sign up to bookmark articles.
4. Toggle between dark and light mode.

**For Admins:**
1. Access `/admin` dashboard.
2. Add, edit, or delete articles.
3. Manage categories and monitor user activity.

---

## 🧪 Testing
Run tests:
npm test

text
Run with coverage:
npm run test:coverage

text

---

## 📡 API Endpoints

**News Endpoints**
- `GET /api/news` → Fetch all articles
- `GET /api/news/:id` → Fetch specific article
- `GET /api/news/category/:category` → Filter by category
- `POST /api/news/search` → Search articles

**User Endpoints**
- `POST /api/auth/register` → Create account
- `POST /api/auth/login` → Login
- `GET /api/user/bookmarks` → Get bookmarked articles
- `POST /api/user/bookmark/:id` → Save an article

---
## 🤝 ScreenShots

<img width="1920" height="1080" alt="Screenshot (24)" src="https://github.com/user-attachments/assets/8100164f-f190-4e97-8e27-1ac6a3ad05d2" />

<img width="1920" height="1080" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/e06c5711-e603-4580-9346-259c347476eb" />

<img width="1920" height="1080" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/dc09844f-06a1-4c04-83fd-4736da6efec9" />

<img width="1920" height="1080" alt="Screenshot (29)" src="https://github.com/user-attachments/assets/e2788671-fb4b-40aa-85d0-4b339856a921" />
## 🤝 Contributing![Uploading Screenshot (21).png…]()
![Uploading Screenshot (23).png…]()
<img width="1920" height="1080" alt="Screenshot (29)" src="https://github.com/user-attachments/assets/0ffe8dd3-577d-48c2-99e7-469b503976ba" />
![Uploading Screenshot (29).png…]()
<img width="1920" height="1080" alt="Screenshot (28)" src="https://github.com/user-attachments/assets/640c37aa-489f-4353-bf2d-a4ec530bf480" />


1. Fork the repo.
2. Create a feature branch:
git checkout -b feature/your-feature<img width="1920" height="1080" alt="Screenshot (27)" src="https://github.com/user-attachments/assets/87cfcf96-1b99-44d5-af16-3f93c93001cc" />
<img width="1920" height="1080" alt="Screenshot (22)" src="https://github.com/user-attachments/assets/8681f6cc-3fd3-4ab0-acd9-2ab2735a55ff" />


text
3. Commit changes:
git commit -m "Add feature"

text
4. Push and create a pull request.

---

## 📝 License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments
- [News API](https://newsapi.org) for the news data.
- Bootstrap / Tailwind CSS for responsive layout.
- All contributors and testers.

---

⭐ **If you like this project, please give it a star on GitHub!**

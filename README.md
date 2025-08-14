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

<img width="1920" height="1080" alt="Screenshot (21)" src="https://github.com/user-<img width="1920" height="1080" alt="Screenshot (28)" src="https://github.com/user-attachments/assets/d94e6602-6d7b-419f-8355-ba19045ec0d9" />
<img width="1920" height="1080" alt="Screenshot (27)" src="https://github.com/user-attachments/assets/2f66e061-898c-48e5-89c0-0a30a795136b" />
<img width="1920" height="1080" alt="Screenshot (27)" src="https://github.com/user-attachments/assets/ce89c938-35e3-48a0-970e-f2fb341f8922" />
<img width="1920" height="1080" alt="Screenshot (23)" src="https://github.com/user-attachments/assets/752a62ac-b5ad-401a-9d8b-e3709ddaae64" />
<img width="1920" height="1080" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/a71ee47c-7ed3-450a-a02f-8db794b6b672" />
attachments/assets/4b3ecd1b-d119-45b3-9417-70f57cf55918" />
<img width="1920" height="1080" alt="Screenshot (22)" src="https://github.com/user-attachments/assets/a5f24989-1dca-48e2-ace1-629e3b74a45a" />
<img width="1920" height="1080" alt="Screenshot (22)" src="https://github.com/user-attachments/assets/bd1632fc-0aa0-4cb4-9afb-b5b55f7a80c9" />
<img width="1920" height="1080" alt="Screenshot (23)" src="https://github.com/user-attachments/assets/3a262f24-daf6-4876-b1a1-14be9d74616f" />
<img width="1920" height="1080" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/329e0e35-ef73-4c77-b567-d886d80e8055" />
<img width="1920" height="1080" alt="Screenshot (24)" src="https://github.com/user-attachments/assets/04269251-1722-4fb8-90a0-322d86052b53" />
<img width="1920" height="1080" alt="Screenshot (24)" src="https://github.com/user-attachments/assets/871162f2-7a14-4887-a91d-e81f0d498d9a" />
<img width="1920" height="1080" alt="Screenshot (28)" src="https://github.com/user-attachments/assets/e56dcf2c-2e57-4558-b663-4dc1353c1839" /><img width="1920" height="1080" alt="Screenshot (25)" src="https://github.com/user-attachments/assets/5e662113-a8e8-4e11-b127-3c349190d5b5" />
<img width="1920" height="1080" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/f0771a87-7257-47cd-ae9f-4727311318f9" />
<img width="1920" height="1080" alt="Screenshot (24)" src="https://github.com/user-attachments/assets/8100164f-f190-4e97-8e27-1ac6a3ad05d2" />
<img width="1920" height="1080" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/d303a41c-9c7f-4e28-a541-9dabe31faaa1" />
<img width="1920" height="1080" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/0d512682-18d9-4e1d-b08e-48299e2031f1" />
<img width="1920" height="1080" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/e06c5711-e603-4580-9346-259c347476eb" />
<img width="1920" height="1080" alt="Screenshot (24)" src="https://github.com/user-attachments/assets/f76ef940-c801-4da8-bd91-becacf8d5741" />
<img width="1920" height="1080" alt="Screenshot (23)" src="https://github.com/user-attachments/assets/2b1fdce7-2f6f-4c7c-9f04-b03f8a354e41" />
<img width="1920" height="1080" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/dc09844f-06a1-4c04-83fd-4736da6efec9" />

<img width="1920" height="1080" alt="Screenshot (29)" src="https://github.com/user-attachments/assets/e2788671-fb4b-40aa-85d0-4b339856a921" />
<img width="1920" height="1080" alt="Screenshot (29)" src="https://github.com/user-attachments/assets/314277e3-7023-4d28-8eff-db4d84de9a13" />



## 🤝 Contributing![Uploading Screenshot (21).png…]()
![Uploading Screenshot (23).png…]()
<img width="1920" height="1080" alt="Screenshot (29)" src="https://github.com/user-attachments/assets/0ffe8dd3-577d-48c2-99e7-469b503976ba" />
![Uploading Screenshot (29).png…]()
<img width="1920" height="1080" alt="Screenshot (28)" src="https://github.com/user-attachments/assets/640c37aa-489f-4353-bf2d-a4ec530bf480" />
<img width="1920" height="1080" alt="Screenshot (22)" src="https://github.com/user-attachments/assets/40810a14-f158-47cc-9535-3ff57e6c2348" />
<img width="1920" height="1080" alt="Screenshot (28)" src="https://github.com/user-attachments/assets/6fd98351-42bb-4dcd-a66b-6076eb5dff69" />
<img width="1920" height="1080" alt="Screenshot (27)" src="https://github.com/user-attachments/assets/ed79d3d4-502f-497d-b649-5a27947ee4e5" />

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

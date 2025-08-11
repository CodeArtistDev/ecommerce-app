# 🛍️ eCommerce App

A modern, full-stack eCommerce platform with **React/Vite** (frontend) and **Node.js/Express/MongoDB** (backend).  
Features secure authentication, real-time cart management, an admin panel for product management, and **integrated payments via Stripe & Razorpay**.

---

## 📸 Screenshots

**Desktop View**  
![Desktop View](screenshots/DesktopViewEcom.PNG)

**Mobile View**  
![Mobile View](screenshots/MobileViewEcom.PNG)

---

## 🌐 Live Demo

- **Frontend**: [ecommerce-app-frontend](https://ecommerce-app-frontend-mu-one.vercel.app)  
- **Admin Panel**: [ecommerce-app-admin](https://ecommerce-app-admin-six-nu.vercel.app)  
- **Backend API**: [ecommerce-app-backend](https://ecommerce-app-backend-puce.vercel.app)

---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure signup & login  
- 🛒 **Dynamic Cart** – Add, update, and remove products instantly  
- 📦 **Order Tracking** – Place and track orders  
- 💳 **Stripe & Razorpay Payments** –  
  - Stripe for secure global card transactions  
  - Razorpay for UPI, wallets, and INR  
- 📱 **Responsive UI** – Optimized for mobile, tablet, and desktop  
- 🖼 **Product Image Uploads** – Powered by Multer & Cloudinary  

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- Tailwind CSS
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer for file uploads

**Payments**
- **Stripe** (international)
- **Razorpay** (India)

---

## 📂 Project Structure

```plaintext
ecommerce-app/
│
├── admin/              # Admin dashboard (React + Vite)
│   ├── src/
│   ├── package.json
│
├── backend/            # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│
├── frontend/           # Main storefront (React + Vite)
│   ├── src/
│   ├── package.json
│
└── README.md
⚡ Installation
1️⃣ Clone the repository
bash
Copy
Edit
git clone https://github.com/CodeArtistDev/ecommerce-app.git
cd ecommerce-app
2️⃣ Install dependencies
bash
Copy
Edit
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin Panel
cd ../admin
npm install
3️⃣ Environment variables
Create .env in backend:

env
Copy
Edit
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_URL=your_cloudinary_url
4️⃣ Run the app
bash
Copy
Edit
# Backend
npm run dev

# Frontend
npm run dev

# Admin Panel
npm run dev
💳 Payment Flow
User adds products to the cart and proceeds to checkout

Chooses payment gateway:

Stripe for cards (international)

Razorpay for UPI, wallets, INR payments

On payment success, order is saved and inventory updated

📌 Roadmap
 Product reviews & ratings

 Wishlist functionality

 Multi-language support

📄 License
Licensed under the MIT License.




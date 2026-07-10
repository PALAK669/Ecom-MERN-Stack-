# Trendzy - MERN E-Commerce Platform

A full-stack e-commerce platform built using the MERN stack with secure authentication, role-based access control, Razorpay payment integration, and an admin dashboard for product and order management.

🚀 Live Demo:
https://ecom-mern-stack-trendzy.onrender.com

## Features

### User Features
- User Registration & Login
- JWT Authentication
- OTP Verification via Email
- Product Search & Filtering
- Add to Cart
- Order Placement
- Order History
- Razorpay Payment Gateway
- Product Reviews & Ratings

### Admin Features
- Admin Dashboard
- Add/Edit/Delete Products
- Manage Orders
- Update Order Status
- Inventory Management

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios

### Backend
- React.js
- Redux Toolkit
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Nodemailer
- Razorpay
- Cloudinary
- Render

## Project Structure

Frontend/
├── src/
├── components/
├── pages/
└── redux/

Backend/
├── controllers/
├── models/
├── routes/
├── middleware/
└── config/


## Installation

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```
## Environment Variables

Create a `.env`  file in Backend:

```env
MONGO_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

## Author

Palak Mehta

GitHub: https://github.com/PALAK669

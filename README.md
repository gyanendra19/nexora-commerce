# 🛍️ Nexora Commerce

A simple MERN stack e-commerce application that allows users to browse products, add them to a cart, and proceed to checkout.

---

## 🚀 Features

- Product Listing
- Cart Management
- Checkout Page
- Toast Notifications
- RESTful APIs
- React Hooks State Management

---

## 🏗️ Tech Stack

| Layer         | Technology         |
| ------------- | ------------------ |
| Frontend      | React (Vite)       |
| Backend       | Node.js + Express  |
| Database      | MongoDB (Mongoose) |
| Styling       | Tailwind CSS       |
| Notifications | React Toastify     |

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/nexora-commerce.git
cd nexora-commerce
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

#### Create .env

```bash
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-uri>
```

#### Run Server

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

#### Run Frontend

```bash
npm run dev
```

---

## 📡 API Endpoints

### Products

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/products     | Get all products  |
| GET    | /api/products/:id | Get product by ID |

### Cart

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | /api/cart/getCart        | Get all cart items    |
| POST   | /api/cart/addToCart      | Add item to cart      |
| DELETE | /api/cart/deleteItem/:id | Delete single item    |
| DELETE | /api/cart/deleteCart     | Delete all cart items |

### Checkout

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| POST   | /api/checkout | Mock checkout process |

---

## 🧠 How It Works

1. Fetch products from backend.
2. Add to cart → stored in MongoDB.
3. Fetch cart items and modify quantity.
4. Checkout calculates total.
5. Toasts display success/error states.

---

## ✨ Future Improvements

- JWT Authentication
- Payment Integration
- Orders History
- Dark Mode
- Redux Integration

---

## 👨‍💻 Author

**Gyanendra Verma**  
📧 gyanendrav416@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/gyanendra-verma-549170221/)

---

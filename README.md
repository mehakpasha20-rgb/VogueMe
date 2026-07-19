# VogueMe - AI-Inspired Fashion E-Commerce Platform

VogueMe is a fashion e-commerce platform that helps users discover matching dresses and jewellery using intelligent recommendation logic. The system includes color-based matching, mood-based shopping, outfit generation, virtual jewellery try-on, and an AI fashion assistant chatbot.

## 🚀 Features

### Core Features
- **Match Me Feature** - Find matching jewellery for any selected dress using rule-based recommendations
- **Virtual Jewellery Try-On** - Upload your photo and preview jewellery with drag & resize functionality
- **Complete Look Builder** - Generate complete fashion combinations with dress, necklace, and earrings
- **AI Fashion Assistant** - Get personalized fashion advice using OpenAI API
- **Mood-Based Shopping** - Shop by occasion (Casual, Party, Wedding, Formal, Traditional)
- **Product Recommendations** - Rule-based recommendation engine for related products

### Standard E-Commerce Features
- User Authentication (Login/Signup)
- Product Listing with Filters and Sorting
- Product Detail Pages
- Shopping Cart
- Wishlist
- Order Management
- User Profile with Order History

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

### AI Integration
- OpenAI API (for AI Fashion Assistant)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running)
- OpenAI API Key (optional, for AI Assistant)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd VogueMe
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vogueme
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

Seed the database with sample data:
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
VogueMe/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── server.js        # Main server file
│   ├── seed.js          # Database seeder
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context (Auth)
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main App component
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🎯 Key Features Implementation

### Match Me Feature
- Rule-based recommendation system
- Matches jewellery color to dress color
- Suggests necklaces, earrings, and bracelets
- No AI required

### Virtual Try-On
- HTML Canvas for image overlay
- Drag and resize jewellery on uploaded photos
- Download preview functionality
- Supports necklaces, earrings, and rings

### Complete Look Builder
- Random outfit generation from database
- Predefined outfit collections
- Displays dress, necklace, and earrings
- No AI required

### AI Fashion Assistant
- OpenAI GPT-3.5 integration
- Provides fashion advice and recommendations
- Answer questions about styling and matching
- Requires OpenAI API key

## 🗄️ Database Models

### Users
- id, name, email, password

### Dresses
- id, name, category, color, price, image, description

### Jewellery
- id, name, category, color, price, image, description

### Outfit Collections
- id, dress_id, necklace_id, earring_id, name, mood

### Wishlist
- id, user_id, product_id, product_type

### Cart
- id, user_id, product_id, product_type, quantity

### Orders
- id, user_id, items, total_amount, shipping_details, status

## 🔧 API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login

### Products
- GET `/api/dresses` - Get all dresses
- GET `/api/dresses/:id` - Get dress by ID
- GET `/api/dresses/:id/matching-jewellery` - Get matching jewellery
- GET `/api/jewellery` - Get all jewellery
- GET `/api/jewellery/:id` - Get jewellery by ID

### Outfits
- GET `/api/outfits` - Get all outfits
- GET `/api/outfits/generate/random` - Generate random outfit

### Cart
- GET `/api/cart` - Get user's cart
- POST `/api/cart` - Add to cart
- PUT `/api/cart/:id` - Update cart item
- DELETE `/api/cart/:id` - Remove from cart

### Wishlist
- GET `/api/wishlist` - Get user's wishlist
- POST `/api/wishlist` - Add to wishlist
- DELETE `/api/wishlist/:id` - Remove from wishlist

### Orders
- GET `/api/orders` - Get user's orders
- POST `/api/orders` - Create order

### AI Assistant
- POST `/api/ai/chat` - Chat with AI assistant

## 🌐 Pages

1. **Home** - Hero banner, featured products, features showcase
2. **Login/Signup** - User authentication
3. **Product Listing** - Browse dresses and jewellery with filters
4. **Product Detail** - View product details and add to cart/wishlist
5. **Match Me** - Find matching jewellery for dresses
6. **Mood Shopping** - Shop by occasion/mood
7. **Outfit Builder** - Generate complete looks
8. **Virtual Try-On** - Preview jewellery on uploaded photos
9. **AI Assistant** - Chat with AI fashion advisor
10. **Cart** - Shopping cart management
11. **Checkout** - Order placement
12. **Wishlist** - Saved items
13. **Profile** - User profile and order history

## 🎨 Color Scheme

- Primary: #E91E63 (Pink)
- Secondary: #9C27B0 (Purple)
- Accent: #FF5722 (Orange)

## 📝 Notes

- This is a final year project demo
- No actual payment gateway integration
- AI Assistant requires OpenAI API key to function
- Virtual Try-On uses simple image overlay (no face detection)
- All recommendations are rule-based (no ML models)

## 🚀 Future Enhancements

- Face detection for automatic jewellery placement
- ML-based recommendation system
- Payment gateway integration
- Advanced AI features
- Mobile app development

## 👥 Authors

- Final Year Project

## 📄 License

ISC

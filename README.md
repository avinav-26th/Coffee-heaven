# ☕ Coffee Heaven

A full-stack, modern e-commerce web application for a fictional cafe chain. This project is built with the latest Next.js 14 (App Router) and features a complete, mobile-first OTP authentication system, a database-synced shopping cart, a full order and review system, and a Razorpay payment integration. The entire application has been highly optimized for performance using modern web development patterns, and is also fully responsive.

**[Live Demo](https://coffee-heaven-rose.vercel.app/)** 

---

## ✨ Key Features

* **Mobile-First Authentication**: Secure, passwordless user login and signup using a phone number and OTP verification, powered by the Twilio Verify API.
* **Persistent & Synced Shopping Cart**:
    * For guest users, the cart is persisted in Local Storage.
    * For logged-in users, the cart is seamlessly synced with the database, making it available across devices and sessions.
* **Full E-commerce Flow**:
    * Browse a dynamic menu with real-time star ratings.
    * Add/remove/update items in the cart.
    * Complete checkout process with Razorpay integration (Test Mode).
    * View a detailed order history page.
    * "Repeat Order" functionality to quickly re-add items from a past purchase.
* **Interactive Review System**:
    * Users can only review items they have purchased.
    * Submit star ratings directly from the order history page.
    * Write detailed text comments in a pop-up modal.
    * Average ratings and review counts are displayed on the main menu.
    * Read detailed reviews in a popover on the menu page.
* **User Profile Management**:
    * Onboarding flow for new users to set their username.
    * "Edit Profile" modal to update username, email, and choose a custom avatar.
* **Performance Optimized**:
    * **Server-Side Rendering**: Key pages are rendered on the server for fast initial loads.
    * **React Suspense & Streaming**: Below-the-fold content is streamed in, preventing render-blocking and improving perceived performance.
    * **Lazy Loading**: All modals and non-critical components are lazy-loaded to reduce the initial JavaScript bundle size.
    * **Image Optimization**: All images are hosted on a CDN (Cloudinary) and served optimally using the Next.js `<Image>` component.

---

## 🛠️ Tech Stack

* **Framework**: **Next.js 14** (App Router)
* **Styling**: **Tailwind CSS**
* **Database**: **MongoDB** with **Mongoose**
* **Authentication**: **NextAuth.js v4**
* **State Management**: **Zustand** (for modals and cart)
* **Animations**: **Framer Motion**, **GSAP**
* **Payment Gateway**: **Razorpay**
* **OTP Service**: **Twilio Verify API**
* **Image CDN**: **Cloudinary**
* **UI Components**: Shadcn UI (for navigation menu), Lucide React (icons)
* **Forms & Validation**: Standard React state and custom validation logic

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* A MongoDB Atlas account
* A Twilio account
* A Razorpay account
* A Cloudinary account

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/coffee-heaven.git](https://github.com/your-username/coffee-heaven.git)
    cd coffee-heaven
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add the following variables. Replace the placeholder values with your actual credentials.

    ```env
    # MongoDB
    MONGODB_URI="your_mongodb_connection_string"

    # NextAuth.js
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your_super_secret_key_for_nextauth"

    # Twilio
    TWILIO_ACCOUNT_SID="your_twilio_account_sid"
    TWILIO_AUTH_TOKEN="your_twilio_auth_token"
    TWILIO_VERIFY_SERVICE_SID="your_twilio_verify_service_sid"

    # Razorpay
    RAZORPAY_KEY_ID="your_razorpay_test_key_id"
    RAZORPAY_KEY_SECRET="your_razorpay_test_key_secret"
    NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_test_key_id" # This one is exposed to the client

    # Cloudinary (Optional, if you want to use your own images)
    CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Folder Structure

The project uses the Next.js App Router paradigm for a clean and scalable structure.

```
/
├── app/              # Main application routes (pages and APIs)
│   ├── api/          # All backend API routes
│   └── (pages)/      # All frontend pages (cart, orders, etc.)
├── components/       # All reusable React components
├── lib/              # Utility functions, data, and custom hooks
├── models/           # Mongoose schemas for the database
├── public/           # Static assets
└── store/            # Zustand global state management stores
```

---

## 📝 API Endpoints

The application features a RESTful API for handling all backend logic.

| Endpoint                   | Method | Description                                    |
| -------------------------- | ------ | ---------------------------------------------- |
| `/api/auth/[...nextauth]`  | `ANY`  | Handles all NextAuth.js operations             |
| `/api/auth/otp/send`       | `POST` | Sends an OTP to a user's phone number          |
| `/api/auth/otp/verify`     | `POST` | Verifies an OTP and creates a user if new      |
| `/api/cart`                | `GET`  | Fetches the logged-in user's cart from the DB  |
| `/api/cart`                | `POST` | Saves the logged-in user's cart to the DB      |
| `/api/checkout`            | `POST` | Creates a Razorpay payment order               |
| `/api/orders`              | `GET`  | Fetches all past orders for the logged-in user |
| `/api/orders`              | `POST` | Saves a new order to the DB after payment      |
| `/api/profile`             | `PATCH`| Updates a user's profile (name, email, avatar) |
| `/api/profile/setup`       | `PATCH`| Sets up a new user's username                  |
| `/api/reviews`             | `GET`  | Fetches all reviews for a specific item        |
| `/api/reviews`             | `POST` | Submits a new review (or updates a rating)     |
| `/api/reviews/comment`     | `POST` | Adds a text comment to an existing review      |
| `/api/reviews/summary`     | `GET`  | Gets the average rating for all menu items     |
| `/api/reviews/user`        | `GET`  | Fetches all reviews left by the logged-in user |

---

## 📈 Performance Optimizations Implemented

* **Server Components**: Most pages and components are rendered on the server to minimize client-side JavaScript and improve initial load times.
* **React Suspense & Streaming**: Below-the-fold content that requires data fetching (like the menu) is streamed to the browser, preventing it from blocking the rendering of critical, above-the-fold content.
* **Lazy Loading**: All modal dialogs (`AuthModal`, `EditProfileModal`, `ReviewModal`) are lazy-loaded using `next/dynamic` to ensure their code is only downloaded when needed.
* **Efficient API Design**: Created dedicated summary endpoints (e.g., `/api/reviews/summary`) that use database aggregation to perform complex calculations efficiently, reducing the number of required network requests.

---

## 📋 Future Improvements

* **Admin Dashboard**: A separate interface for managing users, orders, and menu items.
* **Search Functionality**: Allow users to search for specific menu items.
* **Database Form Submissions**: Storing career and franchise form submissions in the database instead of sending emails.

---

# Burger House Restaurant Web App

A full-stack restaurant ordering web application built with Node.js, Express, SQLite, and Handlebars.

## Features

- Home page
- Dynamic menu loaded from SQLite
- Customer registration and login
- Password hashing with bcrypt
- Session-based authentication
- Add products to cart
- View cart total
- Place orders
- Customer order history
- Admin dashboard
- Admin order status management

## Tech Stack

- Node.js
- Express.js
- SQLite
- Handlebars
- HTML
- CSS
- JavaScript
- bcrypt
- express-session

## Project Structure

```text
restaurant-burger-house-web-app/
├── config/
│   └── restaurant.db
├── src/
│   ├── models/
│   │   ├── db.js
│   │   └── repositories/
│   │       ├── adminRepository.js
│   │       ├── cartRepository.js
│   │       ├── orderRepository.js
│   │       └── userRepository.js
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── img/
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── menuRoutes.js
│   │   └── orderRoutes.js
│   └── views/
│       ├── layouts/
│       │   └── main.handlebars
│       ├── partials/
│       │   └── header.handlebars
│       ├── adminOrders.handlebars
│       ├── cart.handlebars
│       ├── home.handlebars
│       ├── login.handlebars
│       ├── menu.handlebars
│       ├── orders.handlebars
│       └── register.handlebars
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## How To Run

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file using `.env.example`:

```env
PORT=5000
NODE_ENV=development
DB_FILE=config/restaurant.db
SESSION_SECRET=your-secret-value
```

4. Start the development server:

```bash
npm run dev
```

5. Open the app:

```text
http://localhost:5000
```

## Demo Admin Account

The app creates a demo admin account automatically:

```text
Email: admin@burgerhouse.com
Password: Admin123
```

## Main User Flow

1. Register a customer account.
2. Login.
3. Browse the menu.
4. Add products to the cart.
5. Place an order.
6. View order history.

## Admin Flow

1. Login with the admin account.
2. Open the admin dashboard.
3. View all customer orders.
4. Update order status.

## Order Statuses

- Order received
- Preparing
- Ready
- Completed

## Screenshots

### Home

![Home](screenshots/01_home.png)

### Menu

![Menu](screenshots/02_menu.png)

### Register

![Register](screenshots/03_register.png)

### Login

![Login](screenshots/04_login.png)

### Cart

![Cart](screenshots/05_cart.png)

### Order History

![Order History](screenshots/06_order_history.png)

### Admin Orders

![Admin Orders](screenshots/07_admin_orders.png)

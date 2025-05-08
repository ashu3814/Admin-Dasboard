# Restaurant Reservation System

A full-stack MERN application for restaurant table reservations with an admin dashboard.

## Features

- Dynamic and responsive restaurant website
- Table reservation system
- Admin dashboard for managing reservations
- Authentication for admin users
- Fully responsive design
- Lighthouse score 70+ for Performance, Accessibility, Best Practices and SEO

## Tech Stack

### Backend
- Node.js/Express.js
- MongoDB
- JWT Authentication
- RestAPI

### Frontend
- React.js
- React Router
- Tailwind CSS
- Framer Motion (for animations)

## Setup and Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)

### Server Setup

1. Clone the repository
```bash
git clone <repo-url>
cd restaurant-app
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Create a .env file in the server directory with the following variables
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_app
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=30d
```

4. Start the server
```bash
npm run server
```

### Client Setup

1. Install client dependencies
```bash
cd ../client
npm install
```

2. Start the client development server
```bash
npm start
```

3. For production build
```bash
npm run build
```

### Using Docker

You can also use Docker to run the entire application:

```bash
docker-compose up
```

## API Endpoints

### Public Endpoints

- **POST /api/reservations** - Create a new reservation
- **POST /api/auth/login** - Admin login

### Protected Endpoints (Requires Authentication)

- **GET /api/reservations** - Get all reservations
- **GET /api/reservations/:id** - Get a specific reservation
- **PUT /api/reservations/:id** - Update a reservation
- **DELETE /api/reservations/:id** - Delete a reservation
- **GET /api/auth/me** - Get current admin profile
- **GET /api/auth/logout** - Logout admin
- **GET /api/admin/dashboard** - Admin dashboard (super-admin only)
- **GET /api/admin/reservations** - Admin view of all reservations

## Folder Structure

```
restaurant-app/
├── client/                 # Frontend React app (will be created in next chat)
├── server/                 # Backend Express app
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Middleware functions
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   └── server.js           # Main server file
├── docker-compose.yml      # Docker configuration
├── Dockerfile              # Docker build file
└── README.md               # Project documentation
```

## Deployment

This application can be deployed using:
- Docker containers
- Heroku
- AWS
- Digital Ocean
- Any other Node.js compatible hosting

## Running Tests

```bash
# Server tests
cd server
npm test

# Client tests
cd client
npm test
```

## Lighthouse Score

To achieve a Lighthouse score of 70+ for Performance, Accessibility, Best Practices and SEO, we've implemented:

- Optimized images
- Proper semantic HTML
- Responsive design
- SEO meta tags
- Optimized bundle size

## License

MIT
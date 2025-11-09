# Campus Helper Backend 🚀

A robust REST API backend service built with Node.js and Express, providing comprehensive campus management functionality including authentication, event management, club activities, marketplace, and real-time messaging.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-5.1.0-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT Authentication**: Secure token-based authentication with access/refresh tokens
- **Role-based Access**: Different permissions for students, staff, and admins
- **Password Security**: Bcrypt hashing for secure password storage
- **Session Management**: Refresh token rotation for enhanced security

### 👥 User Management
- **User Registration**: Create student and admin accounts
- **Profile Management**: Update user information and preferences
- **Role Assignment**: Admin, student, and staff role management
- **User Authentication**: Login/logout with secure session handling

### 📅 Event Management
- **Event CRUD**: Create, read, update, and delete campus events
- **Event Details**: Comprehensive event information with scheduling
- **Access Control**: Staff/admin permissions for event management
- **Event Categories**: Organized event classification

### 🏛️ Club Management
- **Club CRUD**: Full club lifecycle management
- **Club Membership**: Student club participation tracking
- **Club Information**: Detailed club profiles and descriptions
- **Admin Oversight**: Staff/admin club creation and moderation

### 🛒 Marketplace System
- **Product Listings**: Student-to-student buying and selling
- **Product Management**: Add, edit, and remove marketplace items
- **Image Upload**: File upload support for product photos
- **Category Organization**: Product categorization for easy browsing

### 💬 Real-time Messaging
- **Club Chat**: Real-time messaging within club communities
- **Message History**: Persistent message storage and retrieval
- **User Communication**: Direct messaging between club members

### 📊 Timetable Management
- **Academic Scheduling**: Class timetable management
- **Schedule Integration**: Academic calendar synchronization
- **Student Access**: Personalized timetable viewing

### 📁 File Upload System
- **Image Upload**: Multer-based file upload for profiles and products
- **Static File Serving**: Efficient static file delivery
- **File Security**: Secure file handling and validation

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+ with ES modules
- **Framework**: Express.js 5.1.0 for REST API
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (jsonwebtoken) with bcrypt hashing
- **File Upload**: Multer for multipart form data
- **Security**: Helmet for security headers, CORS for cross-origin requests
- **Logging**: Morgan for HTTP request logging
- **Environment**: dotenv for configuration management

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher
- **npm** or **yarn**
- **PostgreSQL** database (local or cloud)
- **Git**

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd campus-helper-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create `.env` file from example:

```bash
cp .env.example .env
```

**Required environment variables:**

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration (Development)
DB_DEV_HOST=localhost
DB_DEV_USER=your_db_user
DB_DEV_PASSWORD=your_db_password
DB_DEV_DATABASE=campus_helper_dev
DB_DEV_PORT=5432

# Database Configuration (Production)
DB_HOST=your_production_host
DB_USER=your_production_user
DB_PASSWORD=your_production_password
DB_DATABASE=campus_helper_prod
DB_PORT=5432

# JWT Secrets (Generate secure random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# CORS Configuration
CORS_ORIGIN=http://localhost:8081
```

### 4. Database Setup

Ensure PostgreSQL is running and create the database:

```bash
createdb campus_helper_dev
```

### 5. Run Database Migrations

```bash
npm run seed
```

This will create tables and seed initial data.

### 6. Start Development Server

```bash
npm start
```

Visit **http://localhost:3000/api/health** to verify the server is running.

## Default Admin Credentials

After running the seed, you can login with these admin credentials:

```
Phone: +1234567890
Password: admin123
```

⚠️ **Remember to change this password in production!**

## 📁 Project Structure

```
campus-helper-backend/
├── server.js                    # Main server file with Express setup
├── package.json                 # Dependencies and scripts
├── src/
│   ├── config/                  # Configuration files
│   │   ├── corsOptions.js       # CORS configuration
│   │   └── db.config.js         # Database configuration
│   ├── controllers/             # Route controllers
│   │   ├── Auth.js             # Authentication logic
│   │   ├── User.js             # User management
│   │   ├── Event.js            # Event management
│   │   ├── Club.js             # Club management
│   │   ├── Marketplace.js      # Marketplace logic
│   │   ├── Message.js          # Messaging system
│   │   ├── Timetable.js        # Timetable management
│   │   └── Upload.js           # File upload handling
│   ├── models/                 # Sequelize models
│   │   ├── User.js             # User model
│   │   ├── Event.js            # Event model
│   │   ├── Club.js             # Club model
│   │   ├── MarketplaceItem.js  # Marketplace model
│   │   ├── Message.js          # Message model
│   │   ├── Timetable.js        # Timetable model
│   │   └── Announcement.js     # Announcement model
│   ├── routes/                 # API route definitions
│   │   ├── Auth.js             # Authentication routes
│   │   ├── User.js             # User routes
│   │   ├── Event.js            # Event routes
│   │   ├── Club.js             # Club routes
│   │   ├── Marketplace.js      # Marketplace routes
│   │   ├── Message.js          # Message routes
│   │   ├── Timetable.js        # Timetable routes
│   │   └── Upload.js           # Upload routes
│   ├── services/               # Business logic services
│   │   ├── auth.js             # Authentication utilities
│   │   └── UserServices.js     # User service functions
│   ├── seeders/                # Database seeders
│   │   └── 20250829120000-user-seeder.js
│   └── run-seeders.js          # Seeder runner
├── uploads/                    # Static file uploads directory
└── README.md                   # This file
```

## 🗄️ Database Schema

### Core Models

- **User**: Authentication and profile information
  - Fields: id, name, phone, password, role, major, rollno, refresh_token

- **Event**: Campus events and activities
  - Fields: id, title, description, date, time, location, created_by

- **Club**: Student organizations
  - Fields: id, name, description, president, contact_info, created_by

- **MarketplaceItem**: Products for sale
  - Fields: id, title, description, price, category, image_url, created_by

- **Message**: Club chat messages
  - Fields: id, content, club_id, sender_id, timestamp

- **Timetable**: Academic schedules
  - Fields: id, subject, day, time, room, instructor

- **Announcement**: Campus announcements
  - Fields: id, title, content, date, priority

### Relationships

- Users can create Events, Clubs, and MarketplaceItems
- Messages belong to Clubs and Users
- Events and Clubs have many-to-one relationship with Users

## 🔐 Authentication & Authorization

### JWT Token System

- **Access Tokens**: Short-lived (15 minutes) for API access
- **Refresh Tokens**: Long-lived (7 days) for token renewal
- **Token Rotation**: New refresh tokens issued on renewal

### User Roles

- `STUDENT`: Basic user access
- `ADMIN`: Full system access and management

### Protected Routes

- Event creation/management (Admin only)
- Club creation/management (Admin only)
- User management (Admin only)

## 📡 API Documentation

### Authentication Endpoints

```javascript
POST   /api/auth/login          // User login
POST   /api/auth/register       // User registration
POST   /api/auth/refresh        // Refresh access token
GET    /api/auth/me            // Get current user info
POST   /api/auth/logout         // User logout
```

### User Management

```javascript
GET    /api/users               // List users (Admin)
GET    /api/users/:id           // Get user details
PUT    /api/users/:id           // Update user (Admin)
DELETE /api/users/:id           // Delete user (Admin)
```

### Event Management

```javascript
GET    /api/events              // List events
POST   /api/events              // Create event (Admin)
GET    /api/events/:id          // Get event details
PUT    /api/events/:id          // Update event (Admin)
DELETE /api/events/:id          // Delete event (Admin)
```

### Club Management

```javascript
GET    /api/clubs               // List clubs
POST   /api/clubs               // Create club (Admin)
GET    /api/clubs/:id           // Get club details
PUT    /api/clubs/:id           // Update club (Admin)
DELETE /api/clubs/:id           // Delete club (Admin)
```

### Marketplace

```javascript
GET    /api/marketplace         // List products
POST   /api/marketplace         // Create product
GET    /api/marketplace/:id     // Get product details
PUT    /api/marketplace/:id     // Update product
DELETE /api/marketplace/:id     // Delete product
```

### Messaging

```javascript
GET    /api/messages/:clubId    // Get club messages
POST   /api/messages            // Send message
```

### File Upload

```javascript
POST   /api/upload/image        // Upload image file
```

## 🚀 Deployment

### Environment Variables for Production

Ensure these are set in your deployment platform:

- `NODE_ENV=production`
- `PORT=3000` (or your preferred port)
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`: Production database credentials
- `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`: Secure random strings
- `CORS_ORIGIN`: Your frontend URL

### Deploy to Production

```bash
# Set production environment
export NODE_ENV=production

# Install dependencies
npm install --production

# Start server
npm start
```

### Docker Deployment (Optional)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Development

### Available Scripts

```bash
npm start        # Start production server
npm run seed     # Run database seeders
```

### Development Workflow

1. Make changes to models/controllers/routes
2. Test with Postman or frontend app
3. Database changes automatically applied in development (alter: true)
4. For production, use proper migrations

## 📊 Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexing
- **Connection Pooling**: Sequelize connection pooling for PostgreSQL
- **File Caching**: Static file serving with Express
- **Logging**: Morgan HTTP request logging for monitoring

## 🛡️ Security Best Practices

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- CORS configuration for cross-origin requests
- Helmet security headers
- Input validation and sanitization
- SQL injection prevention via Sequelize ORM
- File upload restrictions and validation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

**Database connection failed:**
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `createdb campus_helper_dev`

**JWT token errors:**
- Verify `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` are set
- Check token expiration times

**File upload issues:**
- Ensure `uploads/` directory exists and is writable
- Check file size limits in Multer configuration

**CORS errors:**
- Verify `CORS_ORIGIN` matches your frontend URL
- Check CORS configuration in `corsOptions.js`

## 📞 Support

For help and questions:
- Open an [Issue](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- Express.js team for the robust web framework
- Sequelize team for the excellent ORM
- PostgreSQL community for the reliable database
- JWT.io for token standards

---

**Built with ❤️ to power campus connectivity**

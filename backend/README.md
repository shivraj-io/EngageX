# EngageX Backend

Production-ready REST API for EngageX - A full-stack admin panel and landing page application.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **ImageKit** - Image storage and CDN
- **Nodemailer** - Email service
- **Multer** - File upload handling

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (DB, env, ImageKit)
│   ├── controllers/     # Request handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Custom middlewares
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── validations/     # Input validation schemas
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the backend root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/engagex
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@engagex.com

# CORS
FRONTEND_URL=http://localhost:5173
```

4. **Start MongoDB**

Ensure MongoDB is running on your system.

5. **Run the server**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin profile (Protected)

### Projects
- `GET /api/projects` - Get all projects (Public)
- `GET /api/projects/:id` - Get project by ID (Public)
- `POST /api/projects` - Create project (Protected)
- `PUT /api/projects/:id` - Update project (Protected)
- `DELETE /api/projects/:id` - Delete project (Protected)

### Clients
- `GET /api/clients` - Get all clients (Public)
- `GET /api/clients/:id` - Get client by ID (Public)
- `POST /api/clients` - Create client (Protected)
- `PUT /api/clients/:id` - Update client (Protected)
- `DELETE /api/clients/:id` - Delete client (Protected)

### Contact
- `POST /api/contact` - Submit contact form (Public)
- `GET /api/contact` - Get all submissions (Protected)
- `GET /api/contact/:id` - Get submission by ID (Protected)
- `PATCH /api/contact/:id/status` - Update status (Protected)
- `DELETE /api/contact/:id` - Delete submission (Protected)

### Newsletter
- `POST /api/newsletter` - Subscribe (Public)
- `DELETE /api/newsletter/:id` - Unsubscribe (Public)
- `GET /api/newsletter` - Get all subscribers (Protected)
- `DELETE /api/newsletter/:id/permanent` - Delete subscriber (Protected)

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## 🖼️ Image Upload

Images are uploaded using **ImageKit** for projects and clients:
- Maximum file size: 5MB
- Allowed formats: JPEG, JPG, PNG, WebP
- Images are stored in ImageKit folders: `/engagex/projects` and `/engagex/clients`

## 🔧 ImageKit Setup

1. Create an account at [ImageKit.io](https://imagekit.io/)
2. Get your credentials:
   - Public Key
   - Private Key
   - URL Endpoint
3. Add them to your `.env` file

## 📧 Email Configuration

Email notifications are optional. Configure nodemailer for:
- Contact form notifications
- Newsletter welcome emails

For Gmail, use an App Password instead of your regular password.

## 🗄️ Database Models

- **Admin** - Admin authentication
- **Project** - Portfolio projects
- **Client** - Client testimonials
- **Contact** - Contact form submissions
- **Newsletter** - Email subscribers

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation with express-validator
- CORS protection
- Rate limiting ready
- Error handling middleware

## 📝 Default Admin Setup

To create an admin account, you can use MongoDB Compass or mongosh:

```javascript
use engagex;

db.admins.insertOne({
  username: "admin",
  email: "admin@engagex.com",
  password: "$2a$10$YourHashedPasswordHere",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

Or create a seed script to automate this.

## 🚨 Error Handling

All errors are handled by centralized error middleware:
- Validation errors
- Mongoose errors
- JWT errors
- Custom API errors

## 📦 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

ISC

## 👤 Author

EngageX Team

---

**Happy Coding! 🎉**

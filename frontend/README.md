# EngageX - Project & Client Management Platform

A clean, modern React frontend for managing projects and clients.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Plain CSS** - No UI libraries, custom styling

## Project Structure

```
src/
├── api/
│   ├── axiosInstance.js       # Axios configuration with interceptors
│   └── endpoints.js            # API endpoint functions
│
├── components/
│   ├── common/
│   │   ├── Navbar/             # Navigation component
│   │   ├── Footer/             # Footer component
│   │   └── Loader/             # Loading spinner
│   │
│   └── landing/
│       ├── Hero/               # Hero section
│       ├── Projects/           # Projects list
│       ├── ProjectCard/        # Project card component
│       ├── Clients/            # Clients list
│       ├── ClientCard/         # Client card component
│       ├── ContactForm/        # Contact form
│       └── Newsletter/         # Newsletter subscription
│
├── pages/
│   ├── Landing/
│   │   └── LandingPage.jsx     # Main landing page
│   │
│   └── admin/
│       ├── Login/              # Admin login
│       ├── Dashboard/          # Admin dashboard
│       ├── Projects/           # Projects management
│       ├── Clients/            # Clients management
│       ├── Contacts/           # Contact messages
│       └── Newsletter/         # Newsletter subscribers
│
├── routes/
│   ├── AppRoutes.jsx           # Application routes
│   └── ProtectedRoute.jsx      # Protected route wrapper
│
├── context/
│   └── AuthContext.jsx         # Authentication context
│
├── hooks/
│   ├── useFetch.js             # Custom fetch hook
│   └── useAuth.js              # Custom auth hook
│
├── styles/
│   ├── reset.css               # CSS reset
│   ├── variables.css           # CSS variables
│   └── global.css              # Global styles
│
├── App.jsx                     # Root component
└── main.jsx                    # Application entry point
```

## 🛠️ Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Features

### Public Features
- Landing Page with hero section
- Projects Showcase
- Clients Display
- Contact Form
- Newsletter Subscription

### Admin Features
- JWT-based Authentication
- Dashboard with Statistics
- Project Management (CRUD)
- Client Management (CRUD)
- Contact Management
- Subscriber Management

## 📡 API Endpoints

```
Auth:     POST /api/auth/login, GET /api/auth/verify
Projects: GET/POST/PUT/DELETE /api/projects
Clients:  GET/POST/PUT/DELETE /api/clients
Contacts: POST/GET/DELETE /api/contacts
Newsletter: POST/GET/DELETE /api/newsletter
```

## 🎨 Styling

- Plain CSS with CSS Variables
- Fully Responsive Design
- Component-specific CSS files
- Global utility classes

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📄 License

MIT License

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

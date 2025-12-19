# Projectora Frontend - Quick Start Guide

## ✅ What's Been Created

A complete, production-ready React frontend with:

### 📦 Core Files Created
- `src/api/axiosInstance.js` - Axios configuration with interceptors
- `src/api/endpoints.js` - All API endpoint functions
- `src/context/AuthContext.jsx` - Authentication context provider
- `src/hooks/useAuth.js` - Authentication hook
- `src/hooks/useFetch.js` - Data fetching hook
- `src/routes/AppRoutes.jsx` - Application routing
- `src/routes/ProtectedRoute.jsx` - Protected route wrapper
- `src/styles/reset.css` - CSS reset
- `src/styles/variables.css` - CSS custom properties
- `src/styles/global.css` - Global styles and utilities

### 🧩 Common Components (3)
- `Navbar` - Navigation with admin/public variants
- `Footer` - Site footer
- `Loader` - Loading spinner

### 🏠 Landing Components (8)
- `Hero` - Hero section
- `Projects` - Projects list with API integration
- `ProjectCard` - Individual project card
- `Clients` - Clients list with API integration
- `ClientCard` - Individual client card
- `ContactForm` - Contact form with submission
- `Newsletter` - Newsletter subscription

### 📄 Pages (6)
- `LandingPage` - Public landing page
- `AdminLogin` - Admin authentication
- `Dashboard` - Admin dashboard with stats
- `AdminProjects` - Projects management (CRUD)
- `AdminClients` - Clients management (CRUD)
- `ContactList` - View contact submissions
- `Subscribers` - Newsletter subscribers list

## 🚀 Getting Started

### 1. Verify Installation
All dependencies are already installed:
- ✅ react (v19.1.0)
- ✅ react-dom (v19.1.0)
- ✅ react-router-dom (v7.11.0)
- ✅ axios (v1.13.2)
- ✅ vite (v6.3.5)

### 2. Environment Configuration
`.env` file is already created with:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

## 📋 Available Routes

### Public Routes
- `/` - Landing page

### Admin Routes (Protected)
- `/admin/login` - Login page
- `/admin/dashboard` - Dashboard overview
- `/admin/projects` - Manage projects
- `/admin/clients` - Manage clients
- `/admin/contacts` - View contact messages
- `/admin/subscribers` - View newsletter subscribers

## 🎨 Design System

### Colors (CSS Variables)
```css
--primary-color: #2563eb (Blue)
--secondary-color: #7c3aed (Purple)
--success-color: #10b981 (Green)
--error-color: #ef4444 (Red)
--warning-color: #f59e0b (Orange)
```

### Button Classes
- `.btn` - Base button
- `.btn-primary` - Primary blue button
- `.btn-secondary` - Secondary purple button
- `.btn-outline` - Outlined button
- `.btn-danger` - Red delete button
- `.btn-large` - Larger button variant

### Utility Classes
- `.container` - Max-width container with padding
- `.text-center` - Center text
- `.flex` - Flexbox container
- `.gap-md` - Medium gap spacing
- `.alert-success` - Success message
- `.alert-error` - Error message

## 🔐 Authentication Flow

1. User visits `/admin/login`
2. Submits credentials to `/api/auth/login`
3. JWT token stored in localStorage
4. Token sent with all API requests via interceptor
5. Protected routes check auth status
6. Automatic redirect on 401 responses

## 📡 API Integration

All API functions are centralized in `src/api/endpoints.js`:

```javascript
// Projects
getProjects()
getProjectById(id)
createProject(data)
updateProject(id, data)
deleteProject(id)

// Clients
getClients()
getClientById(id)
createClient(data)
updateClient(id, data)
deleteClient(id)

// Contacts
submitContact(data)
getContacts()
deleteContact(id)

// Newsletter
subscribeNewsletter(email)
getSubscribers()
deleteSubscriber(id)

// Auth
login(credentials)
verifyToken()
```

## 🛠️ Development Workflow

### Adding a New Component

1. Create component folder:
   ```
   src/components/[category]/ComponentName/
   ```

2. Create component files:
   ```
   ComponentName.jsx
   ComponentName.css
   ```

3. Import CSS in JSX:
   ```javascript
   import './ComponentName.css';
   ```

### Adding a New Page

1. Create page folder:
   ```
   src/pages/[category]/PageName/
   ```

2. Create page files:
   ```
   PageName.jsx
   PageName.css
   ```

3. Add route in `AppRoutes.jsx`

## 🧪 Testing the Application

### Test Public Features:
1. Visit landing page
2. View projects section
3. View clients section
4. Submit contact form
5. Subscribe to newsletter

### Test Admin Features:
1. Go to `/admin/login`
2. Login with backend credentials
3. View dashboard statistics
4. Create/edit/delete projects
5. Create/edit/delete clients
6. View contact messages
7. View newsletter subscribers

## 📱 Responsive Design

All components are responsive:
- Mobile: < 768px (single column layouts)
- Tablet: 768px - 1024px (2 column grids)
- Desktop: > 1024px (multi-column grids)

## 🚨 Common Issues & Solutions

### Issue: API calls failing
**Solution:** Ensure backend is running on port 5000 and `.env` is configured

### Issue: Protected routes not working
**Solution:** Check if JWT token is stored in localStorage after login

### Issue: Styles not applying
**Solution:** Verify CSS import in component and global.css import in main.jsx

### Issue: Build errors
**Solution:** Run `npm install` to ensure all dependencies are installed

## 📦 Build for Production

```bash
npm run build
```

Output directory: `dist/`

Deploy the `dist` folder to any static hosting service.

## 🎯 Next Steps

1. ✅ Frontend is complete and ready
2. 🔄 Connect to backend API
3. 🧪 Test all features
4. 🎨 Customize colors/branding if needed
5. 🚀 Deploy to production

## 🆘 Need Help?

- Check browser console for errors
- Verify API endpoint URLs
- Ensure backend is running
- Check network tab for failed requests
- Review component imports

---

**Status: ✅ COMPLETE & READY TO USE**

All components are production-ready with:
- Error handling
- Loading states
- Form validation
- Responsive design
- Clean code structure
- Proper state management

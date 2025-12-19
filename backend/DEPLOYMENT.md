# EngageX Backend - Vercel Deployment

## Serverless Function Structure

Backend is converted to serverless function for Vercel deployment.

### Deployment Steps:

1. **Push to GitHub**
```bash
git add .
git commit -m "Convert backend to serverless"
git push
```

2. **Vercel Deployment**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - **Root Directory**: Select `backend`
   - Framework Preset: Other
   - Deploy

3. **Environment Variables** (Add in Vercel Dashboard)
```
NODE_ENV=production
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d
FRONTEND_URL=https://your-frontend-url.vercel.app
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
EMAIL_FROM=your_email
MAX_FILE_SIZE=5242880
```

4. **Frontend mein Backend URL update karein**
   - Frontend deploy hone ke baad
   - Backend environment variables mein `FRONTEND_URL` update karein
   - Frontend ke `.env` mein `VITE_API_URL` update karein

### Local Development
```bash
npm run dev  # or
npx nodemon server.js
```

### Production URL
After deployment: `https://your-backend.vercel.app`

### API Endpoints
- Health: `GET /health`
- Auth: `POST /api/auth/*`
- Projects: `/api/projects/*`
- Clients: `/api/clients/*`
- Contacts: `/api/contacts/*`
- Newsletter: `/api/newsletter/*`

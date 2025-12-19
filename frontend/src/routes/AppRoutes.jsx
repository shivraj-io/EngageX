import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing/LandingPage';
import AdminLogin from '../pages/admin/Login/AdminLogin';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import AdminProjects from '../pages/admin/Projects/AdminProjects';
import AdminClients from '../pages/admin/Clients/AdminClients';
import ContactList from '../pages/admin/Contacts/ContactList';
import Subscribers from '../pages/admin/Newsletter/Subscribers';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin/clients"
        element={
          <ProtectedRoute>
            <AdminClients />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin/contacts"
        element={
          <ProtectedRoute>
            <ContactList />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin/subscribers"
        element={
          <ProtectedRoute>
            <Subscribers />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

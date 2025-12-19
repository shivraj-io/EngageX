import axiosInstance from './axiosInstance';

// Auth endpoints
export const login = (credentials) => {
  return axiosInstance.post('/admin/login', credentials);
};

export const verifyToken = () => {
  return axiosInstance.get('/auth/me');
};

// Project endpoints
export const getProjects = () => {
  return axiosInstance.get('/projects');
};

export const getProjectById = (id) => {
  return axiosInstance.get(`/projects/${id}`);
};

export const createProject = (projectData) => {
  return axiosInstance.post('/projects', projectData);
};

export const updateProject = (id, projectData) => {
  return axiosInstance.put(`/projects/${id}`, projectData);
};

export const deleteProject = (id) => {
  return axiosInstance.delete(`/projects/${id}`);
};

// Client endpoints
export const getClients = () => {
  return axiosInstance.get('/clients');
};

export const getClientById = (id) => {
  return axiosInstance.get(`/clients/${id}`);
};

export const createClient = (clientData) => {
  return axiosInstance.post('/clients', clientData);
};

export const updateClient = (id, clientData) => {
  return axiosInstance.put(`/clients/${id}`, clientData);
};

export const deleteClient = (id) => {
  return axiosInstance.delete(`/clients/${id}`);
};

// Contact endpoints
export const submitContact = (contactData) => {
  return axiosInstance.post('/contacts', contactData);
};

export const getContacts = () => {
  return axiosInstance.get('/contacts');
};

export const deleteContact = (id) => {
  return axiosInstance.delete(`/contacts/${id}`);
};

// Newsletter endpoints
export const subscribeNewsletter = (email) => {
  return axiosInstance.post('/newsletter/subscribe', { email });
};

export const getSubscribers = () => {
  return axiosInstance.get('/newsletter/subscribers');
};

export const deleteSubscriber = (id) => {
  return axiosInstance.delete(`/newsletter/subscribers/${id}`);
};

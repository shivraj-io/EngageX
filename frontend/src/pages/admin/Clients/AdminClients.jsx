import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getClients, createClient, updateClient, deleteClient } from '../../../api/endpoints';
import Navbar from '../../../components/common/Navbar/Navbar';
import Loader from '../../../components/common/Loader/Loader';
import './AdminClients.css';

const AdminClients = () => {
  const { data: clientsData, loading, error, refetch } = useFetch(getClients);
  const clients = clientsData?.data?.clients || clientsData?.clients || [];
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    testimonial: '',
    rating: 5,
    featured: false,
    status: 'active',
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('testimonial', formData.testimonial);
      submitData.append('rating', formData.rating);
      submitData.append('status', formData.status);
      submitData.append('featured', formData.featured);
      
      if (formData.position) submitData.append('position', formData.position);
      if (formData.company) submitData.append('company', formData.company);
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      console.log('Form Data being sent:');
      for (let [key, value] of submitData.entries()) {
        console.log(key, value);
      }

      if (editingClient) {
        await updateClient(editingClient._id, submitData);
      } else {
        await createClient(submitData);
      }
      refetch();
      closeModal();
    } catch (err) {
      console.error('Error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Failed to save client';
      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        console.error('Validation errors:', validationErrors);
        alert(errorMessage + '\n' + JSON.stringify(validationErrors, null, 2));
      } else {
        alert(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      position: client.position || '',
      company: client.company || '',
      testimonial: client.testimonial,
      rating: client.rating || 5,
      featured: client.featured || false,
      status: client.status || 'active',
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(id);
        refetch();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete client');
      }
    }
  };

  const openModal = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      position: '',
      company: '',
      testimonial: '',
      rating: 5,
      featured: false,
      status: 'active',
    });
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  return (
    <div className="admin-clients-page">
      <Navbar />
      <main className="admin-main">
        <div className="container">
          <div className="admin-header">
            <h1 className="admin-title">Clients Management</h1>
            <button onClick={openModal} className="btn btn-primary">
              + Add Client
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {clients && clients.length > 0 ? (
            <div className="cards-grid">
              {clients.map((client) => (
                <div key={client._id} className="client-card">
                  <div className="card-image-client">
                    <img src={client.imageUrl} alt={client.name} />
                    {client.featured && <span className="featured-badge">⭐ Featured</span>}
                    <span className={`status-badge-card status-${client.status}`}>
                      {client.status}
                    </span>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{client.name}</h3>
                    <p className="card-position">{client.position || 'Client'}</p>
                    {client.company && <p className="card-company">🏢 {client.company}</p>}
                    <div className="card-rating">
                      {'⭐'.repeat(client.rating || 5)}
                    </div>
                    <p className="card-testimonial">"{client.testimonial}"</p>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(client)} className="btn-card btn-edit">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(client._id)} className="btn-card btn-delete">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">No clients found. Create your first client!</p>
          )}
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingClient ? 'Edit Client' : 'Add Client'}</h2>
              <button onClick={closeModal} className="modal-close">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="form-input"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g., CEO, CTO, Project Manager"
                />
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-input"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="testimonial" className="form-label">
                  Testimonial *
                </label>
                <textarea
                  id="testimonial"
                  name="testimonial"
                  className="form-textarea"
                  value={formData.testimonial}
                  onChange={handleChange}
                  placeholder="Enter client testimonial"
                  required
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="image" className="form-label">
                  Client Image {!editingClient && '*'}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-input"
                  onChange={handleImageChange}
                  accept="image/*"
                  required={!editingClient}
                />
                {editingClient && <small style={{ color: '#6b7280' }}>Leave empty to keep current image</small>}
              </div>

              <div className="form-group">
                <label htmlFor="rating" className="form-label">
                  Rating *
                </label>
                <select
                  id="rating"
                  name="rating"
                  className="form-select"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value="1">⭐ 1 Star</option>
                  <option value="2">⭐⭐ 2 Stars</option>
                  <option value="3">⭐⭐⭐ 3 Stars</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    style={{ width: 'auto', cursor: 'pointer' }}
                  />
                  Featured Client
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;

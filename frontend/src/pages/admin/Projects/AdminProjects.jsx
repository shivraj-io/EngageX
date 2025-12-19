import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getProjects, createProject, updateProject, deleteProject } from '../../../api/endpoints';
import Navbar from '../../../components/common/Navbar/Navbar';
import Loader from '../../../components/common/Loader/Loader';
import './AdminProjects.css';

const AdminProjects = () => {
  const { data: projects, loading, error, refetch } = useFetch(getProjects);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    status: 'active',
    featured: false,
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
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('status', formData.status);
      submitData.append('featured', formData.featured);
      
      if (formData.liveUrl) submitData.append('liveUrl', formData.liveUrl);
      if (formData.githubUrl) submitData.append('githubUrl', formData.githubUrl);
      
      // Convert comma-separated technologies to array
      if (formData.technologies) {
        const techArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
        techArray.forEach(tech => submitData.append('technologies[]', tech));
      }
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (editingProject) {
        await updateProject(editingProject._id, submitData);
      } else {
        await createProject(submitData);
      }
      refetch();
      closeModal();
    } catch (err) {
      console.error('Error:', err);
      alert(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category || '',
      technologies: project.technologies ? project.technologies.join(', ') : '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      status: project.status,
      featured: project.featured || false,
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        refetch();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  const openModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      status: 'active',
      featured: false,
    });
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
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
    <div className="admin-projects-page">
      <Navbar />
      <main className="admin-main">
        <div className="container">
          <div className="admin-header">
            <h1 className="admin-title">Projects Management</h1>
            <button onClick={openModal} className="btn btn-primary">
              + Add Project
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {projects && projects.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Technologies</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <td>{project.title}</td>
                      <td>{project.category}</td>
                      <td>{project.technologies?.join(', ')}</td>
                      <td>
                        <span className={`status-badge status-${project.status.toLowerCase()}`}>
                          {project.status}
                        </span>
                      </td>
                      <td>{project.featured ? '⭐' : '-'}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEdit(project)}
                            className="btn-action btn-edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project._id)}
                            className="btn-action btn-delete"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-message">No projects found. Create your first project!</p>
          )}
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProject ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={closeModal} className="modal-close">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter project description"
                  required
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="image" className="form-label">
                  Project Image {!editingProject && '*'}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-input"
                  onChange={handleImageChange}
                  accept="image/*"
                  required={!editingProject}
                />
                {editingProject && <small style={{ color: '#6b7280' }}>Leave empty to keep current image</small>}
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Web App, Mobile App"
                />
              </div>

              <div className="form-group">
                <label htmlFor="technologies" className="form-label">
                  Technologies
                </label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  className="form-input"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="e.g., React, Node.js, MongoDB (comma-separated)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="liveUrl" className="form-label">
                  Live URL
                </label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  className="form-input"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="githubUrl" className="form-label">
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  className="form-input"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                />
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
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
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
                  Featured Project
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;

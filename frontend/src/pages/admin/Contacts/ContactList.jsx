import { useFetch } from '../../../hooks/useFetch';
import { getContacts, deleteContact } from '../../../api/endpoints';
import Navbar from '../../../components/common/Navbar/Navbar';
import Loader from '../../../components/common/Loader/Loader';
import './ContactList.css';

const ContactList = () => {
  const { data: contactsData, loading, error, refetch } = useFetch(getContacts);
  const contacts = contactsData?.data?.contacts || contactsData?.contacts || [];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        refetch();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete contact');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
    <div className="contact-list-page">
      <Navbar />
      <main className="admin-main">
        <div className="container">
          <div className="admin-header">
            <h1 className="admin-title">Contact Messages</h1>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {contacts && contacts.length > 0 ? (
            <div className="contacts-grid">
              {contacts.map((contact) => (
                <div key={contact._id} className="contact-card">
                  <div className="contact-card-header">
                    <div className="contact-info">
                      <h3 className="contact-name">{contact.name}</h3>
                      <p className="contact-email">{contact.email}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="btn-icon btn-delete"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="contact-card-body">
                    <div className="contact-subject">
                      <strong>Subject:</strong> {contact.subject}
                    </div>
                    <div className="contact-message">
                      <strong>Message:</strong>
                      <p>{contact.message}</p>
                    </div>
                  </div>

                  <div className="contact-card-footer">
                    <span className="contact-date">
                      {formatDate(contact.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">No contact messages yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContactList;

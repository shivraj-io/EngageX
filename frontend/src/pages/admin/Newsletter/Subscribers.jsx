import { useFetch } from '../../../hooks/useFetch';
import { getSubscribers, deleteSubscriber } from '../../../api/endpoints';
import Navbar from '../../../components/common/Navbar/Navbar';
import Loader from '../../../components/common/Loader/Loader';
import './Subscribers.css';

const Subscribers = () => {
  const { data: subscribers, loading, error, refetch } = useFetch(getSubscribers);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await deleteSubscriber(id);
        refetch();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete subscriber');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
    <div className="subscribers-page">
      <Navbar />
      <main className="admin-main">
        <div className="container">
          <div className="admin-header">
            <h1 className="admin-title">Newsletter Subscribers</h1>
            <div className="subscriber-count">
              Total: {subscribers?.length || 0}
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {subscribers && subscribers.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Subscribed On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber._id}>
                      <td>{subscriber.email}</td>
                      <td>{formatDate(subscriber.createdAt)}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(subscriber._id)}
                          className="btn-action btn-delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-message">No subscribers yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Subscribers;

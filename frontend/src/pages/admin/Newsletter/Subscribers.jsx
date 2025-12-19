import { useFetch } from '../../../hooks/useFetch';
import { getSubscribers, deleteSubscriber } from '../../../api/endpoints';
import Navbar from '../../../components/common/Navbar/Navbar';
import Loader from '../../../components/common/Loader/Loader';
import './Subscribers.css';

const Subscribers = () => {
  const { data: subscribersData, loading, error, refetch } = useFetch(getSubscribers);
  const subscribers = subscribersData?.data?.subscribers || subscribersData?.subscribers || [];

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
            <div className="subscribers-grid">
              {subscribers.map((subscriber) => (
                <div key={subscriber._id} className="subscriber-card">
                  <div className="subscriber-icon">📧</div>
                  <div className="subscriber-info">
                    <div className="subscriber-email">{subscriber.email}</div>
                    <div className="subscriber-date">
                      <span className="date-icon">📅</span>
                      {formatDate(subscriber.createdAt)}
                    </div>
                    {subscriber.status && (
                      <span className={`status-badge-sub status-${subscriber.status}`}>
                        {subscriber.status}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(subscriber._id)}
                    className="btn-delete-sub"
                    title="Unsubscribe"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              {/* <div className="empty-icon">📭</div> */}
              <p className="empty-message">No subscribers yet.</p>
              <p className="empty-subtitle">Start promoting your newsletter to get subscribers!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Subscribers;

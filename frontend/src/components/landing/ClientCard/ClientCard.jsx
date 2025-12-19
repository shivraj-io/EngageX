import './ClientCard.css';

const ClientCard = ({ client }) => {
  return (
    <article className="client-card">
      <div className="client-card-header">
        <div className="client-avatar">
          {client.name.charAt(0).toUpperCase()}
        </div>
        <div className="client-info">
          <h3 className="client-name">{client.name}</h3>
          <p className="client-company">{client.company}</p>
        </div>
      </div>
      
      <div className="client-details">
        <div className="client-detail-item">
          <span className="detail-icon">📧</span>
          <span className="detail-text">{client.email}</span>
        </div>
        {client.phone && (
          <div className="client-detail-item">
            <span className="detail-icon">📞</span>
            <span className="detail-text">{client.phone}</span>
          </div>
        )}
        {client.industry && (
          <div className="client-detail-item">
            <span className="detail-icon">🏢</span>
            <span className="detail-text">{client.industry}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default ClientCard;

import './ClientCard.css';

const ClientCard = ({ client }) => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating || 5);
  };

  return (
    <article className="client-card">
      <div className="client-card-header">
        {client.imageUrl ? (
          <img 
            src={client.imageUrl} 
            alt={client.name}
            className="client-avatar-img"
          />
        ) : (
          <div className="client-avatar">
            {client.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="client-info">
          <h3 className="client-name">{client.name}</h3>
          {client.position && client.company ? (
            <p className="client-position">{client.position} at {client.company}</p>
          ) : client.company ? (
            <p className="client-position">{client.company}</p>
          ) : client.position ? (
            <p className="client-position">{client.position}</p>
          ) : null}
        </div>
      </div>
      
      {client.testimonial && (
        <blockquote className="client-testimonial">
          "{client.testimonial}"
        </blockquote>
      )}
      
      {client.rating && (
        <div className="client-rating">
          <span className="rating-stars">{renderStars(client.rating)}</span>
          <span className="rating-value">{client.rating}/5</span>
        </div>
      )}
      
      {client.featured && (
        <span className="featured-badge">Featured Client</span>
      )}
    </article>
  );
};

export default ClientCard;

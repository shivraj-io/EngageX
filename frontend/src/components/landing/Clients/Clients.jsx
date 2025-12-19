import { useFetch } from '../../../hooks/useFetch';
import { getClients } from '../../../api/endpoints';
import ClientCard from '../ClientCard/ClientCard';
import Loader from '../../common/Loader/Loader';
import './Clients.css';

const Clients = () => {
  const { data: clients, loading, error } = useFetch(getClients);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className="clients" id="clients">
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="clients" id="clients">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trusted by Great Teams</h2>
          <p className="section-subtitle">
            Companies we've partnered with
          </p>
        </div>

        {clients && clients.length > 0 ? (
          <div className="clients-grid">
            {clients.map((client) => (
              <ClientCard key={client._id} client={client} />
            ))}
          </div>
        ) : (
          <p className="empty-message">No clients available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Clients;

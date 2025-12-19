import { useFetch } from '../../../hooks/useFetch';
import { getClients } from '../../../api/endpoints';
import ClientCard from '../ClientCard/ClientCard';
import Loader from '../../common/Loader/Loader';
import './Clients.css';

const Clients = () => {
  const { data: clientsData, loading, error } = useFetch(getClients);

  console.log('Clients Data:', clientsData);
  console.log('Clients Loading:', loading);
  console.log('Clients Error:', error);

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

  // Extract clients array from response - backend returns data in data.clients
  const clientsArray = clientsData?.data?.clients || clientsData?.clients || [];
  // Ensure it's an array before filtering
  const clients = Array.isArray(clientsArray) ? clientsArray : [];
  // Filter only active clients for public display
  const activeClients = clients.filter(c => c.status === 'active');

  console.log('Active Clients:', activeClients);

  return (
    <section className="clients" id="clients">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trusted by Great Teams</h2>
          <p className="section-subtitle">
            Companies we've partnered with
          </p>
        </div>

        {activeClients && activeClients.length > 0 ? (
          <div className="clients-grid">
            {activeClients.map((client) => (
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

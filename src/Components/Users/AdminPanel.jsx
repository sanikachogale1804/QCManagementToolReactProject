import React, { useEffect, useState } from 'react';
import { getTickets } from '../Services/ticketService';

function AdminPanel() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        if (data._embedded && data._embedded.ticketCreations) {
          setTickets(data._embedded.ticketCreations);
          console.log('✅ Tickets loaded:', data._embedded.ticketCreations);
        } else {
          console.warn('⚠️ No tickets found in response:', data);
          setTickets([]);
        }
      } catch (error) {
        console.error('❌ Error fetching tickets:', error);
        setTickets([]);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel - Ticket List</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th>Ticket ID</th>
              <th>IASSP Name</th>
              <th>Site ID</th>
              <th>Camera ID 1</th>
              <th>SIM Carrier</th>
              <th>Ping Time</th>
              <th>APN Status</th>
              <th>Live View Quality</th>
              <th>Final Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.iasspName}</td>
                <td>{ticket.siteId}</td>
                <td>{ticket.cameraId1}</td>
                <td>{ticket.simCarrier}</td>
                <td>{ticket.pingResponseTime}</td>
                <td>{ticket.apnConfigStatus}</td>
                <td>{ticket.liveViewQuality}</td>
                <td>{ticket.finalStatus}</td>
                <td>{ticket.finalRemarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;

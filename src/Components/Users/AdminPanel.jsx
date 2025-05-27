import React, { useEffect, useState } from 'react';
import { getTickets } from '../Services/ticketService';

function AdminPanel() {
  const [tickets, setTickets] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        if (data._embedded && data._embedded.ticketCreations) {
          const ticketData = data._embedded.ticketCreations;
          setTickets(sortTickets(ticketData, sortOrder));
          console.log('✅ Tickets loaded:', ticketData);
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

  const sortTickets = (ticketsList, order) => {
    return [...ticketsList].sort((a, b) => {
      return order === 'asc'
        ? a.siteId.localeCompare(b.siteId)
        : b.siteId.localeCompare(a.siteId);
    });
  };

  const handleSortChange = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    setTickets(sortTickets(tickets, newOrder));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel - Ticket List</h2>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="sortOrder" style={{ marginRight: '10px' }}>
          Sort by Site ID:
        </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

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
              <th>Camera ID 2</th>
              <th>IP Address 1</th>
              <th>IP Address2</th>
              <th>SIM ICCID</th>
              <th>SIM Carrier</th>
              <th>SIM Status</th>
              <th>Ping Time</th>
              <th>Network Image</th>
              <th>APN Configure Image</th>
              <th>APN Status</th>
              <th>Live View Image</th>
              <th>Live View Quality</th>
              <th>Video Config Image</th>
              <th>Resolution</th>
              <th>FTP Seetings Image</th>
              <th>NTP Seetings Image</th>
              <th>SD Card Storage Percentage</th>
              <th>PlayBack Screenshot</th>
              <th>Final Status</th>
              <th>Remarks</th>
              <th>Additional Image</th>
              <th>Validate</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.iasspName}</td>
                <td>{ticket.siteId}</td>
                <td>{ticket.cameraId1}</td>
                <td>{ticket.cameraId2}</td>
                <td>{ticket.ipAddress1}</td>
                <td>{ticket.ipAddress2}</td>
                <td>{ticket.simIccid}</td>
                <td>{ticket.simCarrier}</td>
                <td>{ticket.simStatus}</td>
                <td>{ticket.pingResponseTime}</td>
                <td>{ticket.networkImage}</td>
                <td>{ticket.apnConfigImage}</td>
                <td>{ticket.apnConfigStatus}</td>
                <td>{ticket.liveViewImage}</td>
                <td>{ticket.liveViewQuality}</td>
                <td>{ticket.videoConfigImage}</td>
                <td>{ticket.resolution}</td>
                <td>{ticket.ftpSettingsImage}</td>
                <td>{ticket.ntpSettingsImage}</td>
                <td>{ticket.sdCardStoragePercentage}</td>
                <td>{ticket.playbackScreenshot}</td>
                <td>{ticket.finalStatus}</td>
                <td>{ticket.finalRemarks}</td>
                <td>{ticket.additionalImages}</td>
                <td>
                    <button>Validate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;

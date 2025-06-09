import axios from 'axios';

// Use a consistent token key
const TOKEN_KEY = 'authToken'; // ✅ change all usage to this

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // your backend URL
});

// Attach JWT token automatically
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

// -----------------------------
// ✅ Fetch Tickets (GET /ticketCreation)
export const getTickets = async () => {
  try {
    const response = await axiosInstance.get('/ticketCreation');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('❌ Error Status:', error.response.status);
      console.error('❌ Error Data:', error.response.data);
    } else {
      console.error('❌ Error Message:', error.message);
    }
    return [];
  }
};


// -----------------------------
// ✅ Create Ticket (POST /ticketCreation)
export const createTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post('/ticketCreation', ticketData);
    const createdTicket = response.data;

    // Extract ticket ID from HATEOAS self link if present
    const selfLink = createdTicket?._links?.self?.href;
    let ticketId = null;

    if (selfLink) {
      const parts = selfLink.split('/');
      ticketId = parts[parts.length - 1];
    }

    if (!ticketId) {
      throw new Error('Ticket ID not returned from backend');
    }

    return { ...createdTicket, id: ticketId };
  } catch (error) {
    console.error('❌ Failed to create ticket:', error);
    throw error;
  }
};

// -----------------------------
// ✅ Upload Image (POST /ticketCreation/{id}/image)
export const uploadNetworkImage = async (ticketId, imageFormData) => {
  try {
    const response = await axiosInstance.post(
      `/ticketCreation/${ticketId}/image`,
      imageFormData,
      {
        headers: {
          // ⚠️ Do not manually set Content-Type for FormData — let axios handle it
          // Authorization is already handled by axiosInstance interceptor
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('❌ Image upload failed:', error);
    throw new Error('Image upload failed');
  }
};

export const uploadApnConfigImage = async (ticketId, imageFormData) => {
  try {
    const response = await axiosInstance.post(
      `/ticketCreation/${ticketId}/apnConfigImage`,
      imageFormData,
      {
        headers: {
          // Content-Type will be set automatically by axios for FormData
          // Authorization handled by axiosInstance interceptor
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log('❌ APN Config Image upload failed:', error);
    throw new Error('APN Config Image upload failed');
  }

};
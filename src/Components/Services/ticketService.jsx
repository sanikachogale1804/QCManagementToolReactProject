import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // your backend URL
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const BASE_URL="http://localhost:8080"
export default axiosInstance;


// Create a ticket (POST /ticketCreation)
export const createTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post('/ticketCreation', ticketData);
    const createdTicket = response.data;

    // Extract ticket ID from HATEOAS self link, if present
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
    console.error('Failed to create ticket:', error);
    throw error;
  }
};

// Upload network image for a ticket (POST /ticketCreation/{ticketId}/image)
export const uploadNetworkImage = async (ticketId, imageFile) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('networkImage', imageFile); // key must match backend

  try {
    const response = await axios.post(
      `http://localhost:8080/ticketCreation/${ticketId}/image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // important
          // no Content-Type here, axios will set correct multipart boundary
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error('Image upload failed');
  }
};

export const getTickets = async () => {
  try {
    const response = await axiosInstance.get('/ticketCreation');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("❌ Error Status:", error.response.status);
      console.error("❌ Error Data:", error.response.data);
      console.error("❌ Full Response:", error.response);
    } else {
      console.error("❌ Error Message:", error.message);
    }
    return [];
  }
};

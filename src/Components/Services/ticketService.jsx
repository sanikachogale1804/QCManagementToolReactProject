import axios from 'axios';

// Create a central Axios instance with token auto-injection
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('Token being sent:', token); // 👈 Debug here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const createTicket = async (ticketData) => {
  const response = await fetch("http://localhost:8080/ticketCreation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  const createdTicket = await response.json();

  const selfLink = createdTicket?._links?.self?.href;
  let ticketId = null;

  if (selfLink) {
    const parts = selfLink.split('/');
    ticketId = parts[parts.length - 1];
  }

  if (!ticketId) {
    throw new Error("Ticket ID not returned from backend");
  }

  return { ...createdTicket, id: ticketId };
};


export const uploadNetworkImage = async (ticketId, formData) => {
  try {
    const response = await axiosInstance.post(`/ticketCreation/${ticketId}/image`, formData, {
      headers: {
        // Let axios set Content-Type automatically for FormData
      },
    });
    return response.data;
  } catch (error) {
    console.error("Image upload error:", error.response || error.message);
    throw new Error("Image upload failed");
  }
};
export default axiosInstance;

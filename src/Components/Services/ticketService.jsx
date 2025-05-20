import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // adjust if you store token elsewhere
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createTicket = async (ticketData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ticketCreation`, ticketData, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw new Error('Ticket creation failed');
    }
};

export const uploadNetworkImage = async (url, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeader(),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Image upload failed:', error);
        throw new Error('Image upload failed');
    }
};

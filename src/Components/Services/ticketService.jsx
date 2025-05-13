// src/services/ticketService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ticketCreation`, ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

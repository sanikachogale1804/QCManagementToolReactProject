import axios from 'axios';

const API_LINK="http://localhost:8080/users"

export const getUsers=()=>{
    return fetch(API_LINK)
    .then(data=>data.json())
    .then(data=>data["_embedded"]["users"])
}

const API_URL = 'http://localhost:8080'; 

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (user) => {
    const response = await axios.post(`${API_URL}/login`, user);
    return response.data.token; 
  };
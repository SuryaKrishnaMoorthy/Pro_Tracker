import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

export const taskRequests = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseURL}/tasks`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

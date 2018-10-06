import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/api/badges';

export const getBadgeRequest = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseURL}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

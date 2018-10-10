import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'https://pro-tracker-backend.herokuapp.com/api/badges';

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

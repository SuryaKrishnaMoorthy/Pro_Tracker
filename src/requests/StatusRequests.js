import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'https://pro-tracker-backend.herokuapp.com/api/status';

export const createOneStatusRequest = async (body) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`${baseURL}/`, body, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneStatusRequest = async (taskId, statusId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/${taskId}/${statusId}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

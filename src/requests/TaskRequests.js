import { AsyncStorage } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const baseURL = 'http://localhost:5000/api';

export const getCurrentDayTasksRequest = async () => {
  const date = moment().format('YYYY-MM-DD');
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseURL}/tasks?date=${date}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneTaskRequest = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseURL}/tasks/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Get One Task Error: ', error);
  }
};

export const createOneTaskRequest = async (body) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`${baseURL}/tasks`, body, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Create Task Error: ', error);
  }
};

export const deleteOneTaskRequest = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/tasks/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Delete Task Error: ', error);
  }
};

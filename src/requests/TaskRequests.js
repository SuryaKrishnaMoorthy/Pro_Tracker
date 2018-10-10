import { AsyncStorage } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const baseURL = 'https://pro-tracker-backend.herokuapp.com/api/tasks';

export const getAllTasksRequest = async () => {
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

export const getCurrentDayTasksRequest = async (dateParams) => {
  const date = moment(dateParams).format('YYYY-MM-DD');
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseURL}?date=${date}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTasksByTypeRequest = async (type) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseURL}?type=${type}`, {
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
    const response = await axios.get(`${baseURL}/${id}`, {
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
    const response = await axios.post(`${baseURL}`, body, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Create Task Error: ', error);
  }
};

export const updateOneTaskRequest = async (id, body) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.patch(`${baseURL}/${id}`, body, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Update Task Error: ', error);
  }
};

export const deleteOneTaskRequest = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Delete Task Error: ', error);
  }
};

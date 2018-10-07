import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

export const loginRequest = async (body) => {
  const response = await axios.post(`${baseURL}/users/login`, body);
  try {
    await AsyncStorage.setItem('token', response.data.token);
  } catch (error) {
    console.log(error);
  }
  return response.data;
};

export const signUpRequest = async (body) => {
  const response = await axios.post(`${baseURL}/users/signup`, body);
  try {
    await AsyncStorage.setItem('token', response.data.token);
  } catch (error) {
    console.log(error);
  }
  return response.data;
};

export const getUserRequest = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseURL}/users/`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    console.log('ACTIONS', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const logoutRequest = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserRequest = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/users`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    await AsyncStorage.clear();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

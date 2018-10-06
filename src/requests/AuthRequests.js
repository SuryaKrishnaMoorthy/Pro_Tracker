import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/api';

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

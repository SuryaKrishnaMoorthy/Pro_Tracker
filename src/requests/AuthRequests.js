import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

export const loginRequest = async (body) => {
  const response = await axios.post(`${baseURL}/users/login`, body);
  try {
    await AsyncStorage.setItem('token', response.data.token);
  } catch (error) {
    console.log('ERROR', error);
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

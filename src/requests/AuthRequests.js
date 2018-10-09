import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'https://pro-tracker-backend.herokuapp.com/api';

export const loginRequest = async (body) => {
  const response = await axios({
    method: 'post',
    url: `${baseURL}/users/login`,
    data: { ...body }
  });
  try {
    await AsyncStorage.setItem('token', response.data.token);
  } catch (error) {
    console.log(error);
  }
  return response.data;
};

export const signUpRequest = async (body) => {
  const response = await axios({
    method: 'post',
    url: `${baseURL}/users/signup`,
    data: { ...body }
  });
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

export const getUserRequest = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseURL}/users`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

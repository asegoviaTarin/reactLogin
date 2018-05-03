import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
  login,
  getData,
  logout
};

function login(username, password) {
  const requestOptions = {
    method: 'post',
    url: 'http://localhost:8080/api/login',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ username, password }),
  };

  return axios(requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }

      const username = response.data.body;
      const user = username;
      if (user && user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getData() {
  const requestOptions = {
    method: 'get',
    url: 'http://localhost:8080/api/mockData',
    headers: authHeader(),
  };

  return axios(requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }
      return response.data.body;
    });
}


import axios from 'axios';
import { authHeader } from '../_helpers';

export const userService = {
  login,
  getData,
  logout,
  getCurrentUser,
};

function getCurrentUser() {
  let token = localStorage.getItem('token');
  let playload = JSON.parse(atob(token.split('.')[1]));
  return playload;
}

function login(username, password) {
  const requestOptions = {
    method: 'post',
    url: 'http://api.nextportfolio.local/v1/auth/token',
    // url: 'http://localhost:8080/api/login',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ username, password }),
  };

  return axios(requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }

      //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZWFkOTVlOTExMTkzMDAxMTgzMDE5NiIsInVzZXJuYW1lIjoic3VwZXJhZG1pbiJ9LCJzY29wZSI6eyJfaWQiOiI1YWVhZDk1ZjNmYmM1MTAwMTE2NzA3OWEiLCJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJzY29wZSI6WyJzdXBlcmFkbWluIl19LCJpYXQiOjE1MjUzNDY4MjAsImV4cCI6MTUyNTQzMzIyMH0.-yz7ASNDKfmBg_8_b9NOZMumNZfefe7BYJV1M0iA8oE';
      var { token } = response.data;
      localStorage.setItem('token', token);
      return token;
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


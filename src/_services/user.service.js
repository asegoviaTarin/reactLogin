import { authHeader } from '../_helpers';
import axios  from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getData,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'post',
        url: 'http://localhost:8080/api/login',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ username, password })
    };

    return axios(requestOptions)
      .then(response => {
          console.log('respuesta',response.databody)
          console.log('respuesta Stado',response.status)
          if (response.status !== 200) { 
              return Promise.reject(response.statusText);
          }
          console.log('body',response.data.body)
          const username = response.data.body
          console.log('username',username)

          // login successful if there's a jwt token in the response
          console.log(username)
          const user = username;
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
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
      .then(response => {
          console.log('respuesta2',response)
          console.log('respuesta Stado2',response.status)
          if (response.status !== 200) { 
              return Promise.reject(response.statusText);
          }
          console.log('lo oque recupero del WS',response.data.body)
          return response.data.body;
      });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/register', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}
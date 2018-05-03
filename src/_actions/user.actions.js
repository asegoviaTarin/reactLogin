import { userConstants } from '../_constants';
import { dataConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  getCurrentUser,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then((token) => {
        dispatch(success(token));
        history.push('/home');
      })
      .catch((error) => {
        dispatch(failure(error.response));
        dispatch(alertActions.error(error.response.statusText));
      });
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function getCurrentUser() {
  return (dispatch) => {
    let data = userService.getCurrentUser();
    dispatch(success(data));
  };

  function request() { return { type: userConstants.GETALL_REQUEST }; }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users }; }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error }; }
}


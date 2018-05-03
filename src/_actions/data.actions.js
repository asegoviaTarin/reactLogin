import { dataConstants } from '../_constants';
import { userService } from '../_services';

export const dataActions = {
  getData,
};

function getData() {
  return (dispatch) => {
    dispatch(request());
    userService.getData()
      .then((data) => {
        dispatch(success(data));
      })
      .catch((error) => {
        console.log('error en la respuesta');
        dispatch(failure(error.response));
      });
  };


  function request() { return { type: dataConstants.GETDATA_REQUEST }; }
  function success(data) { return { type: dataConstants.GETDATA_SUCCESS, data }; }
  function failure(error) { return { type: dataConstants.GETDATA_FAILURE, error }; }
}

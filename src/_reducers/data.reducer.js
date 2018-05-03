import { dataConstants } from '../_constants';

export function data(state = {}, action) {
  switch (action.type) {

    case dataConstants.GETDATA_SUCCESS:
      return {
        products: action.data
      };
    case dataConstants.GETDATA_FAILURE:
      return { 
        error: action.error
      };
    case dataConstants.GETDATA_REQUEST:
      return {
        loading: true
      };
    default:
      return state
  }
}
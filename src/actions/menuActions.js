import { API_BASE_URL } from '../config'
import * as types from './actionTypes'

export const fetchMenuRequest = () => ({
  type: types.FETCH_MENU_REQUEST
})

export const fetchMenuSuccess = menu => ({
  type: types.FETCH_MENU_SUCCESS,
  menu
})

export const fetchMenuError = error => ({
  type: types.FETCH_MENU_ERROR,
  error
})

//
// Async Request
//
export const fetchMenu = () => (dispatch, getState) => {
  dispatch(fetchMenuRequest())
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/items`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(menu => {
    dispatch(fetchMenuSuccess(menu))
  })
  .catch(error => {
    dispatch(fetchMenuError(error))
  })
}

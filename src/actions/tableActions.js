import { API_BASE_URL } from '../config'
import * as types from './actionTypes'

export const fetchTablesRequest = () => ({
  type: types.FETCH_TABLES_REQUEST
})

export const fetchTablesSuccess = tables => ({
  type: types.FETCH_TABLES_SUCCESS,
  tables
})

export const fetchTablesError = error => ({
  type: types.FETCH_TABLES_ERROR,
  error
})

//
// Async Request
//
export const fetchTables = () => (dispatch, getState) => {
  dispatch(fetchTablesRequest())
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/tables`, {
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
  .then(tables => {
    dispatch(fetchTablesSuccess(tables))
  })
  .catch(error => {
    dispatch(fetchTablesError(error))
  })
}

export const selectTable = table => ({
  type: types.SELECT_TABLE,
  table
})

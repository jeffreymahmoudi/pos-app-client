import { API_BASE_URL } from '../config'
import * as types from './actionTypes'

export const fetchChecksRequest = () => ({
  type: types.FETCH_CHECKS_REQUEST
})

export const fetchChecksSuccess = checks => ({
  type: types.FETCH_CHECKS_SUCCESS,
  checks
})

export const fetchChecksError = error => ({
  type: types.FETCH_CHECKS_ERROR,
  error
})

//
// Async Request
//
export const fetchChecks = () => (dispatch, getState) => {
  dispatch(fetchChecksRequest())
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/checks`, {
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
  .then(checks => {
    dispatch(fetchChecksSuccess(checks))
  })
  .catch(error => {
    dispatch(fetchChecksError(error))
  })
}



export const fetchNewCheckRequest = () => ({
  type: types.FETCH_NEW_CHECK_REQUEST
})

export const fetchNewCheckSuccess = check => ({
  type: types.FETCH_NEW_CHECK_SUCCESS,
  check
})

export const fetchNewCheckError = error => ({
  type: types.FETCH_NEW_CHECK_ERROR,
  error
})

//
// Async Request
//
export const fetchNewCheck = (table) => (dispatch, getState) => {
  dispatch(fetchNewCheckRequest())
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/checks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({tableId: table.id})
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(checks => {
    dispatch(fetchNewCheckSuccess(checks))
  })
  .catch(error => {
    dispatch(fetchNewCheckError(error))
  })
}



export const fetchAddCheckItemRequest = () => ({
  type: types.FETCH_ADD_CHECK_ITEM_REQUEST
})

export const fetchAddCheckItemSuccess = check => ({
  type: types.FETCH_ADD_CHECK_ITEM_SUCCESS,
  check
})

export const fetchAddCheckItemError = error => ({
  type: types.FETCH_ADD_CHECK_ITEM_ERROR,
  error
})

//
// Async Request
//
export const fetchAddCheckItem = (check, item) => (dispatch, getState) => {
  dispatch(fetchAddCheckItemRequest())
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/checks/${check.id}/addItem`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({itemId: item.id})
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(check => {
    dispatch(fetchAddCheckItemSuccess(check))
  })
  .catch(error => {
    dispatch(fetchAddCheckItemError(error))
  })
}



export const fetchRemoveCheckItemRequest = () => ({
  type: types.FETCH_REMOVE_CHECK_ITEM_REQUEST
})

export const fetchRemoveCheckItemSuccess = check => ({
  type: types.FETCH_REMOVE_CHECK_ITEM_SUCCESS,
  check
})

export const fetchRemoveCheckItemError = error => ({
  type: types.FETCH_REMOVE_CHECK_ITEM_ERROR,
  error
})

//
// Async Request
//
export const fetchRemoveCheckItem = (check, orderedItem) => (dispatch, getState) => {
  dispatch(fetchRemoveCheckItemRequest())
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/checks/${check.id}/removeItem`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({orderedItemId: orderedItem._id})
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(check => {
    dispatch(fetchRemoveCheckItemSuccess(check))
  })
  .catch(error => {
    dispatch(fetchRemoveCheckItemError(error))
  })
}



export const fetchCloseCheckRequest = () => ({
  type: types.FETCH_CLOSE_CHECK_REQUEST
})

export const fetchCloseCheckSuccess = check => ({
  type: types.FETCH_CLOSE_CHECK_SUCCESS,
  check
})

export const fetchCloseCheckError = error => ({
  type: types.FETCH_CLOSE_CHECK_ERROR,
  error
})

//
// Async Request
//
export const fetchCloseCheck = (check) => (dispatch, getState) => {
  dispatch(fetchCloseCheckRequest())
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/checks/${check.id}/close`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(checks => {
    dispatch(fetchCloseCheckSuccess(checks))
  })
  .catch(error => {
    dispatch(fetchCloseCheckError(error))
  })
}



export const fetchTableCheckRequest = () => ({
  type: types.FETCH_TABLE_CHECK_REQUEST
})

export const fetchTableCheckSuccess = check => ({
  type: types.FETCH_TABLE_CHECK_SUCCESS,
  check
})

export const fetchTableCheckNotFound = () => ({
  type: types.FETCH_TABLE_CHECK_NOT_FOUND,
})

export const fetchTableCheckError = error => ({
  type: types.FETCH_TABLE_CHECK_ERROR,
  error
})

export const fetchTableCheck = (table) => (dispatch, getState) => {
  dispatch(fetchTableCheckRequest())
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/checks`, {
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
  .then(checks => {
    if(!checks || checks.length < 1) {
      dispatch(fetchTableCheckNotFound())
    }

    const check = checks.find(check => check.tableId.id === table.id && !check.closed)
    if(!check) {
      dispatch(fetchTableCheckNotFound())
    }
    dispatch(fetchTableCheckSuccess(check))
  })
  .catch(error => {
    dispatch(fetchTableCheckError(error))
  })
}

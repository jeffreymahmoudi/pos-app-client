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
  fetch(`${API_BASE_URL}/checks`)
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
  fetch(`${API_BASE_URL}/checks`, {
    method: 'POST',
    headers: {
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
export const fetchAddCheckItem = (check, item) => (dispatch) => {
  dispatch(fetchAddCheckItemRequest())
  fetch(`${API_BASE_URL}/checks/${check.id}/addItem`, {
    method: 'PUT',
    headers: {
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
  fetch(`${API_BASE_URL}/checks/${check.id}/close`, {
    method: 'PUT'
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(checks => {
    dispatch(fetchCloseCheckSuccess(checks))
    // dispatch(clearCheck())
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
  fetch(`${API_BASE_URL}/checks`)
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

    const check = checks.find(check => check.tableId === table.id && !check.closed)
    if(!check) {
      dispatch(fetchTableCheckNotFound())
    }
    dispatch(fetchTableCheckSuccess(check))
  })
  .catch(error => {
    dispatch(fetchTableCheckError(error))
  })
}

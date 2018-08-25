import * as types from '../actions/actionTypes'

const initialState = {
  checks: [],
  loading: false,
  error: null,
  selectedCheck: null
}

const checks = (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_CHECKS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case types.FETCH_CHECKS_SUCCESS:
      return Object.assign({}, state, {
        checks: action.checks,
        loading: false,
        error: null
      });
    case types.FETCH_CHECKS_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case types.FETCH_NEW_CHECK_REQUEST:
    case types.FETCH_NEW_CHECK_ERROR:
    case types.FETCH_TABLE_CHECK_NOT_FOUND:
      return Object.assign({}, state, {
        selectedCheck: null
      })
    case types.FETCH_TABLE_CHECK_SUCCESS:
    case types.FETCH_NEW_CHECK_SUCCESS:
    case types.FETCH_ADD_CHECK_ITEM_SUCCESS:
    case types.FETCH_CLOSE_CHECK_SUCCESS:
      return Object.assign({}, state, {
        selectedCheck: action.check
      })
    default: return state;
  }
}

export default checks;

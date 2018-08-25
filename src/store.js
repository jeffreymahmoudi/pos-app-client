import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth';
import menuReducer from './reducers/menuReducer';
import tablesReducer from './reducers/tablesReducer';
import checksReducer from './reducers/checksReducer';
import protectedDataReducer from './reducers/protected-data';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    menu: menuReducer,
    tables: tablesReducer,
    checks: checksReducer,
    protectedData: protectedDataReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;

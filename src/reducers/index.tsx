import { combineReducers } from "redux";

import exportaciones from "reducers/exportaciones";
import customers from "reducers/customers.reducers";
import users from "reducers/users.reducers";
import settings from 'reducers/settings.reducers';

const reducers = combineReducers({
  exportaciones,
  customers,
  users,
  settings
});

const RootReducer = (state: any, action: any) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return reducers(state, action);
};

export default RootReducer;
